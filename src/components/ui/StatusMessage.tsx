import React from 'react';

interface StatusMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
}

export const StatusMessage = ({ type, message, onClose }: StatusMessageProps) => {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-100',
    error: 'bg-red-50 text-red-800 border-red-100',
    info: 'bg-blue-50 text-blue-800 border-blue-100',
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  };

  return (
    <div className={`p-4 rounded-lg border flex items-start gap-3 animate-fade-in ${styles[type]}`}>
      <span className="material-symbols-outlined text-[20px] mt-0.5">{icons[type]}</span>
      <div className="flex-1 text-sm font-medium">
        {message}
      </div>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      )}
    </div>
  );
};
