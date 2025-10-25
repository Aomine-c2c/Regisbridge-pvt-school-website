import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function NotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();

  useEffect(() => {
    // Check if notifications are supported
    if ('Notification' in window && 'serviceWorker' in navigator) {
      setIsSupported(true);
      setPermission(Notification.permission);

      // Check if already subscribed
      checkSubscriptionStatus();
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  const requestPermission = async () => {
    try {
      const result = await Notification.requestPermission();
      setPermission(result);

      if (result === 'granted') {
        toast({
          title: "Notifications enabled",
          description: "You'll now receive updates from Regisbridge School.",
        });
        await subscribeToNotifications();
      } else {
        toast({
          title: "Notifications blocked",
          description: "Please enable notifications in your browser settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      toast({
        title: "Error",
        description: "Failed to enable notifications.",
        variant: "destructive",
      });
    }
  };

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;

      // You'll need to replace this with your actual VAPID public key
      const vapidPublicKey = 'BKxQzBJh8ZQG6VdJfR8pQ8nZJGwQy8zJGwQy8zJGwQy8zJGwQy8zJGwQy8zJGwQy8zJGwQy8zJGwQy8zJGwQy8z';

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      // Here you would send the subscription to your server
      console.log('Push subscription:', subscription);

      setIsSubscribed(true);
      toast({
        title: "Subscribed to notifications",
        description: "You'll receive important updates and announcements.",
      });
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      toast({
        title: "Subscription failed",
        description: "Unable to subscribe to push notifications.",
        variant: "destructive",
      });
    }
  };

  const unsubscribeFromNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      if (subscription) {
        await subscription.unsubscribe();
        setIsSubscribed(false);
        toast({
          title: "Unsubscribed",
          description: "You will no longer receive push notifications.",
        });
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
      toast({
        title: "Error",
        description: "Failed to unsubscribe from notifications.",
        variant: "destructive",
      });
    }
  };

  const handleToggle = async (checked: boolean) => {
    if (checked) {
      if (permission === 'default') {
        await requestPermission();
      } else if (permission === 'granted') {
        await subscribeToNotifications();
      }
    } else {
      await unsubscribeFromNotifications();
    }
  };

  // Helper function to convert VAPID key
  function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            Notifications Not Supported
          </CardTitle>
          <CardDescription>
            Push notifications are not supported in this browser.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Stay updated with school announcements, events, and important notices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications" className="text-sm font-medium">
            Enable push notifications
          </Label>
          <Switch
            id="notifications"
            checked={isSubscribed}
            onCheckedChange={handleToggle}
            disabled={permission === 'denied'}
          />
        </div>

        {permission === 'denied' && (
          <p className="text-sm text-red-600">
            Notifications are blocked. Please enable them in your browser settings.
          </p>
        )}

        {permission === 'default' && (
          <p className="text-sm text-gray-600">
            Click the toggle to enable notifications and stay connected with school updates.
          </p>
        )}

        {isSubscribed && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <Bell className="h-4 w-4" />
            You're subscribed to notifications
          </div>
        )}
      </CardContent>
    </Card>
  );
}