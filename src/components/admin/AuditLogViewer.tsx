'use client';

import { useState, useEffect } from 'react';
import { Eye, Clock, Activity } from 'lucide-react';
import { format } from 'date-fns';

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
  };
}

export function AuditLogViewer() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/admin/audit-logs?limit=100');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    if (action.includes('DELETE')) return 'text-red-600 bg-red-50';
    if (action.includes('CREATE')) return 'text-green-600 bg-green-50';
    if (action.includes('UPDATE')) return 'text-blue-600 bg-blue-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Activity size={18} />
            Recent Activity
          </h3>
          <button onClick={fetchLogs} className="text-sm text-indigo-600 hover:text-indigo-700">
            Refresh
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Resource</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLog(log)}>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      {format(new Date(log.createdAt), 'MMM d, HH:mm:ss')}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {log.user ? (
                      <div>
                        <div className="font-medium text-gray-900">
                          {log.user.firstName} {log.user.lastName}
                        </div>
                        <div className="text-xs text-gray-500">{log.user.email}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">System / Anonymous</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-700">{log.resource}</div>
                    <div className="text-xs text-gray-500 font-mono">{log.resourceId?.slice(0, 8)}...</div>
                  </td>
                   <td className="px-4 py-3 text-gray-500">
                    {log.ipAddress && <div className="text-xs">IP: {log.ipAddress}</div>}
                    <button className="text-indigo-600 hover:underline mt-1 flex items-center gap-1">
                      <Eye size={12} /> View
                    </button>
                  </td>
                </tr>
              ))}
              {logs.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No activity logs found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLog(null)}>
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg">Log Details</h3>
              <button onClick={() => setSelectedLog(null)} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Action</label>
                <div className="font-medium text-lg">{selectedLog.action} on {selectedLog.resource}</div>
              </div>
               <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">User</label>
                <div className="text-gray-900">{selectedLog.user?.email || 'System'}</div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Timestamp</label>
                <div className="text-gray-700">{format(new Date(selectedLog.createdAt), 'PPP p')}</div>
              </div>
              <div>
                 <label className="text-xs font-semibold text-gray-500 uppercase">Metadata</label>
                 <div className="text-sm text-gray-600 border rounded p-2 bg-gray-50 font-mono">
                    IP: {selectedLog.ipAddress || 'N/A'}<br/>
                    UA: {selectedLog.userAgent || 'N/A'}
                 </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Change Details</label>
                <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded-lg overflow-x-auto mt-1">
                  {selectedLog.details ? JSON.stringify(JSON.parse(selectedLog.details), null, 2) : 'No details provided'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
