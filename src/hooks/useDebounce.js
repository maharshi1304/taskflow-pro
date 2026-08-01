import { useEffect, useState } from "react";

/*
  useDebounce custom hook kisi value ko
  specified delay ke baad update karta hai.

  Example:

  User types:
  React

  Har character par final value update nahi hogi.
  Typing stop hone ke 400ms baad:
  debouncedValue = "React"
*/
function useDebounce(value, delay = 400) {
  /*
    Debounced value ko state me store karte hain.
  */
  const [debouncedValue, setDebouncedValue] =
    useState(value);

  useEffect(() => {
    /*
      Har value change par ek timer start hota hai.
    */
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    /*
      Agar delay complete hone se pehle
      value dobara change ho jaye,
      previous timer cancel ho jata hai.
    */
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;