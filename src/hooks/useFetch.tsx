import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let shouldCancelRequest = false;

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        const json = await response.json();

        if (shouldCancelRequest) return;

        setResponse(json);
        setError(null);
      } catch (error) {
        if (shouldCancelRequest) return;
        setError(error);
        setResponse(null);
      }

      setIsLoading(false);
    };

    fetchData();

    return () => {
      shouldCancelRequest = true;
    };
  }, [url]);

  return {
    response,
    isLoading,
    error,
  };
};
