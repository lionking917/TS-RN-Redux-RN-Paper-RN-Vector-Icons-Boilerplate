import { Note } from '../types/interfaces';

export const ADD_NOTE = 'ADD_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const ARCHIVE_NOTE = 'ARCHIVE_NOTE';
export const UNARCHIVE_NOTE = 'UNARCHIVE_NOTE';
export const FAVORITE_NOTE = 'FAVORITE_NOTE';
export const UNFAVORITE_NOTE = 'UNFAVORITE_NOTE';

export const TOGGLE_THEME = 'TOGGLE_THEME';

export function addNote(note: Note) {
  return {
    type: ADD_NOTE,
    payload: note,
  };
}

export function updateNote(note: Note) {
  return {
    type: UPDATE_NOTE,
    payload: note,
  };
}

export function archiveNote(id: number) {
  return {
    type: ARCHIVE_NOTE,
    payload: id,
  };
}

export function unArchiveNote(id: number) {
  return {
    type: UNARCHIVE_NOTE,
    payload: id,
  };
}

export function favoriteNote(id: number) {
  return {
    type: FAVORITE_NOTE,
    payload: id,
  };
}

export function unFavoriteNote(id: number) {
  return {
    type: UNFAVORITE_NOTE,
    payload: id,
  };
}

export function toggleTheme() {
  return {
    type: TOGGLE_THEME,
    payload: {},
  };
}
