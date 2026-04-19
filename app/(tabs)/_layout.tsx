import { Tabs } from "expo-router";
import { Clock, Heart, LayoutGrid, ShoppingBasket } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#337539",
        tabBarInactiveTintColor: "#757575",
        tabBarStyle: { height: 60, paddingBottom: 8 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <ShoppingBasket size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="favoritos"
        options={{
          title: "Favoritos",
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="historico"
        options={{
          title: "Histórico",
          tabBarIcon: ({ color }) => <Clock size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="categorias"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }) => <LayoutGrid size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
