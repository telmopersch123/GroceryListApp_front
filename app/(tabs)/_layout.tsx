import { Tabs } from "expo-router";
import { LayoutGrid, ShoppingBasket, Star } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#337539",
        tabBarActiveBackgroundColor: "#fff",
        tabBarInactiveBackgroundColor: "#fff",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: { height: 60, paddingBottom: 8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <ShoppingBasket
              size={24}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color, focused }) => (
            <Star
              size={24}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="categorias"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color, focused }) => (
            <LayoutGrid
              size={24}
              color={color}
              fill={focused ? color : "transparent"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
