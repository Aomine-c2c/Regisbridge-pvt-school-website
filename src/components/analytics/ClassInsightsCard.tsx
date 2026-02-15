'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Loader2, BookOpen } from 'lucide-react';

interface ClassInsightsCardProps {
  classId: string;
  className?: string; // CSS class
  schoolClassName: string; // "Grade 10-A"
}

export function ClassInsightsCard({ classId, className, schoolClassName }: ClassInsightsCardProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/class-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId })
      });
      
      if (res.ok) {
        const data = await res.json();
        setInsight(data.summary);
      }
    } catch (error) {
      console.error("Failed to generate insight", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`border-purple-200 bg-purple-50/20 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-purple-900 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-600" />
          Class Performance: {schoolClassName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!insight ? (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <p className="text-sm text-gray-500 mb-3">
              Get an AI-powered summary of your class's recent performance.
            </p>
            <Button 
                onClick={generateInsight} 
                disabled={loading}
                variant="outline"
                className="border-purple-200 text-purple-700 hover:bg-purple-100 gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate Insight
            </Button>
          </div>
        ) : (
          <div className="bg-white/80 p-4 rounded-lg border border-purple-100 shadow-sm">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-700 leading-relaxed">
                {insight}
              </div>
            </div>
            <div className="mt-3 text-right">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={generateInsight}
                    disabled={loading}
                    className="text-xs text-purple-500 hover:text-purple-700 h-auto p-0 hover:bg-transparent"
                >
                    {loading ? 'Refreshing...' : 'Refresh Analysis'}
                </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
