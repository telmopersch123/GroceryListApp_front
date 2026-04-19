import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Check,
  Heart,
  Pencil,
  RotateCcw,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeItens, TypeListRenderHome } from "../types/typesGlobal";
export default function ListaAberta() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [itens, setItens] = useState<TypeItens[]>([]);
  const [lista, setLista] = useState<TypeListRenderHome>();
  const total = itens.length;
  const concluidos = itens.filter((item) => item.checked).length;
  const porcentagem = total === 0 ? 0 : (concluidos / total) * 100;
  const widthInterpolada = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: porcentagem,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [porcentagem]);
  useEffect(() => {
    if (params.lista) {
      const lista = JSON.parse(params.lista as string);
      const itensFormatados = lista.itens.map((item: TypeItens) => ({
        ...item,
        checked: false,
      }));
      setLista(lista);
      setItens(itensFormatados);
    }
  }, [params.lista]);

  function toggleItem(id: string) {
    setItens((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, checked: !item.checked } : item;
      });
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#212121" />
        </Pressable>

        <Text style={styles.title}>{lista?.name}</Text>
      </View>

      <View style={styles.progressRow}>
        <View style={styles.progressContainer}>
          <Animated.View
            style={[styles.progressBar, { width: widthInterpolada }]}
          />
        </View>
        <Text style={styles.percent}>{Math.round(porcentagem)}%</Text>
      </View>

      <Text style={styles.subText}>
        {concluidos} de {total} itens adicionados no carrinho
      </Text>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            globalStyles.actionButton,
            pressed && globalStyles.actionButtonPressed,
          ]}
        >
          <>
            <Pencil size={16} color="#212121" />
            <Text style={styles.actionText}>Editar</Text>
          </>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            globalStyles.actionButton,
            pressed && globalStyles.actionButtonPressed,
          ]}
        >
          <>
            <Heart size={16} color="#212121" />
            <Text style={styles.actionText}>Favoritar</Text>
          </>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            globalStyles.actionButton,
            pressed && globalStyles.actionButtonPressed,
          ]}
        >
          <>
            <RotateCcw size={16} color="#212121" />
            <Text style={styles.actionText}>Reutilizar</Text>
          </>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {itens.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggleItem(item.id)}
            style={[styles.itemCard, item.checked && styles.itemChecked]}
          >
            <View style={[styles.circle, item.checked && styles.circleChecked]}>
              {item.checked && <Check strokeWidth={4} size={14} color="#fff" />}
            </View>
            <Text
              style={[styles.itemText, item.checked && styles.itemTextChecked]}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212121",
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressBar: {
    width: "0%",
    height: "100%",
    backgroundColor: "#337539",
  },

  percent: {
    fontSize: 12,
    color: "#757575",
  },

  subText: {
    marginTop: 5,
    fontSize: 13,
    color: "#757575",
    fontVariant: ["tabular-nums"],
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    marginBottom: 15,
  },

  actionText: {
    fontSize: 13,
    color: "#212121",
  },

  item: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    gap: 10,
  },

  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },

  circleChecked: {
    backgroundColor: "#337539",
    borderColor: "#337539",
  },

  itemChecked: {
    opacity: 0.6,
  },

  itemText: {
    fontSize: 16,
    color: "#212121",
  },

  itemTextChecked: {
    textDecorationLine: "line-through",
    color: "#757575",
  },
});
