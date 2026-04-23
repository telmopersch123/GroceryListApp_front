import CardList from "@/components/ui/cardList";
import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Plus, ShoppingCart } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeListRenderHome } from "../types/typesGlobal";
import { closeAllSwipes, SwipeableRef } from "../utils/functionsSwipe";

export default function Home() {
  const router = useRouter();
  const [listas, setListas] = useState<TypeListRenderHome[]>([]);
  const params = useLocalSearchParams();
  const openSwipeRef = useRef<SwipeableRef | null>(null);

  useEffect(() => {
    if (params.novaLista) {
      const lista = JSON.parse(params.novaLista as string);
      setListas((prev) => [...prev, lista]);
    }
  }, [params.novaLista]);

  return (
    <SafeAreaView
      style={globalStyles.safe}
      onStartShouldSetResponderCapture={() => {
        closeAllSwipes(openSwipeRef);
        return false;
      }}
    >
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
