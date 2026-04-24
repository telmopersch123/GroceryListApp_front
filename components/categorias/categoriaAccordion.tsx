import { Categoria, TypeListRenderHome } from "@/app/types/typesGlobal";
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
  Leaf,
  Milk,
  Pencil,
  Shirt,
  ShoppingCart,
  Smile,
  Snowflake,
  Sparkles,
  Wine,
} from "lucide-react-native";
import { RefObject, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import CardList from "../ui/cardList";
import { RightAction } from "../ui/RightAction";

import { closeAllSwipes, SwipeableRef } from "@/app/utils/functionsSwipe";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { SharedValue } from "react-native-reanimated";
export const ICONES = [
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

export function CategoriaAccordion({
  categoria,
  listas,
  setListas,
  openSwipeRef,

  // onRemover,
}: {
  categoria: Categoria;
  listas: TypeListRenderHome[];
  setListas: React.Dispatch<React.SetStateAction<TypeListRenderHome[]>>;
  openSwipeRef: RefObject<SwipeableRef | null>;

  // onRemover: (id: string) => void;
}) {
  const [animationKey, setAnimationKey] = useState(0);

  const expandedRef = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const animRotate = useRef(new Animated.Value(0)).current;
  const animHeight = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(0);
  const swipeableRef = useRef<SwipeableRef | null>(null);
  function toggle() {
    closeAllSwipes(openSwipeRef);
    if (isSwiping) return;
    const abrindo = !expandedRef.current;
    expandedRef.current = abrindo;
    if (abrindo) {
      setAnimationKey((prev) => prev + 1);
    }
    setIsOpen(abrindo);
    Animated.parallel([
      Animated.timing(animRotate, {
        toValue: abrindo ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
      Animated.timing(animHeight, {
        toValue: abrindo ? contentHeight.current : 0,
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
      onSwipeableOpenStartDrag={() => {
        setIsSwiping(true);
      }}
      onSwipeableClose={() => setIsSwiping(false)}
      onSwipeableWillClose={() => setIsSwiping(false)}
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
      overshootRight={false}
      friction={1}
    >
      <View
        pointerEvents="box-none"
        style={[styles.categoriaCard, { paddingBottom: isOpen ? 4 : 14 }]}
      >
        <Pressable
          disabled={isSwiping}
          style={styles.categoriaRow}
          onPress={toggle}
        >
          <View style={styles.categoriaLeft}>
            <View style={styles.categoriaIcone}>
              <Icone size={22} color="#337539" />
            </View>
            <Text style={styles.categoriaText}>{categoria.nome}</Text>
          </View>
          <View style={styles.categoriaRight}>
            <Text style={styles.categoriaListas}>
              {listas.length} {listas.length === 1 ? "lista" : "listas"}
            </Text>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <ChevronRight size={18} color="#9E9E9E" />
            </Animated.View>
          </View>
        </Pressable>

        <Animated.View style={{ height: animHeight, overflow: "hidden" }}>
          <View
            onLayout={(e) => {
              contentHeight.current = e.nativeEvent.layout.height;
            }}
          >
            <View
              key={`accordion-key-${animationKey}`}
              style={styles.accordionContent}
            >
              {listas.length > 0 ? (
                listas.map((lista, index) => (
                  <CardList
                    key={lista.id}
                    lista={lista}
                    setListas={setListas}
                    openSwipeRef={openSwipeRef}
                    index={index}
                  />
                ))
              ) : (
                <Text style={styles.emptyListas}>
                  Nenhuma lista nesta categoria.
                </Text>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = StyleSheet.create({
  accordionContent: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    marginTop: 10,
    overflow: "hidden",
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
});
