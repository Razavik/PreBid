import { useState } from 'react';

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

export function useAsync<T>(callback: AsyncFunction<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const execute = async (...args: any[]) => {
    try {
      setError('');
      setIsLoading(true);
      await callback(...args);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    isLoading,
    error
  };
}
