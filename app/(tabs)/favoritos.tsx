import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Copy, Heart, Star } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeListRenderHome } from "../types/typesGlobal";

export default function Favorites() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [listas, setListas] = useState<TypeListRenderHome[]>([
    {
      id: "1",
      name: "Compras do mês",
      favorited: true,
      itens: [
        { id: "1", name: "Arroz", checked: false },
        { id: "2", name: "Feijão", checked: false },
      ],
    },
  ]);

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

  const favoritas = listas.filter((l) => l.favorited);

  return (
    <SafeAreaView style={globalStyles.safe}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Favoritos</Text>
        <Text style={globalStyles.subtitle}>Suas listas favoritas</Text>

        {favoritas.length === 0 ? (
          <View style={globalStyles.emptyContainer}>
            <View style={globalStyles.iconCircle}>
              <Heart size={32} color="#424242" />
            </View>

            <Text style={globalStyles.emptyTitle}>Sem favoritos</Text>
            <Text style={globalStyles.emptyText}>
              Favorite suas listas para acessá-las rapidamente aqui.
            </Text>
          </View>
        ) : (
          <View style={{ marginTop: 20 }}>
            <ScrollView>
              {favoritas.map((lista) => (
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
                        style={globalStyles.iconButton}
                      >
                        <Star size={18} color="#FFD700" fill="#FFD700" />
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
    </SafeAreaView>
  );
}
