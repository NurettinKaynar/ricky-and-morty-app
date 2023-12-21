"use client";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CharacterModel } from "../../models/Character.model";

interface FavoriteCharactersState {
  favoriteCharacters: CharacterModel[];
}

const initialState: FavoriteCharactersState = {
  favoriteCharacters: [],
};

const favoriteCharactersSlice = createSlice({
  name: "favoriteCharacters",
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action: PayloadAction<CharacterModel>) => {
      state.favoriteCharacters.push(action.payload);
    },
    removeFavoriteCharacter: (state, action: PayloadAction<CharacterModel>) => {
      const characterIdToRemove = action.payload;
      state.favoriteCharacters = state.favoriteCharacters.filter(
        (character) => character.id !== characterIdToRemove.id
      );
    },
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter } =
  favoriteCharactersSlice.actions;

const rootReducer = favoriteCharactersSlice.reducer;

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
