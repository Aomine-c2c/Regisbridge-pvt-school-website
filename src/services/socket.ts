import { io, Socket } from 'socket.io-client';
import { logger } from '@/lib/logger';

class SocketService {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(userId?: string, token?: string) {
    if (this.socket?.connected) {
      return this.socket;
    }

    // In production, replace with your actual Socket.IO server URL
    const serverUrl = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';

    this.socket = io(serverUrl, {
      auth: {
        userId,
        token,
      },
      transports: ['websocket', 'polling'],
      timeout: 20000,
      forceNew: true,
    });

    this.setupEventListeners();
    return this.socket;
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      logger.debug('Connected to chat server');
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      logger.debug('Disconnected from chat server', reason);
      if (reason === 'io server disconnect') {
        // Server disconnected, try to reconnect
        this.attemptReconnect();
      }
    });

    this.socket.on('connect_error', (error) => {
      logger.error('Socket connection error', error);
      this.attemptReconnect();
    });

    this.socket.on('reconnect', (attemptNumber) => {
      logger.info('Reconnected to chat server', { attemptNumber });
    });

    this.socket.on('reconnect_error', (error) => {
      logger.error('Reconnection error', error);
    });

    this.socket.on('reconnect_failed', () => {
      logger.error('Failed to reconnect to chat server');
    });
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      setTimeout(() => {
        logger.debug('Attempting socket reconnect', { attempt: this.reconnectAttempts, max: this.maxReconnectAttempts });
        this.socket?.connect();
      }, 1000 * this.reconnectAttempts); // Exponential backoff
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Chat room methods
  joinRoom(roomId: string) {
    this.socket?.emit('join_room', { roomId });
  }

  leaveRoom(roomId: string) {
    this.socket?.emit('leave_room', { roomId });
  }

  sendMessage(roomId: string, message: string, messageType: 'text' | 'image' | 'file' = 'text') {
    this.socket?.emit('send_message', {
      roomId,
      message,
      messageType,
      timestamp: new Date().toISOString(),
    });
  }

  // Event listeners
  onMessage(callback: (data: any) => void) {
    this.socket?.on('receive_message', callback);
  }

  onUserJoined(callback: (data: any) => void) {
    this.socket?.on('user_joined', callback);
  }

  onUserLeft(callback: (data: any) => void) {
    this.socket?.on('user_left', callback);
  }

  onTyping(callback: (data: any) => void) {
    this.socket?.on('user_typing', callback);
  }

  onStopTyping(callback: (data: any) => void) {
    this.socket?.on('user_stop_typing', callback);
  }

  // Typing indicators
  startTyping(roomId: string) {
    this.socket?.emit('start_typing', { roomId });
  }

  stopTyping(roomId: string) {
    this.socket?.emit('stop_typing', { roomId });
  }

  // File sharing
  sendFile(roomId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('roomId', roomId);

    // In a real implementation, you'd upload the file to your server first
    // and then send the file URL via socket
    this.socket?.emit('send_file', {
      roomId,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
    });
  }

  // Get current socket instance
  getSocket() {
    return this.socket;
  }

  // Check connection status
  isConnected() {
    return this.socket?.connected || false;
  }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;