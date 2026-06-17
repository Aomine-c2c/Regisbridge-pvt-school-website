import { prisma } from "@/lib/db";

export interface CreateConversationParams {
    participantIds: string[];
  type: 'DIRECT' | 'GROUP';
  subject?: string;
  initialMessage?: string;
  senderId?: string;
}

export const messagingService = {
  /**
   * Create a new conversation or return existing DIRECT conversation
   */
  async createConversation(params: CreateConversationParams) {
    const { participantIds, type, subject, initialMessage, senderId } = params;

    // For DIRECT conversations, check if one already exists between these 2 users
    if (type === 'DIRECT' && participantIds.length === 2) {
      const existing = await prisma.conversation.findFirst({
        where: {
          type: 'DIRECT',
          participants: {
            every: {
              userId: { in: participantIds }
            }
          }
        },
        include: {
            participants: { include: { user: { select: { firstName: true, lastName: true, role: true } } } }
        }
      });

      if (existing) {
        // If initialMessage is provided, send it
        if (initialMessage && senderId) {
            await this.sendMessage({ conversationId: existing.id, senderId, content: initialMessage });
        }
        return existing;
      }
    }

    // Create new conversation
    const conversation = await prisma.conversation.create({
      data: {
        type,
        subject,
        participants: {
          create: participantIds.map(userId => ({ userId }))
        },
        messages: initialMessage && senderId ? {
            create: {
                senderId,
                content: initialMessage,
                readBy: {
                    create: { userId: senderId } // Sender has read their own message
                }
            }
        } : undefined
      },
      include: {
        participants: { include: { user: { select: { firstName: true, lastName: true, role: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } }
      }
    });

    return conversation;
  },

  /**
   * Send a message in a conversation
   */
  async sendMessage({ conversationId, senderId, content, attachments }: { 
      conversationId: string, 
      senderId: string, 
      content: string, 
      attachments?: string 
  }) {
    // Verify user is participant
    const isParticipant = await prisma.conversationParticipant.findUnique({
        where: {
            conversationId_userId: { conversationId, userId: senderId }
        }
    });

    if (!isParticipant) throw new Error("User is not a participant");

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
        attachments,
        readBy: {
            create: { userId: senderId }
        }
      },
      include: {
          sender: { select: { firstName: true, lastName: true } }
      }
    });

    // Update conversation lastMessageAt and increment unread counts for others
    await prisma.conversation.update({
        where: { id: conversationId },
        data: { 
            lastMessageAt: new Date(),
            participants: {
                updateMany: {
                    where: { userId: { not: senderId } },
                    data: { unreadCount: { increment: 1 } }
                }
            }
        }
    });

    return message;
  },

  /**
   * Get conversations for a user
   */
  async getConversations(userId: string) {
    return await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId }
        }
      },
      include: {
        participants: {
            include: { user: { select: { firstName: true, lastName: true, role: true } } }
        },
        messages: {
            take: 1,
            orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { lastMessageAt: 'desc' }
    });
  },

  /**
   * Get messages for a conversation
   */
  async getMessages(conversationId: string, userId: string, page = 1) {
    // Verify access
    const membership = await prisma.conversationParticipant.findUnique({
        where: { conversationId_userId: { conversationId, userId } }
    });
    
    if (!membership) throw new Error("Unauthorized");

    // Mark as read when fetching? Or separate action?
    // Let's mark as read here for simplicity for now, or keep separate.
    // Keeping separate allows for "peek" functionality, but typically opening chat marks read.
    await this.markAsRead(conversationId, userId);

    return await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: { select: { id: true, firstName: true, lastName: true, role: true } },
        readBy: { where: { userId: { not: userId } }, select: { user: { select: { firstName: true } } } }
      },
      orderBy: { createdAt: 'desc' }, // Latest first for UI simple pagination
      take: 50,
      skip: (page - 1) * 50
    });
  },

  /**
   * Mark conversation as read
   */
  async markAsRead(conversationId: string, userId: string) {
    await prisma.conversationParticipant.update({
        where: { conversationId_userId: { conversationId, userId } },
        data: { 
            unreadCount: 0,
            lastReadAt: new Date()
        }
    });
  }
};
