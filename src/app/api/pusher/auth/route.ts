import { NextRequest, NextResponse } from 'next/server';
import { pusherServer } from '@/lib/pusher';
import { getSession } from '@/lib/auth-server';

export async function POST(request: NextRequest) {
  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const data = await request.formData();
  const socketId = data.get('socket_id') as string;
  const channel = data.get('channel_name') as string;

  // Enhance security: Check if user is allowed to join the channel
  // Example: private-user-[userId]
  if (channel.startsWith('private-user-')) {
    const userId = channel.split('-')[2];
    if (session.user.id !== userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  // Example: private-tenant-[tenantId]
  if (channel.startsWith('private-tenant-')) {
        if (session.undefined && session.undefined !== tenantId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
  }

  const authResponse = pusherServer.authorizeChannel(socketId, channel, {
    user_id: session.user.id,
    user_info: {
      name: session.user.email, // Or name if available in session
      role: session.user.role,
    },
  });

  return NextResponse.json(authResponse);
}
