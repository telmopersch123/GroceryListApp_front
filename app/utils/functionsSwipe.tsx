import { RefObject } from "react";

export type SwipeableRef = {
  close: () => void;
  openLeft: () => void;
  openRight: () => void;
  reset: () => void;
};

export function handleSwipeOpen(
  ref: SwipeableRef,
  openSwipeRef: RefObject<SwipeableRef | null>
) {
  if (openSwipeRef.current && openSwipeRef.current !== ref) {
    openSwipeRef.current.close();
  }
  openSwipeRef.current = ref;
}

export function closeAllSwipes(openSwipeRef: RefObject<SwipeableRef | null>) {
  openSwipeRef.current?.close();
  openSwipeRef.current = null;
}
