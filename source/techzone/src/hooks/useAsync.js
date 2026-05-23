import { useState, useCallback } from 'react';

/**
 * Reusable hook to handle async operations (API calls).
 * Automatically tracks and exposes loading state, errors, and resolved data.
 * 
 * @param {Function} asyncFunction 
 * @param {boolean} immediate Whether to run the function immediately
 * @returns {object} { execute, loading, data, error }
 */
export function useAsync(asyncFunction, immediate = false) {
  const [loading, setLoading] = useState(immediate);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback((...params) => {
    setLoading(true);
    setError(null);
    return asyncFunction(...params)
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((err) => {
        setError(err);
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  }, [asyncFunction]);

  return { execute, loading, data, error };
}
