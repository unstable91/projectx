import React, { useState } from 'react';
import { History, CheckCircle2, XCircle, Clock, AlertTriangle, Code, ChevronRight } from 'lucide-react';
import { Submission } from '../../types';

interface SubmissionsTabProps {
  submissions: Submission[];
}

export const SubmissionsTab: React.FC<SubmissionsTabProps> = ({ submissions }) => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const getStatusBadge = (status: Submission['status']) => {
    switch (status) {
      case 'Accepted':
        return (
          <span className="flex items-center space-x-1 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Accepted</span>
          </span>
        );
      case 'Wrong Answer':
        return (
          <span className="flex items-center space-x-1 text-xs font-bold text-rose-400">
            <XCircle className="w-3.5 h-3.5" />
            <span>Wrong Answer</span>
          </span>
        );
      case 'Time Limit Exceeded':
        return (
          <span className="flex items-center space-x-1 text-xs font-bold text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Time Limit Exceeded</span>
          </span>
        );
      default:
        return (
          <span className="flex items-center space-x-1 text-xs font-bold text-rose-500">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{status}</span>
          </span>
        );
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  if (submissions.length === 0) {
    return (
      <div className="p-8 text-center h-full flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-[#242424] border border-[#333333] flex items-center justify-center text-gray-500">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-gray-300">No Submissions Yet</h3>
        <p className="text-xs text-gray-500 max-w-xs">
          Click "Submit" when you are confident in your solution to test against all edge cases.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-y-auto h-full text-gray-200">
      <div className="flex items-center space-x-2 pb-3 mb-3 border-b border-[#2e2e2e]">
        <History className="w-4 h-4 text-[#ffa116]" />
        <h2 className="text-sm font-bold text-white">Submission History ({submissions.length})</h2>
      </div>

      <div className="space-y-2">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubmission(sub)}
            className="p-3 bg-[#242424] hover:bg-[#2c2c2c] border border-[#333333] rounded-xl cursor-pointer transition flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                {getStatusBadge(sub.status)}
                <span className="text-[11px] text-gray-400 font-medium">
                  {sub.language.toUpperCase()}
                </span>
                <span className="text-[11px] text-gray-500">
                  {sub.passedTests} / {sub.totalTests} passed
                </span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span>Runtime: <strong className="text-gray-200">{sub.runtimeMs}ms</strong></span>
                <span>•</span>
                <span>Memory: <strong className="text-gray-200">{sub.memoryKb} KB</strong></span>
                <span>•</span>
                <span>{formatDate(sub.submittedAt)}</span>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-gray-200 transition" />
          </div>
        ))}
      </div>

      {/* Code Viewer Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1e1e1e] border border-[#3a3a3a] rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 bg-[#262626] border-b border-[#333333] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusBadge(selectedSubmission.status)}
                <span className="text-xs text-gray-400">
                  {formatDate(selectedSubmission.submittedAt)}
                </span>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-white text-xs font-semibold px-2 py-1 rounded bg-[#333333]"
              >
                Close
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 bg-[#141414]">
              <pre className="text-xs font-mono text-gray-200 leading-relaxed">
                <code>{selectedSubmission.code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
