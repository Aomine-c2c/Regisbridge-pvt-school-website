import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Users, Settings, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { isBrowser } from '@/lib/platform';

interface Participant {
  id: string;
  name: string;
  avatar?: string;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost: boolean;
}

interface VideoConferenceProps {
  roomId?: string;
  userName?: string;
  userId?: string;
  onClose?: () => void;
}

export function VideoConference({
  roomId = 'default-room',
  userName = 'Anonymous User',
  userId = 'anonymous',
  onClose
}: VideoConferenceProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [meetingId, setMeetingId] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedMicrophone, setSelectedMicrophone] = useState('');
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    // Get available devices (only in browser)
    if (isBrowser()) {
      getDevices();
    }

    // Initialize current user as participant
    setParticipants([{
      id: userId,
      name: userName,
      isMuted: false,
      isVideoOn: true,
      isHost: true,
    }]);

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [userId, userName]);

  const getDevices = async () => {
    if (!isBrowser()) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      setCameras(devices.filter(device => device.kind === 'videoinput'));
      setMicrophones(devices.filter(device => device.kind === 'audioinput'));

      // Set defaults
      const defaultCamera = devices.find(device => device.kind === 'videoinput');
      const defaultMic = devices.find(device => device.kind === 'audioinput');

      if (defaultCamera) setSelectedCamera(defaultCamera.deviceId);
      if (defaultMic) setSelectedMicrophone(defaultMic.deviceId);
    } catch (error) {
      console.error('Error getting devices:', error);
    }
  };

  const startLocalStream = async () => {
    if (!isBrowser()) {
      toast({
        title: 'Unavailable',
        description: 'Media devices are not available in this environment.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const constraints = {
        video: isVideoOn ? { deviceId: selectedCamera ? { exact: selectedCamera } : undefined } : false,
        audio: !isMuted ? { deviceId: selectedMicrophone ? { exact: selectedMicrophone } : undefined } : false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      setIsConnected(true);
      toast({
        title: 'Connected to meeting',
        description: 'You are now in the video conference.',
      });
    } catch (error) {
      console.error('Error starting stream:', error);
      toast({
        title: 'Connection failed',
        description: 'Unable to access camera or microphone.',
        variant: 'destructive',
      });
    }
  };

  const stopLocalStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    setIsConnected(false);
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTracks = streamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
    }
    setIsMuted(!isMuted);
  };

  const toggleVideo = async () => {
    if (!isBrowser()) return;

    if (!isVideoOn) {
      // Turn video on
      try {
        const constraints = {
          video: { deviceId: selectedCamera ? { exact: selectedCamera } : undefined }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoTrack = stream.getVideoTracks()[0];

        if (streamRef.current) {
          const existingAudioTrack = streamRef.current.getAudioTracks()[0];
          if (existingAudioTrack) {
            streamRef.current.addTrack(videoTrack);
          } else {
            streamRef.current = new MediaStream([videoTrack]);
          }
        } else {
          streamRef.current = new MediaStream([videoTrack]);
        }

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = streamRef.current;
        }
      } catch (error) {
        console.error('Error turning video on:', error);
        return;
      }
    } else {
      // Turn video off
      if (streamRef.current) {
        const videoTracks = streamRef.current.getVideoTracks();
        videoTracks.forEach(track => {
          track.stop();
          streamRef.current!.removeTrack(track);
        });
      }
    }

    setIsVideoOn(!isVideoOn);
  };

  const toggleScreenShare = async () => {
    if (!isBrowser()) return;

    try {
      if (!isScreenSharing) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: false,
        });

        // Replace video track with screen share
        if (streamRef.current) {
          const videoTracks = streamRef.current.getVideoTracks();
          videoTracks.forEach(track => {
            streamRef.current!.removeTrack(track);
            track.stop();
          });

          const screenTrack = screenStream.getVideoTracks()[0];
          streamRef.current.addTrack(screenTrack);

          if (localVideoRef.current) {
            localVideoRef.current.srcObject = streamRef.current;
          }
        }

        setIsScreenSharing(true);
        toast({
          title: "Screen sharing started",
          description: "Others can now see your screen.",
        });
      } else {
        // Stop screen sharing and restore camera
        if (streamRef.current) {
          const screenTracks = streamRef.current.getVideoTracks();
          screenTracks.forEach(track => {
            streamRef.current!.removeTrack(track);
            track.stop();
          });

          // Try to restore camera
          if (isVideoOn) {
            const cameraStream = await navigator.mediaDevices.getUserMedia({
              video: { deviceId: selectedCamera ? { exact: selectedCamera } : undefined }
            });
            const cameraTrack = cameraStream.getVideoTracks()[0];
            streamRef.current.addTrack(cameraTrack);
          }
        }

        setIsScreenSharing(false);
        toast({
          title: "Screen sharing stopped",
          description: "Returned to camera view.",
        });
      }
    } catch (error) {
      console.error('Error toggling screen share:', error);
      toast({
        title: "Screen sharing failed",
        description: "Unable to share screen.",
        variant: "destructive",
      });
    }
  };

  const joinMeeting = () => {
    if (meetingId.trim()) {
      setIsJoinDialogOpen(false);
      startLocalStream();
    }
  };

  const leaveMeeting = () => {
    stopLocalStream();
    onClose?.();
  };

  if (isJoinDialogOpen) {
    return (
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Join Video Conference</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="meetingId">Meeting ID</Label>
              <Input
                id="meetingId"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                placeholder="Enter meeting ID"
              />
            </div>
            <div>
              <Label htmlFor="meetingPassword">Password (Optional)</Label>
              <Input
                id="meetingPassword"
                type="password"
                value={meetingPassword}
                onChange={(e) => setMeetingPassword(e.target.value)}
                placeholder="Enter meeting password"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Camera</Label>
                <Select value={selectedCamera} onValueChange={setSelectedCamera}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select camera" />
                  </SelectTrigger>
                  <SelectContent>
                    {cameras.map((camera) => (
                      <SelectItem key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Microphone</Label>
                <Select value={selectedMicrophone} onValueChange={setSelectedMicrophone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select microphone" />
                  </SelectTrigger>
                  <SelectContent>
                    {microphones.map((mic) => (
                      <SelectItem key={mic.deviceId} value={mic.deviceId}>
                        {mic.label || `Microphone ${mic.deviceId.slice(0, 8)}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={joinMeeting} className="w-full" disabled={!meetingId.trim()}>
              Join Meeting
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Video Conference</h2>
          <Badge variant="secondary">{participants.length} participants</Badge>
        </div>
        <Button variant="ghost" size="sm" onClick={leaveMeeting}>
          <PhoneOff className="h-4 w-4 mr-2" />
          Leave
        </Button>
      </div>

      {/* Video Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Local Video */}
        <Card className="relative">
          <CardContent className="p-0">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-64 bg-gray-900 rounded-lg object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              {userName} (You)
            </div>
          </CardContent>
        </Card>

        {/* Remote Video or Placeholder */}
        <Card className="relative">
          <CardContent className="p-0">
            {participants.length > 1 ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-900 rounded-lg object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Users className="h-12 w-12 mx-auto mb-2" />
                  <p>Waiting for others to join...</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 p-4 bg-gray-900">
        <Button
          variant={isMuted ? "destructive" : "secondary"}
          size="lg"
          onClick={toggleMute}
          className="rounded-full w-12 h-12 p-0"
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>

        <Button
          variant={isVideoOn ? "secondary" : "destructive"}
          size="lg"
          onClick={toggleVideo}
          className="rounded-full w-12 h-12 p-0"
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>

        <Button
          variant={isScreenSharing ? "default" : "secondary"}
          size="lg"
          onClick={toggleScreenShare}
          className="rounded-full w-12 h-12 p-0"
        >
          <Share className="h-5 w-5" />
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="rounded-full w-12 h-12 p-0"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Participants List */}
      <div className="absolute top-16 right-4">
        <Card className="w-64">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Participants ({participants.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {participants.map((participant) => (
              <div key={participant.id} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                  {participant.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{participant.name}</p>
                  <div className="flex gap-1">
                    {participant.isMuted && <MicOff className="h-3 w-3 text-red-500" />}
                    {!participant.isVideoOn && <VideoOff className="h-3 w-3 text-red-500" />}
                    {participant.isHost && <Badge variant="secondary" className="text-xs">Host</Badge>}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}