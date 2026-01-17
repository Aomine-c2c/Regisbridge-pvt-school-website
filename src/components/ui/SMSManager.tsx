import React, { useState, useEffect } from 'react';
import { MessageSquare, Send, Phone, Users, Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import smsService from '@/services/smsService';
import { format } from 'date-fns';

interface SMSMessage {
  id: string;
  recipient: string;
  message: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  sentDate?: Date;
  messageId?: string;
  cost?: number;
}

interface SMSManagerProps {
  userRole?: 'admin' | 'teacher';
}

export function SMSManager({ userRole = 'admin' }: SMSManagerProps) {
  const [messages, setMessages] = useState<SMSMessage[]>([]);
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<SMSMessage | null>(null);
  const [formData, setFormData] = useState({
    recipient: '',
    message: '',
    recipientGroup: '',
  });
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [bulkRecipients, setBulkRecipients] = useState('');
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockMessages: SMSMessage[] = [
      {
        id: '1',
        recipient: '+263771234567',
        message: 'Your meeting "Progress Review" with Mrs. Johnson is scheduled for tomorrow at 14:00.',
        status: 'delivered',
        sentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        messageId: 'SM123456789',
        cost: 0.05,
      },
      {
        id: '2',
        recipient: '+263781234567',
        message: 'Sports Day is this Friday! Please arrive by 8:30 AM.',
        status: 'sent',
        sentDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        messageId: 'SM987654321',
        cost: 0.05,
      },
      {
        id: '3',
        recipient: '+263791234567',
        message: 'Payment reminder: School fees due by end of month.',
        status: 'failed',
        sentDate: new Date(),
        cost: 0,
      }
    ];
    setMessages(mockMessages);
  }, []);

  const recipientGroups = [
    { value: 'all-parents', label: 'All Parents', count: 80 },
    { value: 'all-students', label: 'All Students', count: 120 },
    { value: 'grade-1', label: 'Grade 1 Parents', count: 12 },
    { value: 'grade-2', label: 'Grade 2 Parents', count: 15 },
    { value: 'grade-3', label: 'Grade 3 Parents', count: 18 },
    { value: 'grade-4', label: 'Grade 4 Parents', count: 20 },
    { value: 'grade-5', label: 'Grade 5 Parents', count: 22 },
    { value: 'grade-6', label: 'Grade 6 Parents', count: 18 },
    { value: 'grade-7', label: 'Grade 7 Parents', count: 15 },
    { value: 'boarding-parents', label: 'Boarding Students\' Parents', count: 25 },
  ];

  const handleSendSMS = async () => {
    if (!formData.recipient && !formData.recipientGroup && !isBulkMode) {
      toast({
        title: "Missing Recipient",
        description: "Please enter a recipient or select a group.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Missing Message",
        description: "Please enter a message.",
        variant: "destructive",
      });
      return;
    }

    try {
      let recipients: string[] = [];

      if (isBulkMode && bulkRecipients) {
        recipients = bulkRecipients.split('\n').filter(r => r.trim());
      } else if (formData.recipientGroup) {
        // Mock recipient list for selected group
        const groupSize = recipientGroups.find(g => g.value === formData.recipientGroup)?.count || 0;
        recipients = Array.from({ length: groupSize }, (_, i) => `+26377${1000000 + i}`);
      } else {
        recipients = [formData.recipient];
      }

      // Send SMS to each recipient
      const results = [];
      for (const recipient of recipients) {
        const formattedRecipient = smsService.formatPhoneNumber(recipient);
        const result = await smsService.sendSMS(formattedRecipient, formData.message);

        const newMessage: SMSMessage = {
          id: Date.now().toString() + Math.random(),
          recipient: formattedRecipient,
          message: formData.message,
          status: result.success ? 'sent' : 'failed',
          sentDate: new Date(),
          messageId: result.messageId,
        };

        results.push(newMessage);
      }

      setMessages(prev => [...prev, ...results]);
      setIsComposeDialogOpen(false);

      // Reset form
      setFormData({
        recipient: '',
        message: '',
        recipientGroup: '',
      });
      setBulkRecipients('');

      toast({
        title: "SMS Sent",
        description: `Message sent to ${recipients.length} recipient(s).`,
      });
    } catch (error) {
      toast({
        title: "SMS Failed",
        description: "Failed to send SMS. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteMessage = (messageId: string) => {
    setMessages(prev => prev.filter(m => m.id !== messageId));
    toast({
      title: "Message Deleted",
      description: "SMS message has been deleted.",
    });
  };

  const getStatusColor = (status: SMSMessage['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: SMSMessage['status']) => {
    switch (status) {
      case 'delivered': return <MessageSquare className="h-3 w-3" />;
      case 'sent': return <Send className="h-3 w-3" />;
      case 'failed': return <Phone className="h-3 w-3" />;
      default: return <MessageSquare className="h-3 w-3" />;
    }
  };

  if (userRole !== 'admin') {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">Only administrators can manage SMS communications.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75]">SMS Notifications</h2>
          <p className="text-gray-600">Send SMS notifications to parents and students</p>
        </div>
        <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1C1A75] hover:bg-[#1C1A75]/90">
              <Plus className="mr-2 h-4 w-4" />
              Compose SMS
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Compose SMS Message</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bulkMode"
                  checked={isBulkMode}
                  onChange={(e) => setIsBulkMode(e.target.checked)}
                  className="rounded"
                />
                <Label htmlFor="bulkMode">Bulk SMS Mode</Label>
              </div>

              {!isBulkMode ? (
                <>
                  <div>
                    <Label htmlFor="recipient">Recipient Phone Number</Label>
                    <Input
                      id="recipient"
                      value={formData.recipient}
                      onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                      placeholder="+263771234567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recipientGroup">Or Select Group</Label>
                    <Select value={formData.recipientGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, recipientGroup: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select recipient group" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipientGroups.map((group) => (
                          <SelectItem key={group.value} value={group.value}>
                            {group.label} ({group.count} recipients)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div>
                  <Label htmlFor="bulkRecipients">Recipient Phone Numbers (one per line)</Label>
                  <Textarea
                    id="bulkRecipients"
                    value={bulkRecipients}
                    onChange={(e) => setBulkRecipients(e.target.value)}
                    placeholder="+263771234567&#10;+263781234567&#10;+263791234567"
                    rows={6}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Enter your SMS message (160 characters max for single SMS)"
                  rows={4}
                  maxLength={160}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.message.length}/160 characters
                </p>
              </div>

              <Button onClick={handleSendSMS} className="w-full bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                <Send className="mr-2 h-4 w-4" />
                Send SMS
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-[#1C1A75]" />
                    <div>
                      <CardTitle className="text-lg">{message.recipient}</CardTitle>
                      <CardDescription>
                        {message.sentDate ? format(message.sentDate, 'MMM d, yyyy HH:mm') : 'Not sent'}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(message.status)}>
                    {getStatusIcon(message.status)}
                    <span className="ml-1 capitalize">{message.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedMessage(message)}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteMessage(message.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-2">{message.message}</p>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Message ID: {message.messageId}</span>
                {message.cost && <span>Cost: ${message.cost}</span>}
              </div>
            </CardContent>
          </Card>
        ))}

        {messages.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No SMS messages yet</h3>
              <p className="text-gray-600">Send your first SMS notification to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Message Preview Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>SMS Message Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Recipient</Label>
                <p className="text-sm text-gray-600">{selectedMessage.recipient}</p>
              </div>
              <div>
                <Label>Message</Label>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm">{selectedMessage.message}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Status:</strong> <span className="capitalize">{selectedMessage.status}</span></p>
                  <p><strong>Sent:</strong> {selectedMessage.sentDate ? format(selectedMessage.sentDate, 'MMM d, yyyy HH:mm') : 'Not sent'}</p>
                </div>
                <div>
                  <p><strong>Message ID:</strong> {selectedMessage.messageId}</p>
                  {selectedMessage.cost && <p><strong>Cost:</strong> ${selectedMessage.cost}</p>}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}