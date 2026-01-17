'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { logger } from '@/lib/logger';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Configuration constants
const COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SHOW_DELAY_MS = 3000; // 3 seconds

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const installButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isInWebAppiOS = (window.navigator as any).standalone === true;

    if (isStandalone || isInWebAppiOS) {
      setIsInstalled(true);
      return;
    }

    // Respect dismissal cooldown (7 days)
    try {
      const dismissedAt = localStorage.getItem('pwa-prompt-dismissed');
      if (dismissedAt) {
        const elapsed = Date.now() - Number(dismissedAt);
        if (elapsed < COOLDOWN_MS) {
          setCooldownActive(true);
          return; // Skip wiring listeners if on cooldown
        }
      }
    } catch {
      // Intentionally empty: localStorage may not be available (private mode, SSR)
    }

    let timeoutId: number | undefined;

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Show prompt after a delay to not be too intrusive
      timeoutId = window.setTimeout(() => {
        setShowPrompt(true);
      }, SHOW_DELAY_MS);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt, { once: true } as any);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as any);
      window.removeEventListener('appinstalled', handleAppInstalled);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        logger.info('PWA install prompt accepted');
      } else {
        logger.info('PWA install prompt dismissed');
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      logger.error('Install prompt failed', error);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Store dismissal to avoid showing again for some time
    try {
      localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    } catch {
      // Intentionally empty: localStorage may not be available (private mode, SSR)
    }
    // Restore focus to prior element for accessibility
    previouslyFocused.current?.focus?.();
  };

  // When prompt becomes visible, capture previous focus and move focus into dialog
  useEffect(() => {
    if (showPrompt && !isInstalled && !cooldownActive) {
      previouslyFocused.current = (document.activeElement as HTMLElement) || null;
      // Focus the install button for quick keyboard access
      installButtonRef.current?.focus();
    }
  }, [showPrompt, isInstalled, cooldownActive]);

  // Escape key handling
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleDismiss();
    }
  }, []);

  // Don't show if already installed or dismissed recently
  if (isInstalled || !showPrompt || cooldownActive) {
    return null;
  }

  return (
    <div
      className="fixed bottom-4 right-4 z-50 max-w-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
      aria-describedby="pwa-install-description"
      onKeyDown={handleKeyDown}
    >
      <Card className="shadow-lg border-2 border-[#D4AF37]" tabIndex={-1}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle id="pwa-install-title" className="text-lg flex items-center gap-2">
              <Download className="h-5 w-5 text-[#1C1A75]" />
              Install App
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0"
              aria-label="Dismiss install prompt"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription id="pwa-install-description">
            Install Regisbridge School app for a better experience with offline access and quick access from your home screen.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button
            onClick={handleInstallClick}
            className="w-full bg-[#1C1A75] hover:bg-[#1C1A75]/90 text-white"
            ref={installButtonRef}
            aria-label="Install the Regisbridge School application"
          >
            <Download className="mr-2 h-4 w-4" />
            Install Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}