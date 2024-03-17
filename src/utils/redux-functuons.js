function isPending(action) {
  return action.type.endsWith("pending");
}

function isRejected(action) {
  return action.type.endsWith("rejected");
}

function isSliceName(sliceName, action) {
  return action.type.startsWith(sliceName);
}

export function isActionPending(sliceName) {
  return (action) => isPending(action) && isSliceName(sliceName, action);
}

export function isActionRejected(sliceName) {
  return (action) => isRejected(action) && isSliceName(sliceName, action);
}

export function getActionName(actionType) {
  return actionType.split("/")[1];
}
