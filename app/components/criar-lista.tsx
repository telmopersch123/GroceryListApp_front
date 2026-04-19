import { globalStyles } from "@/constants/globalStyles";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, Save, Trash } from "lucide-react-native";
import { useState } from "react";
import {
  Keyboard,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CriarLista() {
  const [nomeLista, setNomeLista] = useState("");
  const [item, setItem] = useState("");
  const [erroNome, setErroNome] = useState("");
  const [erroItem, setErroItem] = useState("");
  const [ItensList, setItensList] = useState<{ id: string; name: string }[]>(
    []
  );
  const router = useRouter();
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  function handleSalvar() {
    let temErro = false;
    if (!nomeLista.trim()) {
      setErroNome("O nome da lista é obrigatório.");
      temErro = true;
    } else {
      setErroNome("");
    }

    if (!item.trim() && ItensList.length === 0) {
      setErroItem("Adicione pelo menos um item");
      temErro = true;
    } else {
      setErroItem("");
    }
    if (ItensList.length === 0) {
      setErroItem("Adicione pelo menos um item");
      temErro = true;
    }
    if (temErro) return;
    const novaLista = {
      id: Date.now().toString(),
      name: nomeLista,
      itens: ItensList,
    };
    router.push({
      pathname: "/",
      params: {
        novaLista: JSON.stringify(novaLista),
      },
    });
  }

  function handleRemover(id: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItensList((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <SafeAreaView style={globalStyles.safe} onTouchStart={Keyboard.dismiss}>
      <View style={globalStyles.containerRow}>
        <Pressable onPress={() => router.back()}>
          <ArrowLeft size={24} color="#212121" />
        </Pressable>
        <Text style={globalStyles.titleSecondary}>Nova Lista</Text>
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 5 }}>
          <Text style={styles.label}>Nome da lista</Text>
          <TextInput
            placeholder="Ex: Compras do mês de Janeiro"
            value={nomeLista}
            maxLength={35}
            onChangeText={(text) => {
              setNomeLista(text);
              if (text.trim()) setErroNome("");
            }}
            style={[styles.input, erroNome && globalStyles.inputError]}
          />
          <Text style={styles.error}>{erroNome || " "}</Text>
        </View>
        <Text style={styles.label}>Itens da sua lista</Text>
        <View style={styles.row}>
          <TextInput
            placeholder="Adicionar item..."
            value={item}
            maxLength={35}
            onChangeText={(text) => {
              setItem(text);
              if (text.length >= 35)
                return setErroItem("Limite de 35 caracteres");
              if (text.trim()) setErroItem("");
            }}
            style={[
              styles.input,
              { flex: 1 },
              erroItem && globalStyles.inputError,
            ]}
          />

          <Pressable
            onPress={() => {
              if (!item.trim()) return;
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              const novoItem = {
                id: Date.now().toString(),
                name: item,
              };
              setItensList((prev) => [...prev, novoItem]);
              setErroItem("");

              setItem("");
            }}
            style={styles.addButton}
          >
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>
        <Text style={styles.error}>{erroItem || " "}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.listContainer}>
          {ItensList.map((item, _) => (
            <View key={item.id} style={styles.itemCard}>
              <Text style={styles.itemText}>{item.name}</Text>
              <Pressable
                onPress={() => handleRemover(item.id)}
                style={({ pressed }) => [
                  styles.trashButton,
                  pressed && { transform: [{ scale: 0.9 }] },
                ]}
              >
                <Trash size={20} color="red" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.saveButton} onPress={handleSalvar}>
          <Save size={18} color="#fff" />
          <Text style={styles.saveText}>Salvar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  container: {
    padding: 20,
  },

  label: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  addButton: {
    backgroundColor: "#337539",
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  saveButton: {
    backgroundColor: "#337539",
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
  },

  error: {
    color: "red",
    padding: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 10,
  },

  itemCard: {
    backgroundColor: "#F5F5F5",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  itemText: {
    fontSize: 16,
    color: "#212121",
  },
  trashButton: {
    padding: 5,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
  },
});
