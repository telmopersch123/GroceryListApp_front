import { Toast } from "@/components/ui/Toast";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SettingsProvider } from "./context/SettingsContext";
import { useToast } from "./hooks/useToast";

export default function RootLayout() {
  const { toast, hide } = useToast();
  return (
    <>
      <SettingsProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="criar-lista"
            options={{
              presentation: "modal",
              headerShown: true,
              title: "Nova lista",
            }}
          />
        </Stack>
        <Toast {...toast} onHide={hide} />
      </SettingsProvider>
    </>
  );
}
