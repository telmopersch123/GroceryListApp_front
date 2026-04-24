import { useGlobalStyles } from "@/constants/globalStyles";
import { useRouter } from "expo-router";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react-native";
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
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { showToast } from "../hooks/useToast";

export default function CriarLista() {
  const globalStyles = useGlobalStyles();
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
    showToast({
      type: "success",
      text1: "Pronto",
      text2: "A sua lista foi criada com sucesso!",
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
          <Text style={globalStyles.label}>Nome da lista</Text>
          <TextInput
            placeholder="Ex: Compras do mês de Janeiro"
            placeholderTextColor="#9E9E9E"
            value={nomeLista}
            maxLength={35}
            onChangeText={(text) => {
              setNomeLista(text);
              if (text.trim()) setErroNome("");
            }}
            style={[globalStyles.input, erroNome && globalStyles.inputError]}
          />
          <Text style={globalStyles.error}>{erroNome || " "}</Text>
        </View>
        <Text style={globalStyles.label}>Itens da sua lista</Text>
        <View style={globalStyles.row}>
          <TextInput
            placeholder="Adicionar item..."
            placeholderTextColor="#9E9E9E"
            value={item}
            maxLength={35}
            onChangeText={(text) => {
              setItem(text);
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
            style={globalStyles.addButton}
          >
            <Plus size={20} color="#fff" />
          </Pressable>
        </View>
        <Text style={globalStyles.error}>{erroItem || " "}</Text>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <View style={globalStyles.listContainer}>
          {ItensList.map((item, _) => (
            <Animated.View
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(300)}
              layout={LinearTransition.springify().damping(15)}
              key={item.id}
              style={globalStyles.itemCard}
            >
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
            </Animated.View>
          ))}
        </View>
      </ScrollView>
      <View style={globalStyles.buttonContainer}>
        <Pressable style={globalStyles.saveButton} onPress={handleSalvar}>
          <Save size={18} color="#fff" />
          <Text style={globalStyles.saveText}>Criar</Text>
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

  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212121",
    marginBottom: 10,
  },
});
