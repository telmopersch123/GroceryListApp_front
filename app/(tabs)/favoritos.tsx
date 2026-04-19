import { globalStyles } from "@/constants/globalStyles";
import { Heart } from "lucide-react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Favorites() {
  return (
    <SafeAreaView style={globalStyles.safe}>
      <View style={globalStyles.container}>
        <Text style={globalStyles.title}>Favoritos</Text>
        <Text style={globalStyles.subtitle}>Suas listas favoritas</Text>
        <View style={globalStyles.emptyContainer}>
          <View style={globalStyles.iconCircle}>
            <Heart size={32} color="#424242" />
          </View>

          <Text style={globalStyles.emptyTitle}>Sem favoritos</Text>
          <Text style={globalStyles.emptyText}>
            Favorite suas listas para acessá-las rapidamente aqui.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
