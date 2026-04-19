export type TypeListRenderHome = {
  id: string;
  name: string;
  itens: { id: string; name: string; checked: boolean }[];
};

export type TypeItens = {
  id: string;
  name: string;
  checked: boolean;
};
