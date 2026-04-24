import { useSettings } from "@/app/context/SettingsContext";
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
interface IconeButtonProps {
  Icone: any;
  index: number;
  selecionado: boolean;
  onPress: (index: number) => void;
}
export function IconeButton({
  Icone,
  index,
  selecionado,
  onPress,
}: IconeButtonProps) {
  const anim = useRef(new Animated.Value(selecionado ? 1 : 0)).current;
  const { colors, isDark } = useSettings();
  useEffect(() => {
    Animated.timing(anim, {
      toValue: selecionado ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [selecionado]);

  const bg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [isDark ? "#FFF3E0" : colors.inputBg, colors.primary],
  });

  return (
    <Pressable onPress={() => onPress(index)}>
      <Animated.View style={[styles.iconButton, { backgroundColor: bg }]}>
        <Icone size={22} color={selecionado ? "#fff" : "#424242"} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#FFF3E0",
    justifyContent: "center",
    alignItems: "center",
  },
});
