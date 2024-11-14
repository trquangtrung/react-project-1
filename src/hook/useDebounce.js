import { useEffect, useState } from "react";

const useDebounce = (changedValue, delayTime) => {
  const [debouncedValue, setDebouncedValue] = useState(changedValue);
  useEffect(() => {
    // console.log("Bắt đầu debounce", changedValue);

    const timeoutId = setTimeout(() => {
      setDebouncedValue(changedValue);
      // console.log("Cập nhật debounce", changedValue);
    }, delayTime);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [changedValue, delayTime]);

  return debouncedValue;
};

export default useDebounce;
