import React, { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import lmsService from '@/services/lmsService';

interface AssignmentSubmissionProps {
  assignmentId: string;
  assignmentTitle: string;
  studentId: string;
  studentName: string;
  onSubmissionComplete?: () => void;
  onClose?: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  file: File;
}

export function AssignmentSubmission({
  assignmentId,
  assignmentTitle,
  studentId,
  studentName,
  onSubmissionComplete,
  onClose
}: AssignmentSubmissionProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const allowedFileTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/zip',
    'application/x-rar-compressed'
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    if (!allowedFileTypes.includes(file.type)) {
      return `File type ${file.type} is not allowed. Please upload PDF, Word documents, text files, or images.`;
    }

    if (file.size > maxFileSize) {
      return `File size ${formatFileSize(file.size)} exceeds the maximum limit of ${formatFileSize(maxFileSize)}.`;
    }

    return null;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const validationError = validateFile(file);

      if (validationError) {
        toast({
          title: "Invalid File",
          description: validationError,
          variant: "destructive",
        });
        continue;
      }

      const uploadedFile: UploadedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
        status: 'uploading',
        file,
      };

      newFiles.push(uploadedFile);

      // Simulate upload progress
      simulateUpload(uploadedFile.id);
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === fileId
              ? { ...f, uploadProgress: 100, status: 'completed' as const }
              : f
          )
        );
      } else {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.id === fileId
              ? { ...f, uploadProgress: progress }
              : f
          )
        );
      }
    }, 200);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmit = async () => {
    const completedFiles = uploadedFiles.filter(f => f.status === 'completed');

    if (completedFiles.length === 0) {
      toast({
        title: "No Files to Submit",
        description: "Please upload and wait for files to finish uploading before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit each file
      for (const file of completedFiles) {
        await lmsService.submitAssignment(assignmentId, file.file, studentId);
      }

      toast({
        title: "Assignment Submitted",
        description: `Successfully submitted ${completedFiles.length} file(s) for "${assignmentTitle}".`,
      });

      onSubmissionComplete?.();
      onClose?.();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit assignment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return '🖼️';
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType === 'text/plain') return '📃';
    if (fileType.includes('zip') || fileType.includes('rar')) return '📦';
    return '📄';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[#1C1A75] mb-2">Submit Assignment</h2>
        <p className="text-gray-600">
          Upload your completed assignment for <strong>{assignmentTitle}</strong>
        </p>
      </div>

      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Files
          </CardTitle>
          <CardDescription>
            Drag and drop files here or click to browse. Maximum file size: 10MB per file.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-[#1C1A75] bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop files here or click to browse
            </p>
            <p className="text-sm text-gray-600 mb-4">
              Supported formats: PDF, Word, Text, Images, ZIP
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#1C1A75] hover:bg-[#1C1A75]/90"
            >
              Choose Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-600">{formatFileSize(file.size)}</p>
                    {file.status === 'uploading' && (
                      <div className="mt-2">
                        <Progress value={file.uploadProgress} className="h-1" />
                        <p className="text-xs text-gray-500 mt-1">
                          Uploading... {Math.round(file.uploadProgress)}%
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'completed' && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {file.status === 'error' && (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(file.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submission Notes */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={submissionNotes}
            onChange={(e) => setSubmissionNotes(e.target.value)}
            placeholder="Add any notes or comments about your submission..."
            className="w-full p-3 border rounded-lg resize-none"
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3 justify-end">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={uploadedFiles.filter(f => f.status === 'completed').length === 0 || isSubmitting}
          className="bg-[#1C1A75] hover:bg-[#1C1A75]/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Submit Assignment
            </>
          )}
        </Button>
      </div>

      {/* Submission Guidelines */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Submission Guidelines</CardTitle>
        </CardHeader>
        <CardContent className="text-blue-800">
          <ul className="space-y-2 text-sm">
            <li>• Ensure all files are properly named and organized</li>
            <li>• Check that your work is complete before submitting</li>
            <li>• You can submit multiple files if needed</li>
            <li>• Supported formats: PDF, Word documents, text files, images</li>
            <li>• Maximum file size: 10MB per file</li>
            <li>• You cannot modify your submission after it's submitted</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}