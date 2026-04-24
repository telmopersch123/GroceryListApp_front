import { useSettings } from "@/app/context/SettingsContext";
import { TypeListRenderHome } from "@/app/types/typesGlobal";
import { FavoritedList } from "@/app/utils/functionFavorited";
import { SwipeableRef } from "@/app/utils/functionsSwipe";
import { useGlobalStyles } from "@/constants/globalStyles";
import { router } from "expo-router";
import { Copy, Star } from "lucide-react-native";
import { RefObject, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, {
  FadeInDown,
  LinearTransition,
  SharedValue,
} from "react-native-reanimated";
import { RightAction } from "./RightAction";

interface PropsCardList {
  lista: TypeListRenderHome;
  setListas: React.Dispatch<React.SetStateAction<TypeListRenderHome[]>>;
  openSwipeRef: RefObject<SwipeableRef | null>;
  index: number;
}

export default function CardList({
  lista,
  setListas,
  openSwipeRef,
  index,
}: PropsCardList) {
  const { animationsEnabled } = useSettings();
  const swipeableRef = useRef<SwipeableRef | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const globalStyles = useGlobalStyles();
  return (
    <Animated.View
      entering={
        animationsEnabled
          ? FadeInDown.delay(index * 100)
              .duration(600)
              .springify()
          : undefined
      }
      layout={LinearTransition}
    >
      <ReanimatedSwipeable
        ref={swipeableRef}
        onSwipeableOpen={() => {
          if (
            openSwipeRef.current &&
            openSwipeRef.current !== swipeableRef.current
          ) {
            openSwipeRef.current.close();
          }

          openSwipeRef.current = swipeableRef.current;
        }}
        renderRightActions={(
          prog: SharedValue<number>,
          drag: SharedValue<number>
        ) => (
          <RightAction
            prog={prog}
            drag={drag}
            // onRemover={() => onRemover(categoria.id)}
          />
        )}
        onSwipeableWillOpen={() => setIsSwiping(true)}
        onSwipeableClose={() => setIsSwiping(false)}
        onSwipeableWillClose={() => setIsSwiping(false)}
        friction={1}
        overshootRight={false}
        rightThreshold={30}
      >
        <Pressable
          disabled={isSwiping}
          key={lista.id}
          onPress={() =>
            router.push({
              pathname: "/components/lista-aberta",
              params: { lista: JSON.stringify(lista) },
            })
          }
          style={globalStyles.card}
        >
          <View style={globalStyles.cardHeader}>
            <Text style={globalStyles.cardTitle}>{lista.name}</Text>

            <View style={globalStyles.iconContainer}>
              <Pressable
                style={({ pressed }) => [
                  globalStyles.iconButton,
                  pressed && { transform: [{ scale: 0.9 }] },
                ]}
              >
                {({ pressed }) => (
                  <Copy size={18} color={pressed ? "#2196F3" : "#424242"} />
                )}
              </Pressable>

              <Pressable
                onPress={() => FavoritedList(lista, setListas)}
                style={({ pressed }) => [
                  globalStyles.iconButton,
                  pressed && { transform: [{ scale: 0.9 }] },
                ]}
              >
                {({ pressed }) => {
                  const isActive = lista.favorited || pressed;

                  return (
                    <Star
                      size={18}
                      color={isActive ? "#FFD700" : "#424242"}
                      fill={isActive ? "#FFD700" : "transparent"}
                    />
                  );
                }}
              </Pressable>
            </View>
          </View>

          <View style={globalStyles.progressRow}>
            <View style={globalStyles.progressContainer}>
              <View style={globalStyles.progressBar} />
            </View>
            <Text style={globalStyles.progressText}>0%</Text>
          </View>

          <Text style={globalStyles.itemsText}>
            0/{lista.itens.length} itens
          </Text>
        </Pressable>
      </ReanimatedSwipeable>
    </Animated.View>
  );
}
