import { UseToastOptions } from "@chakra-ui/react";

/// temporary code (unused code)
export const handleErrorMessage = (
  toasts: (options: UseToastOptions | undefined) => void,
  toastPosition: any,
  dispatch: {
    (arg0: { type: string; payload?: any }): void;
  },
  error: any,
  actionType: string
) => {
  const message =
    error.response?.data?.msg ||
    error.response?.data?.error ||
    error.response?.data ||
    error.response ||
    error.message;

  dispatch({
    type: actionType,
    payload: message,
  });

  toasts({
    title: message?.toString(),
    status: "error",
    duration: 6000,
    position: toastPosition ? toastPosition : "top-right",
    isClosable: true,
  });
};

// updated code
export function handleSagaErrorMessage(
  toasts: (options: UseToastOptions | undefined) => void,
  toastPosition: any,
  error: any,
  actionType: string
): { type: string; payload: any } {
  const message =
    error.response?.data?.msg ||
    error.response?.data?.error ||
    error.response?.data ||
    error.response ||
    error.message;

  toasts({
    title: message?.toString(),
    status: "error",
    duration: 6000,
    position: toastPosition ? toastPosition : "top-right",
    isClosable: true,
  });

  return { type: actionType, payload: message };
}
