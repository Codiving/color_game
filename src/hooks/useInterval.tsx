import { useEffect, useRef } from "react";

type voidFunction = () => void;

const useInterval = (callback: voidFunction, time: number) => {
  const intervalRef = useRef<voidFunction>(() => {});

  useEffect(() => {
    intervalRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (time) {
      const interval = setInterval(() => intervalRef.current(), time);
      return () => clearInterval(interval);
    }
  }, [time]);
};

export default useInterval;
