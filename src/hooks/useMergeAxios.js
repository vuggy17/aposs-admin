import { ENP_INDUSTRY, ENP_KIND } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

// merge data after call axios
export const useMergeAxios = ({ method, option }) => {
  const cache = useRef({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const url = location.key;
  const [data, setData] = useState({});

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      if (cache.current[url]) {
        const data = cache.current[url];
        setData(data);
        setLoading(false);
      } else {
        const industriesRequest = await axios({
          method,
          url: ENP_INDUSTRY,
          option,
        });
        const industries = await industriesRequest.data;
        const categoriesRequest = await axios({
          method,
          url: ENP_KIND,
          option,
        });
        const categories = await categoriesRequest.data;
        const data = merge(industries, categories);
        cache.current[url] = data; // set response in cache;
        setData(data);
        setLoading(false);
      }
    };

    fetchData();
  }, [method, option]);

  return { data, loading };
};

function merge(industry, category) {
  const result = industry;
  category.forEach((c) => {
    const i = industry.find((item) => item.id === c.category);
    if (!i.categories) i.categories = [];
    i.categories.push(c);
  });
  return result;
}
