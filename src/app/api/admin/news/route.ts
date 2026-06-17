import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { requireAdmin } from '@/lib/api/auth-middleware';

// GET /api/admin/news - List news articles
export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAdmin(request);
    if (error) return error;

        
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;

    const where: any = {
      // Filter by tenant
    };

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = category;
    }

    const [articles, total] = await prisma.$transaction([
      prisma.newsArticle.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.newsArticle.count({ where }),
    ]);

    // Format for frontend
    const formattedArticles = articles.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      excerpt: article.excerpt || article.content.substring(0, 100) + '...',
      author: article.author || 'Admin',
      publishDate: article.publishDate?.toISOString() || article.createdAt.toISOString(),
      status: article.status,
      category: article.category,
      imageUrl: article.imageUrl,
      tags: article.tags ? JSON.parse(article.tags) : [],
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        data: formattedArticles,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// POST /api/admin/news - Create news article
export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAdmin(request);
    if (error) return error;

    const body = await request.json();
    const {
      title,
      content,
      excerpt,
      category,
      imageUrl,
      tags,
      status,
      publishDate,
    } = body;

    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const article = await prisma.newsArticle.create({
      data: {
        title,
        content,
        excerpt,
        category,
        imageUrl,
        tags: tags ? JSON.stringify(tags) : null,
        status: status || 'DRAFT',
        publishDate: publishDate ? new Date(publishDate) : new Date(),
        author: user?.firstName || 'Admin', // In real app, get from session
      },
    });

    return NextResponse.json({
      success: true,
      message: 'News article created successfully',
      data: article,
    }); // 201

  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create news article' },
      { status: 500 }
    );
  }
}
