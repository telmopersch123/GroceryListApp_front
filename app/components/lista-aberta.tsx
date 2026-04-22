import { globalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Apple,
  ArrowLeft,
  Beef,
  Bike,
  Bone,
  Check,
  Cookie,
  Flame,
  Gift,
  Heart,
  Home,
  Leaf,
  Milk,
  Pencil,
  Shirt,
  ShoppingCart,
  Smile,
  Snowflake,
  Sparkles,
  Tag,
  Wine,
  X,
} from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeItens, TypeListRenderHome } from "../types/typesGlobal";
const CATEGORIAS_MOCK = [
  { id: "1", nome: "Limpeza", iconeIndex: 0 },
  { id: "2", nome: "Frutas", iconeIndex: 1 },
  { id: "3", nome: "Carnes", iconeIndex: 2 },
  { id: "4", nome: "Bebidas", iconeIndex: 5 },
  { id: "5", nome: "Higiene", iconeIndex: 6 },
  { id: "6", nome: "Padaria", iconeIndex: 3 },
  { id: "7", nome: "Laticínios", iconeIndex: 4 },
  { id: "8", nome: "Congelados", iconeIndex: 16 },
  { id: "9", nome: "Temperos", iconeIndex: 7 },
  { id: "10", nome: "Petshop", iconeIndex: 9 },
  { id: "11", nome: "Papelaria", iconeIndex: 10 },
  { id: "12", nome: "Roupas", iconeIndex: 12 },
  { id: "13", nome: "Casa", iconeIndex: 13 },
  { id: "14", nome: "Hortifruti", iconeIndex: 14 },
  { id: "15", nome: "Presentes", iconeIndex: 17 },
];
const ICONES = [
  ShoppingCart,
  Apple,
  Beef,
  Cookie,
  Milk,
  Wine,
  Sparkles,
  Heart,
  Smile,
  Bone,
  Pencil,
  Bike,
  Shirt,
  Home,
  Leaf,
  Flame,
  Snowflake,
  Gift,
];
export default function ListaAberta() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const progressAnim = useRef(new Animated.Value(0)).current;

  const [modalCategorias, setModalCategorias] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    string | null
  >(null);
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
    console.log(params);
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

  const categoriaAtual = CATEGORIAS_MOCK.find(
    (c) => c.id === categoriaSelecionada
  );

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
          onPress={() =>
            router.push({
              pathname: "/components/editar-lista",
              params: {
                lista: JSON.stringify(lista),
              },
            })
          }
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
          onPress={() => setModalCategorias(true)}
        >
          <>
            <Tag
              size={16}
              color={categoriaSelecionada ? "#337539" : "#212121"}
            />
            <Text
              style={[
                styles.actionText,
                categoriaSelecionada && { color: "#337539" },
              ]}
            >
              {categoriaAtual ? categoriaAtual.nome : "Categorizar"}
            </Text>
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

      <Modal
        visible={modalCategorias}
        transparent
        animationType="fade"
        onRequestClose={() => setModalCategorias(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Categorizar lista</Text>
              <Pressable onPress={() => setModalCategorias(false)}>
                <X size={20} color="#424242" />
              </Pressable>
            </View>
            <ScrollView
              contentContainerStyle={{ gap: 12 }}
              showsVerticalScrollIndicator={false}
            >
              {CATEGORIAS_MOCK.map((categoria) => {
                const Icone = ICONES[categoria.iconeIndex];
                const selecionado = categoriaSelecionada === categoria.id;
                return (
                  <Pressable
                    key={categoria.id}
                    style={({ pressed }) => [
                      styles.categoriaItem,
                      selecionado && styles.categoriaItemSelecionado,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => {
                      setCategoriaSelecionada(
                        selecionado ? null : categoria.id
                      );
                      setModalCategorias(false);
                    }}
                  >
                    <View
                      style={[
                        styles.categoriaIcone,
                        selecionado && styles.categoriaIconeSelecionado,
                      ]}
                    >
                      <Icone
                        size={20}
                        color={selecionado ? "#fff" : "#337539"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.categoriaNome,
                        selecionado && { color: "#337539" },
                      ]}
                    >
                      {categoria.nome}
                    </Text>
                    {selecionado && <Check size={18} color="#337539" />}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxHeight: "80%",

    gap: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
  },
  categoriaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  categoriaItemSelecionado: {
    borderColor: "#337539",
    backgroundColor: "#F0F7F1",
  },
  categoriaIcone: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#F0F7F1",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriaIconeSelecionado: {
    backgroundColor: "#337539",
  },
  categoriaNome: {
    flex: 1,
    fontSize: 15,
    color: "#212121",
  },
});
