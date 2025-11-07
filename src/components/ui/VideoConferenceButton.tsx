'use client';

import React, { useState } from 'react';
import { Video, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { VideoConference } from './VideoConference';

export function VideoConferenceButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-20 right-4 rounded-full w-14 h-14 bg-[#1C1A75] hover:bg-[#1C1A75]/90 shadow-lg z-40"
          size="lg"
        >
          <Video className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-full h-full p-0 border-0">
        <VideoConference
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}