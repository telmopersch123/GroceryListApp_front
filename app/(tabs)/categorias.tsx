import { globalStyles } from "@/constants/globalStyles";
import { LayoutGrid, Plus } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Categorias() {
  return (
    <SafeAreaView style={globalStyles.safe}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Categorias</Text>
        <Text style={globalStyles.subtitle}>Listas organizadas</Text>
        <View style={globalStyles.emptyContainer}>
          <View style={globalStyles.iconCircle}>
            <LayoutGrid size={32} color="#424242" />
          </View>

          <Text style={globalStyles.emptyTitle}>Sem categorias</Text>
          <Text style={globalStyles.emptyText}>
            Crie categorias para organizar suas listas de compras.
          </Text>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => console.log("clicou")}
          >
            <Plus size={18} color="#fff" />
            <Text style={styles.text}>Nova categoria</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#337539",
    padding: 9,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});
