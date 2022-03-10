import { axios } from "lib/axios/Interceptor";
import { useEffect, useRef, useState } from "react";

export const useAxios = ({ url, method, option }) => {
  const cache = useRef({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setLoading(false);
      } else {
        const response = await axios({ method, url, option });
        const data = await response.data;
        cache.current[url] = data; // set response in cache;
        setData(data);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, option]);

  return { data, loading };
};
