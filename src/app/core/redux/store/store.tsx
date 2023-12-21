"use client"
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharacterModel } from '../../models/Character.model';

interface AppState {
  favoriteCharacters: CharacterModel[]; // Adjust the type based on your CharacterModel
}

const initialState: AppState = {
  favoriteCharacters: [],
};

const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action: PayloadAction<CharacterModel>) => {
      state.favoriteCharacters.push(action.payload);
    },
  },
});

export const { addFavoriteCharacter } = favoriteCharactersSlice.actions;

const rootReducer = favoriteCharactersSlice.reducer;

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;