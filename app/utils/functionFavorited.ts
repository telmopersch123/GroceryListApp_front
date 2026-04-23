import { TypeListRenderHome } from "../types/typesGlobal";

export function FavoritedList(
  list: TypeListRenderHome,
  setListas: React.Dispatch<React.SetStateAction<TypeListRenderHome[]>>
) {
  setListas((prev) =>
    prev.map((item) =>
      item.id === list.id ? { ...item, favorited: !item.favorited } : item
    )
  );
}
