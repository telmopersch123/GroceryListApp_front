import { globalStyles } from "@/constants/globalStyles";
import { Clock } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Historico() {
  return (
    <SafeAreaView style={globalStyles.safe}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Histórico</Text>
        <Text style={globalStyles.subtitle}>Últimas 20 listas</Text>
        <View style={globalStyles.emptyContainer}>
          <View style={globalStyles.iconCircle}>
            <Clock size={32} color="#424242" />
          </View>

          <Text style={globalStyles.emptyTitle}>Histórico vazio</Text>
          <Text style={globalStyles.emptyText}>
            Suas listas recentes aparecerão aqui.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
