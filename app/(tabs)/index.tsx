import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Copy, Plus, ShoppingCart, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
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

  function FavoritedList(list: TypeListRenderHome) {
    setListas((prev) =>
      prev.map((item) =>
        item.id === list.id ? { ...item, favorited: !item.favorited } : item
      )
    );
  }

  return (
    <SafeAreaView style={globalStyles.safe}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Lista Mercado</Text>
        <Text style={globalStyles.subtitle}>Suas listas de compras</Text>

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
                  key={lista.id}
                  onPress={() =>
                    router.push({
                      pathname: "/components/lista-aberta",
                      params: { lista: JSON.stringify(lista) },
                    })
                  }
                  style={globalStyles.card}
                >
                  <View style={globalStyles.cardHeader}>
                    <Text style={globalStyles.cardTitle}>{lista.name}</Text>

                    <View style={globalStyles.iconContainer}>
                      <Pressable
                        style={({ pressed }) => [
                          globalStyles.iconButton,
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
                        onPress={() => FavoritedList(lista)}
                        style={({ pressed }) => [
                          globalStyles.iconButton,
                          pressed && { transform: [{ scale: 0.9 }] },
                        ]}
                      >
                        {({ pressed }) => {
                          const isActive = lista.favorited || pressed;

                          return (
                            <Star
                              size={18}
                              color={isActive ? "#FFD700" : "#424242"}
                              fill={isActive ? "#FFD700" : "transparent"}
                            />
                          );
                        }}
                      </Pressable>
                    </View>
                  </View>

                  <View style={globalStyles.progressRow}>
                    <View style={globalStyles.progressContainer}>
                      <View style={globalStyles.progressBar} />
                    </View>
                    <Text style={globalStyles.progressText}>0%</Text>
                  </View>

                  <Text style={globalStyles.itemsText}>
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
          globalStyles.floatingButton,
          pressed && globalStyles.floatingButtonPressed,
        ]}
      >
        <Plus size={32} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}
