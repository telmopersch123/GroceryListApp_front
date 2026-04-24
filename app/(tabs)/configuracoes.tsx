import Colors from "@/constants/Colors";
import { useGlobalStyles } from "@/constants/globalStyles";
import { Moon, Sparkles } from "lucide-react-native";
import React from "react";
import { Animated, StyleSheet, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../context/SettingsContext";
type ColorScheme = typeof Colors.light;
export default function Configurações() {
  const {
    animationsEnabled,
    setAnimationsEnabled,
    isDark,
    toggleTheme,
    colors,
    themeAnim,
  } = useSettings();
  const globalStyles = useGlobalStyles();
  const styles = makeStyles(colors);
  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: themeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.3],
        }),
      }}
    >
      <SafeAreaView style={globalStyles.safe}>
        <View style={[globalStyles.container, styles.pagePadding]}>
          <Text style={globalStyles.title}>Configurações</Text>

          <Text style={styles.sectionTitle}>Preferências de exibição</Text>

          <View style={styles.card}>
            {/* Opção: Animações */}
            <View style={styles.row}>
              <View style={styles.iconLabel}>
                <Sparkles size={22} color="#337539" />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>Interface Animada</Text>
                  <Text style={styles.description}>
                    Transições e efeitos visuais
                  </Text>
                </View>
              </View>
              <Switch
                value={animationsEnabled}
                onValueChange={setAnimationsEnabled}
                trackColor={{ false: "#D1D1D1", true: "#337539" }}
              />
            </View>

            <View style={styles.divider} />

            {/* Opção: Dark Mode */}
            <View style={styles.row}>
              <View style={styles.iconLabel}>
                <Moon size={22} color="#337539" />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>Modo Escuro</Text>
                  <Text style={styles.description}>
                    Visual confortável para a noite
                  </Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: "#D1D1D1", true: "#337539" }}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const makeStyles = (colors: ColorScheme) =>
  StyleSheet.create({
    pagePadding: {
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.subtext,
      textTransform: "uppercase",
      marginBottom: 12,
      marginTop: 20,
      letterSpacing: 1,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
    },
    iconLabel: {
      flexDirection: "row",
      alignItems: "center",
      flex: 1,
    },
    textContainer: {
      marginLeft: 12,
    },
    label: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
    },
    description: {
      fontSize: 12,
      color: colors.subtext,
      marginTop: 2,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginLeft: 34,
    },
  });
