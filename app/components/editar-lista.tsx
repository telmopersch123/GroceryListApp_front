import { useSettings } from "@/app/context/SettingsContext";
import { TrashButton } from "@/components/ui/trashButton";
import { useGlobalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, FileEdit, Plus } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Keyboard,
  LayoutAnimation,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeItens } from "../types/typesGlobal";

export default function EditarLista() {
  const globalStyles = useGlobalStyles();
  const { colors, animationsEnabled } = useSettings();
  const styles = makeStyles(colors);
  const router = useRouter();
  const params = useLocalSearchParams();
  const [erroNome, setErroNome] = useState("");
  const [erroItem, setErroItem] = useState("");
  const [nomeLista, setNomeLista] = useState("");
  const [itemInput, setItemInput] = useState("");
  const [ItensList, setItensList] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    if (params.lista) {
      const lista = JSON.parse(params.lista as string);

      const itensFormatados = lista.itens.map((item: TypeItens) => ({
        ...item,
        checked: false,
      }));

      setItensList(itensFormatados);
      setNomeLista(lista.name);
    }
  }, [params.lista]);

  function handleSalvar() {
    let temErro = false;

    if (!nomeLista.trim()) {
      setErroNome("O nome da lista é obrigatório.");
      temErro = true;
    } else {
      setErroNome("");
    }

    if (!itemInput.trim() && ItensList.length === 0) {
      setErroItem("Adicione pelo menos um item");
      temErro = true;
    } else {
      setErroItem("");
    }

    if (temErro) return;

    const novaLista = {
      id: Date.now().toString(),
      name: nomeLista,
      itens: ItensList,
    };

    router.push({
      pathname: "/components/lista-aberta",
      params: {
        lista: JSON.stringify(novaLista),
      },
    });
  }

  function handleRemover(id: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItensList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <SafeAreaView style={styles.container} onTouchStart={Keyboard.dismiss}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>

        <Text style={styles.title}>Editar Lista</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={globalStyles.label}>Nome da lista</Text>

        <TextInput
          placeholder="Ex: Compras do mês de Janeiro"
          placeholderTextColor={colors.placeholder}
          value={nomeLista}
          maxLength={35}
          onChangeText={(text) => {
            setNomeLista(text);
            if (text.trim()) setErroNome("");
          }}
          style={[globalStyles.input, erroNome && globalStyles.inputError]}
        />

        <Text style={globalStyles.error}>{erroNome || ""}</Text>

        <Text style={globalStyles.label}>Itens da sua lista</Text>

        <View style={globalStyles.row}>
          <TextInput
            placeholder="Adicionar item..."
            placeholderTextColor={colors.placeholder}
            value={itemInput}
            maxLength={35}
            onChangeText={(text) => {
              setItemInput(text);

              if (text.length >= 35)
                return setErroItem("Limite de 35 caracteres");

              if (text.trim()) setErroItem("");
            }}
            style={[
              globalStyles.input,
              { flex: 1 },
              erroItem && globalStyles.inputError,
            ]}
          />

          <Pressable
            onPress={() => {
              if (!itemInput.trim()) return;

              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );

              const novoItem = {
                id: Date.now().toString(),
                name: itemInput,
              };

              setItensList((prev) => [...prev, novoItem]);
              setItemInput("");
              setErroItem("");
            }}
            style={globalStyles.addButton}
          >
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>

        <Text style={globalStyles.error}>{erroItem || ""}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        {ItensList.map((item) => (
          <Animated.View
            key={item.id}
            entering={animationsEnabled ? FadeIn.duration(120) : undefined}
            exiting={animationsEnabled ? FadeOut.duration(120) : undefined}
            layout={
              animationsEnabled ? LinearTransition.duration(180) : undefined
            }
            style={globalStyles.itemCard}
          >
            <Text style={globalStyles.itemText}>{item.name}</Text>

            <TrashButton
              onPress={() => handleRemover(item.id)}
              color={colors.text}
            />
          </Animated.View>
        ))}
      </ScrollView>

      <View style={globalStyles.buttonContainer}>
        <Pressable style={globalStyles.saveButton} onPress={handleSalvar}>
          <FileEdit size={18} color="#fff" />
          <Text style={globalStyles.saveText}>Confirmar alterações</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: colors.background,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 15,
      paddingTop: 10,
    },

    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },

    formContainer: {
      marginBottom: 20,
      marginTop: 20,
    },
  });
