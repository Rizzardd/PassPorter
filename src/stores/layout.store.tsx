import { createStore } from "zustand/vanilla";

export type LayoutState = {
  menuIsOpened: boolean;
};

export type LayoutActions = {
  toggleMenu: () => void;
  setMenuOpened: (opened: boolean) => void;
};

export type LayoutStore = LayoutState & LayoutActions;

export const initLayoutStore = (): LayoutState => {
  return {
    menuIsOpened: false,
  };
};

export const defaultInitState: LayoutState = {
  menuIsOpened: false,
};

export const createLayoutStore = (
  initState: LayoutState = defaultInitState
) => {
  return createStore<LayoutStore>()((set) => ({
    ...initState,
    setMenuOpened(opened: boolean) {
      set((state) => ({
        menuIsOpened: opened,
      }));
    },
    toggleMenu() {
      set((state) => ({
        menuIsOpened: !state.menuIsOpened,
      }));
    },
  }));
};
