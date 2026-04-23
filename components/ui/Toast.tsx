import { CheckCircle, Info, XCircle } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
type ToastType = "success" | "error" | "info";

const COLORS: Record<ToastType, string> = {
  success: "#337539",
  error: "#D32F2F",
  info: "#1565C0",
};

interface Props {
  visible: boolean;
  type: ToastType;
  text1: string;
  text2?: string;
  onHide: () => void;
  visibilityTime?: number;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={22} color="#337539" />,
  error: <XCircle size={22} color="#D32F2F" />,
  info: <Info size={22} color="#1565C0" />,
};

export function Toast({
  visible,
  type,
  text1,
  text2,
  onHide,
  visibilityTime = 3000,
}: Props) {
  const translateX = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 8,
      }).start();

      const timeout = setTimeout(() => {
        Animated.timing(translateX, {
          toValue: 400,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide());
      }, visibilityTime - 300);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
        position: "absolute",
        bottom: 32,
        right: 16,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        minWidth: 260,
        borderLeftWidth: 5,
        borderLeftColor: COLORS[type],
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 6,
        zIndex: 9999,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {ICONS[type]}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: "600", color: "#212121" }}>
            {text1}
          </Text>
          {text2 && (
            <Text style={{ fontSize: 14, color: "#757575", marginTop: 4 }}>
              {text2}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
