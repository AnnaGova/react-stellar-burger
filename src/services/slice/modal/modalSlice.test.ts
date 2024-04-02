import { closeModal, initialState, modalReducer, openModal } from "./modalSlice";

describe("modalSlice", () => {
  test("should open modal", () => {
    const newState = modalReducer(
      initialState,
      openModal({
        title: "Test Modal",
        content: "Test Content",
        active: "test",
        isOpen: true,
      })
    );

    expect(newState).toEqual({
      title: "Test Modal",
      isOpen: true,
      content: "Test Content",
      activeModal: "test",
    });
  });

  test("should close modal", () => {
    let newState = modalReducer(
      initialState,
      openModal({
        title: "Test Modal",
        content: "Test Content",
        active: "test",
        isOpen: true,
      })
    );

    newState = modalReducer(newState, closeModal());

    expect(newState).toEqual(initialState);
  });
});
