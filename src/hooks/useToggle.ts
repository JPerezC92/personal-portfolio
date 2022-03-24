import { useCallback, useState } from "react";

export const useToggle = (initialState: boolean) => {
  const [isActive, setisActive] = useState(initialState);

  const toggle = useCallback(() => setisActive((state) => !state), []);
  return {
    isActive,
    toggle,
  };
};
