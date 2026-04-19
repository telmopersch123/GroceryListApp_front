import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Copy, Plus, ShoppingCart, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeListRenderHome } from "../types/typesGlobal";

export default function Home() {
  const router = useRouter();
  const [listas, setListas] = useState<TypeListRenderHome[]>([]);
  const params = useLocalSearchParams();
  useEffect(() => {
    if (params.novaLista) {
      const lista = JSON.parse(params.novaLista as string);
      setListas((prev) => [...prev, lista]);
    }
  }, [params.novaLista]);
  return (
    <SafeAreaView style={globalStyles.safe}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Lista Mercado</Text>
        <Text style={globalStyles.subtitle}>Suas listas de compras </Text>
        {listas.length === 0 ? (
          <View style={globalStyles.emptyContainer}>
            <View style={globalStyles.iconCircle}>
              <ShoppingCart size={32} color="#424242" />
            </View>

            <Text style={globalStyles.emptyTitle}>Nenhuma lista ainda</Text>
            <Text style={globalStyles.emptyText}>
              Crie sua primeira lista de compras tocando no botão abaixo.
            </Text>
          </View>
        ) : (
          <View style={{ marginTop: 20 }}>
            <ScrollView>
              {listas.map((lista) => (
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: "/components/lista-aberta",
                      params: {
                        lista: JSON.stringify(lista),
                      },
                    })
                  }
                  key={lista.id}
                  style={styles.card}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{lista.name}</Text>

                    <View style={styles.iconContainer}>
                      <Pressable
                        style={({ pressed }) => [
                          styles.iconButton,
                          pressed && { transform: [{ scale: 0.9 }] },
                        ]}
                      >
                        {({ pressed }) => (
                          <Copy
                            size={18}
                            color={pressed ? "#2196F3" : "#424242"}
                          />
                        )}
                      </Pressable>

                      <Pressable
                        style={({ pressed }) => [
                          styles.iconButton,
                          pressed && { transform: [{ scale: 0.9 }] },
                        ]}
                      >
                        {({ pressed }) => (
                          <Star
                            size={18}
                            color={pressed ? "#FFD700" : "#424242"}
                          />
                        )}
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.progressRow}>
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar} />
                    </View>
                    <Text style={styles.progressText}>0%</Text>
                  </View>
                  <Text style={styles.itemsText}>
                    0/{lista.itens.length} itens
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <Pressable
        onPress={() => router.push("/components/criar-lista")}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Plus size={32} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EF7D0B",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  card: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#212121",
  },

  iconContainer: {
    flexDirection: "row",
    gap: 8,
  },

  progressContainer: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
    flex: 1,
  },

  progressBar: {
    width: "0%",
    height: "100%",
    backgroundColor: "#337539",
  },

  progressText: {
    marginTop: 5,
    fontSize: 12,
    color: "#757575",
  },

  itemsText: {
    marginTop: 5,
    fontSize: 13,
    color: "#424242",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  iconButton: {
    padding: 4,
    borderRadius: 6,
  },
});
