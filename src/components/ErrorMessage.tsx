import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-2xl p-8 max-w-md w-full shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-rose-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-rose-600" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Oops!</h3>
        <p className="text-gray-700 text-center mb-6">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
