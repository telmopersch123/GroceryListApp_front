export type TypeListRenderHome = {
  id: string;
  name: string;
  itens: { id: string; name: string; checked: boolean }[];
  favorited: boolean;
};

export type TypeItens = {
  id: string;
  name: string;
  checked: boolean;
};

export interface Categoria {
  id: string;
  nome: string;
  iconeIndex: number;
}
