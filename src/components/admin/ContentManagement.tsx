'use client';

import { useState, useEffect } from 'react';
import { AdminHeader } from './shared/AdminHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Calendar, MoreVertical, Trash, Edit } from 'lucide-react';
import { getAllNews, getAllEvents, createNews, createEvent, deleteNews, deleteEvent } from '@/services/adminService';
import { NewsArticle, Event } from '@/types/admin';
import { useToast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export function ContentManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('news');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Dialog States
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

  // Forms
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'news',
    publishDate: '',
    status: 'published'
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    location: '',
    category: 'academic',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'news') {
        const response: any = await getAllNews(); // Type assertion as response structure varies
        // adminService returns data directly usually? getAllNews returns Promise<NewsArticle[]>
        // Checking adminService: response.data!
        // But API returns { success: true, data: { data: [...] } } for news pagination?
        // Let's assume generic fetch returns data. 
        // Note: My API implementation returns { success: true, data: { data: [] } } for paginated news
        // But adminService.ts might expect just array. 
        // If adminService uses `authenticatedFetch` which returns `response.json()`, then `response.data` is the payload.
        // So safe to assume we get the payload.
        
        // Handling potential structure mismatch gracefully
        const data = response.data || response; 
        setNews(Array.isArray(data) ? data : (data.data || []));
      } else {
        const data = await getAllEvents();
        setEvents(data);
      }
    } catch (error) {
      console.error('Failed to fetch content', error);
      // Don't show toast on initial load if just empty/error due to migration not done
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleCreateNews = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNews(newsForm as any);
      toast({ title: 'Success', description: 'News article created' });
      setIsNewsOpen(false);
      fetchData();
      setNewsForm({ title: '', content: '', category: 'news', publishDate: '', status: 'published' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create news', variant: 'destructive' });
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createEvent(eventForm as any);
      toast({ title: 'Success', description: 'Event created' });
      setIsEventOpen(false);
      fetchData();
      setEventForm({ title: '', description: '', eventDate: '', location: '', category: 'academic' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create event', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string, type: 'news' | 'event') => {
    if(!confirm('Are you sure?')) return;
    try {
      if (type === 'news') await deleteNews(id);
      else await deleteEvent(id);
      toast({ title: 'Success', description: 'Item deleted' });
      fetchData();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete item', variant: 'destructive' });
    }
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Content Management"
        description="Create and manage news, announcements, and school events"
        action={
          <Button onClick={() => activeTab === 'news' ? setIsNewsOpen(true) : setIsEventOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {activeTab === 'news' ? 'Create Article' : 'Create Event'}
          </Button>
        }
      />

      <Tabs defaultValue="news" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="news">News & Announcements</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        {/* NEWS TAB */}
        <TabsContent value="news" className="space-y-4 mt-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                   <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : news.length === 0 ? (
                   <TableRow><TableCell colSpan={5} className="text-center py-8">No news articles found</TableCell></TableRow>
                ) : (
                  news.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell className="capitalize">{item.category}</TableCell>
                      <TableCell>
                        {item.publishDate ? format(new Date(item.publishDate), 'MMM d, yyyy') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id, 'news')}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* EVENTS TAB */}
        <TabsContent value="events" className="space-y-4 mt-4">
          <div className="bg-white rounded-lg border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                   <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : events.length === 0 ? (
                   <TableRow><TableCell colSpan={5} className="text-center py-8">No events found</TableCell></TableRow>
                ) : (
                  events.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                         {item.eventDate ? format(new Date(item.eventDate), 'PPP p') : 'N/A'}
                      </TableCell>
                      <TableCell>{item.location || 'TBD'}</TableCell>
                      <TableCell className="capitalize">{item.category}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id, 'event')}>
                           <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* CREATE NEWS DIALOG */}
      <Dialog open={isNewsOpen} onOpenChange={setIsNewsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create News Article</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateNews} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input required value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newsForm.category} onValueChange={val => setNewsForm({...newsForm, category: val})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="announcement">Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea required value={newsForm.content} onChange={e => setNewsForm({...newsForm, content: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Publish Date</Label>
              <Input type="date" value={newsForm.publishDate} onChange={e => setNewsForm({...newsForm, publishDate: e.target.value})} />
            </div>
            <DialogFooter>
              <Button type="submit">Create Article</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CREATE EVENT DIALOG */}
      <Dialog open={isEventOpen} onOpenChange={setIsEventOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateEvent} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input required value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Date & Time</Label>
              <Input required type="datetime-local" value={eventForm.eventDate} onChange={e => setEventForm({...eventForm, eventDate: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={eventForm.category} onValueChange={val => setEventForm({...eventForm, category: val})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label>Description</Label>
              <Textarea value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} />
            </div>
            <DialogFooter>
              <Button type="submit">Create Event</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
