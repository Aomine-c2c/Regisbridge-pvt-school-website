'use client'

// AdminDocumentManager Component - Manage business documents
import { useState } from 'react'
import { AdminHeader } from './shared/AdminHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Upload,
  Download,
  FileText,
  File,
  Trash2,
  Search,
  Filter,
  Eye,
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Document {
  id: string
  title: string
  category: 'financial' | 'academic' | 'administrative' | 'forms' | 'other'
  fileType: string
  fileName: string
  fileSize: number
  uploadedBy: string
  uploadedAt: string
  accessLevel: 'public' | 'student' | 'teacher' | 'admin'
  tags: string[]
  version: number
}

export function AdminDocumentManager() {
  const { toast } = useToast()
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Fee Structure 2025',
      category: 'financial',
      fileType: 'xlsx',
      fileName: 'REGISBRIDGE_FEES_2025.xlsx',
      fileSize: 245000,
      uploadedBy: 'Admin User',
      uploadedAt: '2025-01-15',
      accessLevel: 'student',
      tags: ['fees', '2025', 'tuition'],
      version: 1,
    },
    {
      id: '2',
      title: 'School Constitution',
      category: 'administrative',
      fileType: 'docx',
      fileName: 'Constitution_Final.docx',
      fileSize: 128000,
      uploadedBy: 'Admin User',
      uploadedAt: '2024-09-01',
      accessLevel: 'public',
      tags: ['governance', 'policies'],
      version: 2,
    },
    {
      id: '3',
      title: 'Application Form',
      category: 'forms',
      fileType: 'docx',
      fileName: 'APPLICATION_FORM.docx',
      fileSize: 95000,
      uploadedBy: 'Admin User',
      uploadedAt: '2024-12-01',
      accessLevel: 'public',
      tags: ['registration', 'admission'],
      version: 1,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getCategoryColor = (
    category: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (category) {
      case 'financial':
        return 'default'
      case 'academic':
        return 'secondary'
      case 'administrative':
        return 'outline'
      case 'forms':
        return 'default'
      default:
        return 'outline'
    }
  }

  const getAccessLevelColor = (
    level: string
  ): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (level) {
      case 'public':
        return 'default'
      case 'student':
        return 'secondary'
      case 'teacher':
        return 'outline'
      case 'admin':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter

    return matchesSearch && matchesCategory
  })

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload',
        variant: 'destructive',
      })
      return
    }

    // TODO: Implement actual file upload API call
    toast({
      title: 'Upload successful',
      description: `${selectedFile.name} has been uploaded`,
    })

    setSelectedFile(null)
    setUploadDialogOpen(false)
  }

  const handleDownload = (doc: Document) => {
    // TODO: Implement actual download functionality
    toast({
      title: 'Download started',
      description: `Downloading ${doc.fileName}`,
    })
  }

  const handleDelete = (doc: Document) => {
    // TODO: Implement actual delete API call
    setDocuments(documents.filter((d) => d.id !== doc.id))
    toast({
      title: 'Document deleted',
      description: `${doc.title} has been deleted`,
    })
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Document Management"
        description="Manage business documents, forms, and administrative files"
        action={
          <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
                <DialogDescription>
                  Add a new document to the school management system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="file">Select File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                  />
                  {selectedFile && (
                    <p className="text-sm text-muted-foreground">
                      Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Document Title</Label>
                  <Input id="title" placeholder="Enter document title" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="financial">Financial</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                        <SelectItem value="administrative">Administrative</SelectItem>
                        <SelectItem value="forms">Forms</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="access">Access Level</Label>
                    <Select>
                      <SelectTrigger id="access">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="student">Students</SelectItem>
                        <SelectItem value="teacher">Teachers</SelectItem>
                        <SelectItem value="admin">Admin Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g., fees, 2025, tuition" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setUploadDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload}>Upload Document</Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents by title, filename, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="academic">Academic</SelectItem>
              <SelectItem value="administrative">Administrative</SelectItem>
              <SelectItem value="forms">Forms</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Total Documents</p>
          <p className="text-2xl font-bold">{documents.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Financial</p>
          <p className="text-2xl font-bold">
            {documents.filter((d) => d.category === 'financial').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Forms</p>
          <p className="text-2xl font-bold">
            {documents.filter((d) => d.category === 'forms').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-gray-600">Administrative</p>
          <p className="text-2xl font-bold">
            {documents.filter((d) => d.category === 'administrative').length}
          </p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>File Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                  No documents found
                </TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-start gap-2">
                      <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-500">{doc.fileName}</p>
                        <div className="flex gap-1 mt-1">
                          {doc.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{doc.fileType.toUpperCase()}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatFileSize(doc.fileSize)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getAccessLevelColor(doc.accessLevel)}>
                      {doc.accessLevel}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>
                      <p>{new Date(doc.uploadedAt).toLocaleDateString()}</p>
                      <p className="text-xs text-gray-500">by {doc.uploadedBy}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(doc)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(doc)}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
