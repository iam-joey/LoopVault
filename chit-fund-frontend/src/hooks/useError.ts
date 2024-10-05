import { useState } from 'react';

export const useError = () => {
  const [error, setError] = useState<string | null>(null);

  const handleError = (error: any) => {
    console.error('An error occurred:', error);
    if (error instanceof Error) {
      setError(error.message);
    } else if (typeof error === 'string') {
      setError(error);
    } else {
      setError('An unexpected error occurred');
    }
  };

  const clearError = () => setError(null);

  return { error, handleError, clearError };
};