import { globalStyles } from "@/constants/globalStyles";
import {
  Apple,
  Beef,
  Bike,
  Bone,
  ChevronRight,
  Cookie,
  Flame,
  Gift,
  Heart,
  Home,
  LayoutGrid,
  Leaf,
  Milk,
  Pencil,
  Plus,
  Shirt,
  ShoppingCart,
  Smile,
  Snowflake,
  Sparkles,
  Wine,
  X,
} from "lucide-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

interface Categoria {
  id: string;
  nome: string;
  iconeIndex: number;
}

interface IconeButtonProps {
  Icone: any;
  index: number;
  selecionado: boolean;
  onPress: (index: number) => void;
}

function IconeButton({ Icone, index, selecionado, onPress }: IconeButtonProps) {
  const anim = useRef(new Animated.Value(selecionado ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: selecionado ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [selecionado]);

  const bg = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#F5F5F5", "#337539"],
  });

  return (
    <Pressable onPress={() => onPress(index)}>
      <Animated.View style={[styles.iconButton, { backgroundColor: bg }]}>
        <Icone size={22} color={selecionado ? "#fff" : "#424242"} />
      </Animated.View>
    </Pressable>
  );
}

function CategoriaAccordion({ categoria }: { categoria: Categoria }) {
  const expandedRef = useRef(false);
  const animRotate = useRef(new Animated.Value(0)).current;
  const animHeight = useRef(new Animated.Value(0)).current;

  function toggle() {
    const abrindo = !expandedRef.current;
    expandedRef.current = abrindo;
    Animated.parallel([
      Animated.timing(animRotate, {
        toValue: abrindo ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(animHeight, {
        toValue: abrindo ? 50 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }

  const rotate = animRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  const Icone = ICONES[categoria.iconeIndex];

  return (
    <View style={styles.categoriaCard}>
      <Pressable style={styles.categoriaRow} onPress={toggle}>
        <View style={styles.categoriaLeft}>
          <View style={styles.categoriaIcone}>
            <Icone size={22} color="#337539" />
          </View>
          <Text style={styles.categoriaText}>{categoria.nome}</Text>
        </View>
        <View style={styles.categoriaRight}>
          <Text style={styles.categoriaListas}>0 listas</Text>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <ChevronRight size={18} color="#9E9E9E" />
          </Animated.View>
        </View>
      </Pressable>

      <Animated.View style={{ height: animHeight, overflow: "hidden" }}>
        <View style={styles.accordionContent}>
          <Text style={styles.emptyListas}>Nenhuma lista nesta categoria.</Text>
        </View>
      </Animated.View>
    </View>
  );
}

export default function Categorias() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [iconeSelecionado, setIconeSelecionado] = useState(0);
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const handleCreateCategory = () => {
    if (!nomeCategoria.trim()) {
      setError("O nome da categoria é obrigatório.");
      return;
    }
    const novaCategoria: Categoria = {
      id: Date.now().toString(),
      nome: nomeCategoria,
      iconeIndex: iconeSelecionado,
    };
    setCategorias((prev) => [...prev, novaCategoria]);
    ExitModal();
  };

  const ExitModal = () => {
    Keyboard.dismiss();
    setError("");
    setNomeCategoria("");
    setIconeSelecionado(0);
    setModalVisivel(false);
  };

  return (
    <SafeAreaView style={globalStyles.safe} onTouchStart={Keyboard.dismiss}>
      <View style={globalStyles.container}>
        <View style={styles.header}>
          <View>
            <Text style={globalStyles.title}>Categorias</Text>
            <Text style={globalStyles.subtitle}>Listas organizadas</Text>
          </View>
          {categorias.length > 0 && (
            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setModalVisivel(true)}
            >
              <Plus size={18} color="#fff" />
              <Text style={styles.text}>Nova categoria</Text>
            </Pressable>
          )}
        </View>

        {categorias.length === 0 ? (
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
              onPress={() => setModalVisivel(true)}
            >
              <Plus size={18} color="#fff" />
              <Text style={styles.text}>Nova categoria</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.listContainer}
            keyboardDismissMode="on-drag"
          >
            {categorias.map((categoria) => {
              return (
                <CategoriaAccordion key={categoria.id} categoria={categoria} />
              );
            })}
          </ScrollView>
        )}
      </View>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="fade"
        onRequestClose={ExitModal}
      >
        <Pressable style={styles.overlay} onPress={ExitModal}>
          <Pressable style={styles.modal} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nova Categoria</Text>
              <Pressable onPress={ExitModal}>
                <X size={20} color="#424242" />
              </Pressable>
            </View>

            <View style={globalStyles.inputContainer}>
              <Text style={styles.label}>NOME DA CATEGORIA</Text>
              <TextInput
                placeholder="Ex: Limpeza"
                placeholderTextColor="#9E9E9E"
                value={nomeCategoria}
                onChangeText={setNomeCategoria}
                maxLength={30}
                style={styles.input}
              />
              <Text style={globalStyles.error}>{error || " "}</Text>
            </View>

            <Text style={styles.label}>ÍCONE</Text>
            <View style={styles.iconGrid}>
              {ICONES.map((Icone, index) => (
                <IconeButton
                  key={index}
                  Icone={Icone}
                  index={index}
                  selecionado={iconeSelecionado === index}
                  onPress={setIconeSelecionado}
                />
              ))}
            </View>

            <View style={styles.modalFooter}>
              <Pressable style={styles.cancelButton} onPress={ExitModal}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </Pressable>
              <Pressable
                onPress={handleCreateCategory}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Salvar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  listContainer: {
    paddingTop: 10,
    paddingBottom: 100,
  },

  categoriaCardPressed: {
    opacity: 0.7,
  },
  categoriaLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoriaIcone: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: "#F0F7F1",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriaText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212121",
  },
  categoriaRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  categoriaListas: {
    fontSize: 13,
    color: "#9E9E9E",
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
    gap: 10,
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
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#757575",
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
    fontSize: 15,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  iconButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFooter: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  cancelText: {
    color: "#424242",
    fontWeight: "600",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#337539",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },

  accordionContent: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    marginTop: 10,
  },
  emptyListas: {
    fontSize: 13,
    color: "#9E9E9E",
    textAlign: "center",
    paddingVertical: 8,
  },
  categoriaCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  categoriaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
