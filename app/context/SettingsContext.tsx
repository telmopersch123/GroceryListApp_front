import Colors from "@/constants/Colors";
import React, { createContext, useContext, useRef, useState } from "react";
import { Animated } from "react-native";

const DURATION = 180;

const SettingsContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: (val: boolean) => {},
  colors: Colors.light,
  isDark: false,
  toggleTheme: () => {},
  themeAnim: new Animated.Value(0),
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isDark, setIsDark] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  const themeAnim = useRef(new Animated.Value(0)).current;

  const toggleTheme = () => {
    if (!animationsEnabled) {
      setIsDark((prev) => !prev);
      return;
    }

    Animated.timing(themeAnim, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true,
    }).start(() => {
      setIsDark((prev) => !prev);

      Animated.timing(themeAnim, {
        toValue: 0,
        duration: DURATION,
        useNativeDriver: true,
      }).start();
    });
  };

  const colors = isDark ? Colors.dark : Colors.light;

  return (
    <SettingsContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        colors,
        isDark,
        toggleTheme,
        themeAnim,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
