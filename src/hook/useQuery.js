import { useEffect, useState } from "react";

// useEffect(() => {
//   const fetchCourse = async () => {
//     const res = await CourseService.getCourse();
//     console.log("res", res);
//   };
//   fetchCourse();
// }, []);

const useQuery = (promise, dependencies = []) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await promise();
      // console.log("useQuery res", res);
      setData(res?.data?.data);
    } catch (error) {
      console.log("useQuery error", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    error,
    loading,
    refetch: fetchData,
  };
};

export default useQuery;
