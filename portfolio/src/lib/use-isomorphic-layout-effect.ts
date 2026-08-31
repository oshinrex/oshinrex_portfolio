import { useEffect, useLayoutEffect } from "react";

// Runs before the browser paints on the client (avoiding a flash of the
// "wrong" state), and falls back to a no-op on the server where
// useLayoutEffect would otherwise print a warning.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
