"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendData {
  month: string;
  average: number;
}

export function AcademicTrendsWidget({ endpoint = '/api/admin/analytics/trends' }: { endpoint?: string }) {
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch trends", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading trends...</div>;

  return (
    <Card className="col-span-1 border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            Academic Performance Trends
        </CardTitle>
        <CardDescription>Average student grades over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                        <XAxis 
                            dataKey="month" 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#64748b" 
                            fontSize={12} 
                            tickLine={false} 
                            axisLine={false} 
                            domain={[0, 100]}
                        />
                        <Tooltip 
                            contentStyle={{ background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="average" 
                            stroke="#3b82f6" 
                            strokeWidth={3} 
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            dot={{ strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-sm">
                    No grade data available for trends.
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
