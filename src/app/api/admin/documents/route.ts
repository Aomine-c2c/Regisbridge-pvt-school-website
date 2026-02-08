import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/api/auth-middleware';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/db';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'documents');

// GET: List documents
export async function GET(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const documents = await prisma.document.findMany({
            orderBy: { createdAt: 'desc' },
            include: { uploadedByUser: { select: { firstName: true, lastName: true } } }
        });

        return NextResponse.json({ success: true, data: documents });
    } catch (err) {
         
        console.error('Documents fetch error:', err);
        return NextResponse.json({ success: false, message: 'Failed to fetch documents' }, { status: 500 });
    }
}

// POST: Upload document
export async function POST(request: NextRequest) {
    try {
        const { user, error } = await requireAdmin(request);
        if (error) return error;

        const formData = await request.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ success: false, message: 'No file provided' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${file.name}`;
        const filepath = join(UPLOAD_DIR, filename);

        // Save file
        await writeFile(filepath, buffer);

        // Save to database
        const document = await prisma.document.create({
            data: {
                filename,
                originalName: file.name,
                fileSize: file.size,
                mimeType: file.type,
                uploadedBy: user!.userId
            }
        });

        return NextResponse.json({ success: true, data: document, message: 'File uploaded successfully' });
    } catch (err) {
         
        console.error('Document upload error:', err);
        return NextResponse.json({ success: false, message: 'Failed to upload file' }, { status: 500 });
    }
}

// DELETE: Remove document
export async function DELETE(request: NextRequest) {
    try {
        const { error } = await requireAdmin(request);
        if (error) return error;

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ success: false, message: 'Document ID required' }, { status: 400 });
        }

        const document = await prisma.document.findUnique({ where: { id } });
        if (!document) {
            return NextResponse.json({ success: false, message: 'Document not found' }, { status: 404 });
        }

        // Delete file from filesystem
        const filepath = join(UPLOAD_DIR, document.filename);
        await unlink(filepath).catch(() => {}); // Ignore if file doesn't exist

        // Delete from database
        await prisma.document.delete({ where: { id } });

        return NextResponse.json({ success: true, message: 'Document deleted successfully' });
    } catch (err) {
         
        console.error('Document delete error:', err);
        return NextResponse.json({ success: false, message: 'Failed to delete document' }, { status: 500 });
    }
}
