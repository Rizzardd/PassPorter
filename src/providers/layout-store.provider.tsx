"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  type LayoutStore,
  createLayoutStore,
  initLayoutStore,
} from "@/stores/layout.store";

export type LayoutStoreApi = ReturnType<typeof createLayoutStore>;

export const LayoutStoreContext = createContext<LayoutStoreApi | undefined>(
  undefined
);

export interface LayoutStoreProviderProps {
  children: ReactNode;
}

export const LayoutStoreProvider = ({ children }: LayoutStoreProviderProps) => {
  const storeRef = useRef<LayoutStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createLayoutStore(initLayoutStore());
  }

  return (
    <LayoutStoreContext.Provider value={storeRef.current}>
      {children}
    </LayoutStoreContext.Provider>
  );
};

export function useLayoutStore<T = LayoutStore>(
  selector?: (store: LayoutStore) => T
): T {
  const layoutStoreContext = useContext(LayoutStoreContext);

  if (!layoutStoreContext) {
    throw new Error(`useLayoutStore must be used within LayoutStoreProvider`);
  }
  const defaultSelector: (store: LayoutStore) => T = (x) => x as any;

  return useStore(layoutStoreContext, selector ?? defaultSelector);
}
