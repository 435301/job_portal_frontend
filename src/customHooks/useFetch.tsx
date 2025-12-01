import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

interface UseFetchOptions<TPayload> {
  url: string;
  method?: AxiosRequestConfig["method"];
  autoFetch?: boolean; // makes the hook call itself immediately
  payload?: TPayload; // body or params
  config?: AxiosRequestConfig; // more axios configs
}

interface UseFetchReturn<TResponse, TPayload> {
  data: TResponse | null;
  error: string | null;
  loading: boolean;
  fetchData: (body?: TPayload) => Promise<TResponse | null>;
}

export function useFetch<TResponse, TPayload = any>({
  url,
  method = "POST",
  autoFetch = false,
  payload,
  config,
}: UseFetchOptions<TPayload>): UseFetchReturn<TResponse, TPayload> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (body?: TPayload): Promise<TResponse | null> => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios({
          url,
          method,
          data: body ?? payload,
          ...config,
        });

        setData(response.data);
        return response.data as TResponse;
      } catch (err: any) {
        const message = err?.response?.data?.message || "Something went wrong";
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [url, method, config, payload]
  );

  // auto-fetch on mount
  if (autoFetch && data === null && !loading && !error) {
    fetchData(payload);
  }

  return { data, error, loading, fetchData };
}
