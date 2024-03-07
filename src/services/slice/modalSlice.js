
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  isOpen: false,
  content: null,
  activeModal: null,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.activeModal = action.payload.active;
    },
    closeModal(state) {
      state.isOpen = false;
      state.title = '';
      state.content = null;
      state.activeModal = null;
    },

  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalState = state => state.modal;

export const selectActiveModal = state => state.modal.activeModal;

//export default modalSlice.reducer;
export const { actions: modalActions, reducer: modalReducer } = modalSlice;
