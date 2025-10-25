import React, { useState, useEffect } from 'react';
import { Mail, Send, Users, Calendar, Eye, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import emailService from '@/services/emailService';
import { format } from 'date-fns';

interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  content: string;
  recipientGroups: string[];
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  scheduledDate?: Date;
  sentDate?: Date;
  recipientCount: number;
  openRate?: number;
  clickRate?: number;
}

interface EmailCampaignManagerProps {
  userRole?: 'admin' | 'teacher';
}

export function EmailCampaignManager({ userRole = 'admin' }: EmailCampaignManagerProps) {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<EmailCampaign | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    content: '',
    recipientGroups: [] as string[],
    scheduledDate: '',
  });
  const { toast } = useToast();

  // Mock data for demonstration
  useEffect(() => {
    const mockCampaigns: EmailCampaign[] = [
      {
        id: '1',
        name: 'Welcome to Regisbridge',
        subject: 'Welcome to Our School Community',
        content: 'Welcome message content...',
        recipientGroups: ['new-parents', 'students'],
        status: 'sent',
        sentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        recipientCount: 45,
        openRate: 78,
        clickRate: 23,
      },
      {
        id: '2',
        name: 'Term 2 Opening',
        subject: 'Exciting Start to Term 2',
        content: 'Term opening announcement...',
        recipientGroups: ['all-parents', 'all-students'],
        status: 'scheduled',
        scheduledDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        recipientCount: 120,
      },
      {
        id: '3',
        name: 'Sports Day Reminder',
        subject: 'Sports Day This Friday!',
        content: 'Sports day reminder content...',
        recipientGroups: ['all-parents', 'all-students'],
        status: 'draft',
        recipientCount: 120,
      }
    ];
    setCampaigns(mockCampaigns);
  }, []);

  const recipientGroupOptions = [
    { value: 'all-parents', label: 'All Parents' },
    { value: 'all-students', label: 'All Students' },
    { value: 'new-parents', label: 'New Parents' },
    { value: 'grade-1', label: 'Grade 1 Parents' },
    { value: 'grade-2', label: 'Grade 2 Parents' },
    { value: 'grade-3', label: 'Grade 3 Parents' },
    { value: 'grade-4', label: 'Grade 4 Parents' },
    { value: 'grade-5', label: 'Grade 5 Parents' },
    { value: 'grade-6', label: 'Grade 6 Parents' },
    { value: 'grade-7', label: 'Grade 7 Parents' },
    { value: 'boarding-parents', label: 'Boarding Students\' Parents' },
  ];

  const handleCreateCampaign = () => {
    if (!formData.name || !formData.subject || !formData.content || formData.recipientGroups.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newCampaign: EmailCampaign = {
      id: Date.now().toString(),
      name: formData.name,
      subject: formData.subject,
      content: formData.content,
      recipientGroups: formData.recipientGroups,
      status: formData.scheduledDate ? 'scheduled' : 'draft',
      scheduledDate: formData.scheduledDate ? new Date(formData.scheduledDate) : undefined,
      recipientCount: calculateRecipientCount(formData.recipientGroups),
    };

    setCampaigns(prev => [...prev, newCampaign]);
    setIsCreateDialogOpen(false);

    // Reset form
    setFormData({
      name: '',
      subject: '',
      content: '',
      recipientGroups: [],
      scheduledDate: '',
    });

    toast({
      title: "Campaign Created",
      description: `Email campaign "${newCampaign.name}" has been created.`,
    });
  };

  const calculateRecipientCount = (groups: string[]): number => {
    // Mock calculation - in real implementation, this would query the database
    const groupSizes: { [key: string]: number } = {
      'all-parents': 80,
      'all-students': 120,
      'new-parents': 15,
      'grade-1': 12,
      'grade-2': 15,
      'grade-3': 18,
      'grade-4': 20,
      'grade-5': 22,
      'grade-6': 18,
      'grade-7': 15,
      'boarding-parents': 25,
    };

    return groups.reduce((total, group) => total + (groupSizes[group] || 0), 0);
  };

  const handleSendCampaign = async (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (!campaign) return;

    // Update status to sending
    setCampaigns(prev =>
      prev.map(c =>
        c.id === campaignId
          ? { ...c, status: 'sending' as const }
          : c
      )
    );

    try {
      // Mock sending - in real implementation, this would send to all recipients
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call

      // Update status to sent
      setCampaigns(prev =>
        prev.map(c =>
          c.id === campaignId
            ? { ...c, status: 'sent' as const, sentDate: new Date() }
            : c
        )
      );

      toast({
        title: "Campaign Sent",
        description: `Email campaign "${campaign.name}" has been sent to ${campaign.recipientCount} recipients.`,
      });
    } catch (error) {
      setCampaigns(prev =>
        prev.map(c =>
          c.id === campaignId
            ? { ...c, status: 'failed' as const }
            : c
        )
      );

      toast({
        title: "Campaign Failed",
        description: "Failed to send email campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
    toast({
      title: "Campaign Deleted",
      description: "Email campaign has been deleted.",
    });
  };

  const getStatusColor = (status: EmailCampaign['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'sent': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: EmailCampaign['status']) => {
    switch (status) {
      case 'sent': return <Send className="h-3 w-3" />;
      case 'scheduled': return <Calendar className="h-3 w-3" />;
      default: return <Mail className="h-3 w-3" />;
    }
  };

  if (userRole !== 'admin') {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">Only administrators can manage email campaigns.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#1C1A75]">Email Campaigns</h2>
          <p className="text-gray-600">Create and manage automated email campaigns</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#1C1A75] hover:bg-[#1C1A75]/90">
              <Plus className="mr-2 h-4 w-4" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Email Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  id="campaignName"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <Label htmlFor="subject">Email Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Enter email subject"
                />
              </div>
              <div>
                <Label htmlFor="content">Email Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter email content (HTML supported)"
                  rows={8}
                />
              </div>
              <div>
                <Label>Recipient Groups</Label>
                <Select
                  value=""
                  onValueChange={(value) => {
                    if (!formData.recipientGroups.includes(value)) {
                      setFormData(prev => ({
                        ...prev,
                        recipientGroups: [...prev.recipientGroups, value]
                      }));
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient groups" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipientGroupOptions.map((group) => (
                      <SelectItem key={group.value} value={group.value}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.recipientGroups.map((group) => {
                    const groupLabel = recipientGroupOptions.find(g => g.value === group)?.label;
                    return (
                      <Badge key={group} variant="secondary">
                        {groupLabel}
                        <button
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            recipientGroups: prev.recipientGroups.filter(g => g !== group)
                          }))}
                          className="ml-1 text-xs hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    );
                  })}
                </div>
              </div>
              <div>
                <Label htmlFor="scheduledDate">Schedule Date (Optional)</Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                />
              </div>
              <Button onClick={handleCreateCampaign} className="w-full bg-[#1C1A75] hover:bg-[#1C1A75]/90">
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-[#1C1A75]" />
                    <div>
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                      <CardDescription>{campaign.subject}</CardDescription>
                    </div>
                  </div>
                  <Badge className={getStatusColor(campaign.status)}>
                    {getStatusIcon(campaign.status)}
                    <span className="ml-1 capitalize">{campaign.status}</span>
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  {campaign.status === 'draft' && (
                    <Button
                      size="sm"
                      onClick={() => handleSendCampaign(campaign.id)}
                      className="bg-[#1C1A75] hover:bg-[#1C1A75]/90"
                    >
                      <Send className="mr-1 h-3 w-3" />
                      Send Now
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p><strong>Recipients:</strong> {campaign.recipientCount}</p>
                  <p><strong>Groups:</strong> {campaign.recipientGroups.join(', ')}</p>
                </div>
                <div>
                  {campaign.sentDate && (
                    <p><strong>Sent:</strong> {format(campaign.sentDate, 'MMM d, yyyy HH:mm')}</p>
                  )}
                  {campaign.scheduledDate && (
                    <p><strong>Scheduled:</strong> {format(campaign.scheduledDate, 'MMM d, yyyy HH:mm')}</p>
                  )}
                </div>
                <div>
                  {campaign.openRate !== undefined && (
                    <p><strong>Open Rate:</strong> {campaign.openRate}%</p>
                  )}
                  {campaign.clickRate !== undefined && (
                    <p><strong>Click Rate:</strong> {campaign.clickRate}%</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {campaigns.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No campaigns yet</h3>
              <p className="text-gray-600">Create your first email campaign to get started.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Campaign Preview Dialog */}
      {selectedCampaign && (
        <Dialog open={!!selectedCampaign} onOpenChange={() => setSelectedCampaign(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCampaign.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Subject</Label>
                <p className="text-sm text-gray-600">{selectedCampaign.subject}</p>
              </div>
              <div>
                <Label>Content Preview</Label>
                <div className="border rounded-lg p-4 max-h-96 overflow-y-auto bg-gray-50">
                  <div dangerouslySetInnerHTML={{ __html: selectedCampaign.content }} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Recipients:</strong> {selectedCampaign.recipientCount}</p>
                  <p><strong>Status:</strong> <span className="capitalize">{selectedCampaign.status}</span></p>
                </div>
                <div>
                  <p><strong>Groups:</strong> {selectedCampaign.recipientGroups.join(', ')}</p>
                  {selectedCampaign.sentDate && (
                    <p><strong>Sent:</strong> {format(selectedCampaign.sentDate, 'MMM d, yyyy HH:mm')}</p>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}