import { useState } from "react";

const useMutation = (promise) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const execute = async (payload, options = {}) => {
    const { onSuccess, onFail } = options || {};
    setLoading(true);
    try {
      const res = await promise(payload);
      // console.log("res", res);
      //   if (res?.data?.data) {
      //     setData(res.data.data);
      //   }
      setData(res?.data?.data) || null;
      onSuccess?.(res?.data?.data);
    } catch (error) {
      onFail?.(error);
      console.log("error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    execute,
  };
};

export default useMutation;
