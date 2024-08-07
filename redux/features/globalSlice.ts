import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  open: boolean;
  activeItem: number;
  route: string;
  // Add other global state properties here
  setOpen: (open: boolean) => void;
  setActiveItem: (activeItem: number) => void;
  setRoute: (route: string) => void;
}

const initialState : GlobalState = {
    open: false,
    activeItem: 0,
    route: 'Login',
    setOpen: (open: boolean) => {},
    setActiveItem: (activeItem: number) => {},
    setRoute: (route: string) => {},
};

const globalSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
    setActiveItem: (state, action: PayloadAction<number>) => {
      state.activeItem = action.payload;
    },
    setRoute: (state, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
  },
});

export const { setOpen, setActiveItem, setRoute } = globalSlice.actions;
export default globalSlice.reducer;
