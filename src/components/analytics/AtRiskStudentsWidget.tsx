"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, TrendingDown, Sparkles, Loader2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface AtRiskStudent {
  studentId: string;
  name: string;
  gradeLevel: string;
  attendanceRate: number;
  averageGrade: number;
  riskFactors: string[];
}

export function AtRiskStudentsWidget({ endpoint = '/api/admin/analytics/at-risk' }: { endpoint?: string }) {
  const [students, setStudents] = useState<AtRiskStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState<string | null>(null);
  const [aiInsight, setAiInsight] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json.success) {
          setStudents(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch at-risk students", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const fetchAiInsight = async (studentId: string) => {
    setAiLoading(studentId);
    try {
      const res = await fetch('/api/ai/student-risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      });
      if (res.ok) {
        const data = await res.json();
        setAiInsight({ id: studentId, text: data.insight });
      }
    } catch (error) {
      console.error("Failed to fetch AI insight", error);
    } finally {
      setAiLoading(null);
    }
  };

  if (loading) return <div>Loading insights...</div>;
  if (!students.length) return null; 

  return (
    <>
      <Card className="border-red-200 bg-red-50/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-600 flex items-center gap-2">
             <AlertTriangle className="h-4 w-4" />
             At-Risk Students ({students.length})
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.slice(0, 5).map((student) => (
              <div key={student.studentId} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{student.name}</p>
                  <div className="flex gap-2">
                       {student.riskFactors.map(f => (
                           <Badge key={f} variant="outline" className="text-xs text-red-600 border-red-200 bg-red-50">
                               {f}
                           </Badge>
                       ))}
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-purple-600 hover:bg-purple-100"
                    onClick={() => fetchAiInsight(student.studentId)}
                    disabled={aiLoading === student.studentId}
                    title="Generate AI Analysis"
                  >
                    {aiLoading === student.studentId ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                  <Link href={`/admin/students/${student.studentId}`}>
                      <Button variant="ghost" size="sm" className="h-8 text-red-600 hover:text-red-700 hover:bg-red-100">
                          View
                      </Button>
                  </Link>
                </div>
              </div>
            ))}
            {students.length > 5 && (
                 <Button variant="link" className="w-full text-red-600">View All {students.length} Students</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Simple AI Insight Modal */}
      {aiInsight && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setAiInsight(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative" onClick={e => e.stopPropagation()}>
            <div className="p-4 bg-purple-50 border-b border-purple-100 flex justify-between items-center">
               <h3 className="font-semibold text-purple-900 flex items-center gap-2">
                 <Sparkles className="h-4 w-4" /> AI Risk Analysis
               </h3>
               <button onClick={() => setAiInsight(null)} className="text-gray-400 hover:text-gray-600">
                 <X size={18} />
               </button>
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {aiInsight.text || "No insight generated. Please try again."}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
