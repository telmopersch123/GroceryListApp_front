import { CategoriaAccordion } from "@/components/categorias/categoriaAccordion";
import { CategoryModal } from "@/components/categorias/ModalCategorias";
import { useGlobalStyles } from "@/constants/globalStyles";
import { LayoutGrid, Plus } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettings } from "../context/SettingsContext";
import { showToast } from "../hooks/useToast";
import { Categoria, TypeListRenderHome } from "../types/typesGlobal";
import { closeAllSwipes, SwipeableRef } from "../utils/functionsSwipe";

export default function Categorias() {
  const { colors } = useSettings();
  const globalStyles = useGlobalStyles();
  const styles = makeStyles(colors);

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
      name: "Mercado da semana",
      favorited: false,
      itens: [
        { id: "1", name: "Leite", checked: false },
        { id: "2", name: "Ovos", checked: false },
        { id: "3", name: "Pão francês", checked: false },
      ],
    },
    {
      id: "3",
      name: "Churrasco fim de semana",
      favorited: false,
      itens: [
        { id: "1", name: "Carne bovina", checked: false },
        { id: "2", name: "Carvão", checked: false },
        { id: "3", name: "Cerveja", checked: false },
      ],
    },
    {
      id: "4",
      name: "Casa e limpeza",
      favorited: false,
      itens: [
        { id: "1", name: "Detergente", checked: false },
        { id: "2", name: "Desinfetante", checked: false },
        { id: "3", name: "Esponja", checked: false },
      ],
    },
    {
      id: "5",
      name: "Hortifruti saudável",
      favorited: true,
      itens: [
        { id: "1", name: "Banana", checked: false },
        { id: "2", name: "Maçã", checked: false },
        { id: "3", name: "Alface", checked: false },
      ],
    },
  ]);

  const handleCreateCategory = () => {
    if (!nomeCategoria.trim()) {
      setError("O nome da categoria é obrigatório.");
      return;
    }

    setCategorias((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        nome: nomeCategoria,
        iconeIndex: iconeSelecionado,
      },
    ]);

    setError("");
    setNomeCategoria("");
    setIconeSelecionado(0);
    setModalVisivel(false);

    showToast({
      type: "success",
      text1: "Pronto",
      text2: "Categoria criada com sucesso!",
    });
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
              <Plus size={18} color={colors.background} />
              <Text style={styles.buttonText}>Nova categoria</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.divider} />

        {categorias.length === 0 ? (
          <View style={globalStyles.emptyContainer}>
            <View style={globalStyles.iconCircle}>
              <LayoutGrid size={32} color={colors.subtext} />
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
              <Plus size={18} color={colors.background} />
              <Text style={styles.buttonText}>Nova categoria</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.listContainer}
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {categorias.map((categoria) => (
              <CategoriaAccordion
                key={categoria.id}
                categoria={categoria}
                listas={listas}
                setListas={setListas}
                openSwipeRef={openSwipeRef}
              />
            ))}
          </ScrollView>
        )}
      </View>

      <CategoryModal
        visible={modalVisivel}
        onClose={() => setModalVisivel(false)}
        nomeCategoria={nomeCategoria}
        setNomeCategoria={setNomeCategoria}
        iconeSelecionado={iconeSelecionado}
        setIconeSelecionado={setIconeSelecionado}
        error={error}
        handleCreateCategory={handleCreateCategory}
        setError={setError}
      />
    </SafeAreaView>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    button: {
      backgroundColor: colors.primary,
      paddingVertical: 9,
      paddingHorizontal: 12,
      borderRadius: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 20,
    },

    buttonPressed: {
      opacity: 0.7,
    },

    buttonText: {
      color: colors.background,
      fontWeight: "bold",
      fontSize: 13,
    },

    listContainer: {
      paddingTop: 10,
      paddingBottom: 100,
    },

    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginTop: 12,
      marginHorizontal: -20,
    },
  });
