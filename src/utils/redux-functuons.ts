function isPending(action: any) {
  return action.type.endsWith("pending");
}

function isRejected(action: any) {
  return action.type.endsWith("rejected");
}

function isSliceName(sliceName: string, action: any) {
  return action.type.startsWith(sliceName);
}

export const isActionPending = (sliceName: string) => {
  return (action: any) => isSliceName(sliceName, action) && isPending(action);
};

export const isActionRejected = (sliceName: string) => {
  return (action: any) => isSliceName(sliceName, action) && isRejected(action);
};

export const getActionName = (action: any) => action.type.split("/")[1];
