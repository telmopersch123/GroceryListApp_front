import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}
