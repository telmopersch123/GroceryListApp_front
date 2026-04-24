import { useGlobalStyles } from "@/constants/globalStyles";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, FileEdit, Plus, Trash2 } from "lucide-react-native";
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
import { SafeAreaView } from "react-native-safe-area-context";
import { TypeItens } from "../types/typesGlobal";
export default function EditarLista() {
  const globalStyles = useGlobalStyles();
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
          <ArrowLeft size={24} color="#212121" />
        </Pressable>
        <Text style={styles.title}>Editar Lista</Text>
      </View>
      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <View>
          <Text style={globalStyles.label}>Nome da lista</Text>
          <TextInput
            placeholder="Ex: Compras do mês de Janeiro"
            value={nomeLista}
            maxLength={35}
            onChangeText={(text) => {
              setNomeLista(text);
              if (text.trim()) setErroNome("");
            }}
            style={[globalStyles.input, erroNome && globalStyles.inputError]}
          />
          <Text style={globalStyles.error}>{erroNome || ""}</Text>
        </View>
        <Text style={globalStyles.label}>Itens da sua lista</Text>
        <View style={globalStyles.row}>
          <TextInput
            placeholder="Adicionar item..."
            placeholderTextColor="#9E9E9E"
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
              setErroItem("");

              setItemInput("");
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
        <View>
          {ItensList.map((item) => (
            <View key={item.id} style={globalStyles.itemCard}>
              <Text style={globalStyles.itemText}>{item.name}</Text>
              <Pressable
                onPress={() => handleRemover(item.id)}
                style={({ pressed }) => [
                  globalStyles.trashButton,
                  pressed && { transform: [{ scale: 0.9 }] },
                ]}
              >
                {({ pressed }) => (
                  <Trash2 size={20} color={pressed ? "#E53935" : "black"} />
                )}
              </Pressable>
            </View>
          ))}
        </View>
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
