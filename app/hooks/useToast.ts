import { useState } from "react";

type ToastType = "success" | "error" | "info";

interface ToastData {
  type: ToastType;
  text1: string;
  text2?: string;
}

interface ToastState extends ToastData {
  visible: boolean;
}

let externalShow: ((data: ToastData) => void) | null = null;

export function useToast() {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    type: "success",
    text1: "",
  });

  const show = (data: ToastData) => {
    setToast({ ...data, visible: true });
  };

  const hide = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  externalShow = show;

  return { toast, show, hide };
}

export function showToast(data: ToastData) {
  externalShow?.(data);
}
