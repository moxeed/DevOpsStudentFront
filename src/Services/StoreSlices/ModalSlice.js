import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: null,
  
};

export const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState,
  reducers: {
    ShowModal: (state, action) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    HideModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { ShowModal, HideModal } = ModalSlice.actions;
export const ModalSelector = (state) => state.modal;
export default ModalSlice.reducer;
