import {
  CategoriaAccordion,
  ICONES,
} from "@/components/categorias/categoriaAccordion";
import { IconeButton } from "@/components/categorias/iconeButton";
import { globalStyles } from "@/constants/globalStyles";
import { LayoutGrid, Plus, X } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
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
import { showToast } from "../hooks/useToast";
import { Categoria, TypeListRenderHome } from "../types/typesGlobal";
import { closeAllSwipes, SwipeableRef } from "../utils/functionsSwipe";

export default function Categorias() {
  const openSwipeRef = useRef<SwipeableRef | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [iconeSelecionado, setIconeSelecionado] = useState(0);
  const [error, setError] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
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
    {
      id: "2",
      name: "Mercado semana",
      favorited: false,
      itens: [
        { id: "1", name: "Leite", checked: false },
        { id: "2", name: "Ovos", checked: false },
        { id: "3", name: "Pão", checked: false },
      ],
    },
    {
      id: "3",
      name: "Churrasco fim de semana",
      favorited: false,
      itens: [
        { id: "1", name: "Carne", checked: false },
        { id: "2", name: "Carvão", checked: false },
      ],
    },
  ]);

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
    showToast({
      type: "success",
      text1: "Pronto",
      text2: "Categoria criada com sucesso!",
    });
  };

  const ExitModal = () => {
    Keyboard.dismiss();
    setError("");
    setNomeCategoria("");
    setIconeSelecionado(0);
    setModalVisivel(false);
  };

  return (
    <SafeAreaView
      style={globalStyles.safe}
      onStartShouldSetResponderCapture={() => {
        closeAllSwipes(openSwipeRef);
        Keyboard.dismiss();
        return false;
      }}
    >
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
                <CategoriaAccordion
                  key={categoria.id}
                  categoria={categoria}
                  listas={listas}
                  setListas={setListas}
                  openSwipeRef={openSwipeRef}
                />
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
                onChangeText={(text) => {
                  setError("");
                  setNomeCategoria(text);
                }}
                maxLength={30}
                style={[styles.input, error && globalStyles.inputError]}
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
    marginTop: 8,
  },
  iconGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
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
});
