import CardList from "@/components/ui/cardList";
import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams } from "expo-router";
import { Heart } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeListRenderHome } from "../types/typesGlobal";
import { closeAllSwipes, SwipeableRef } from "../utils/functionsSwipe";

export default function Favorites() {
  const params = useLocalSearchParams();
  const openSwipeRef = useRef<SwipeableRef | null>(null);
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

  const favoritas = listas.filter((l) => l.favorited);

  return (
    <SafeAreaView
      style={globalStyles.safe}
      onStartShouldSetResponderCapture={() => {
        closeAllSwipes(openSwipeRef);
        return false;
      }}
    >
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
                <CardList
                  key={lista.id}
                  lista={lista}
                  setListas={setListas}
                  openSwipeRef={openSwipeRef}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
