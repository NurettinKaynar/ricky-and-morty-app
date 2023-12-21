"use client"
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Adjust the path accordingly
import { CharacterModel } from '../../models/Character.model'; // Adjust the path accordingly

interface FavoriteCharactersState {
  list: CharacterModel[];
}

const initialState: FavoriteCharactersState = {
  list: [],
};

const favoriteCharactersSlice = createSlice({
  name: 'favoriteCharacters',
  initialState,
  reducers: {
    addFavoriteCharacter: (state, action: PayloadAction<CharacterModel>) => {
      state.list.push(action.payload);
    },
    removeFavoriteCharacter: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((character, index) => index !== action.payload);
    },
  },
});

export const { addFavoriteCharacter, removeFavoriteCharacter } = favoriteCharactersSlice.actions;

export const selectFavoriteCharacters = (state: RootState) => state.favoriteCharacters;

export default favoriteCharactersSlice.reducer;
