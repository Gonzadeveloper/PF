import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  id: number;
  title: string;
  content: string;
  price: number;
  img: string;
}

interface ArticlesState {
  list: Article[];
}

const initialState: ArticlesState = {
  list: [],
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setArticles(state, action: PayloadAction<Article[]>) {
      state.list = action.payload;
    },
  },
});

export const { setArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
