import { Trash2 } from "lucide-react-native";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export function TrashButton({
  onPress,
  color,
}: {
  onPress: () => void;
  color: string;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPressIn={() => (scale.value = withTiming(0.85, { duration: 120 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 150 }))}
      onPress={onPress}
    >
      <Animated.View style={animatedStyle}>
        <Trash2 size={20} color={color} />
      </Animated.View>
    </Pressable>
  );
}
