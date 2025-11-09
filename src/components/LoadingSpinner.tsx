import { Loader2 } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-16 h-16">
        <Loader2 className="w-16 h-16 text-pink-500 animate-spin absolute" />
        <div className="w-16 h-16 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full opacity-30 animate-pulse"></div>
      </div>
      <p className="mt-6 text-lg text-gray-600 font-semibold">Finding perfect styles...</p>
      <p className="mt-1 text-sm text-gray-400">Just a moment</p>
    </div>
  );
};
