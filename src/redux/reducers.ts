import { Note } from '../types/interfaces';
import {
  ADD_NOTE,
  UPDATE_NOTE,
  ARCHIVE_NOTE,
  FAVORITE_NOTE,
  UNARCHIVE_NOTE,
  UNFAVORITE_NOTE,
  TOGGLE_THEME,
} from './actions';

const notesInitialState = {
  notes: [],
};

const settingsInitialState = {
  theme: 'light',
};

export const notesReducer = (state = notesInitialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_NOTE:
      let note: Note = payload;
      let newNotes: Note[] = state.notes || [];

      newNotes.push({
        ...note,
        id: newNotes.length + 1,
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
        is_archived: false,
        is_favorite: false,
      });
      return {
        ...state,
        notes: newNotes,
      };
    case UPDATE_NOTE:
      note = payload;
      let index = state.notes.findIndex((item: Note) => item.id === note.id);
      if (index !== -1) {
        let newNotes: Note[] = [...state.notes];
        const newNote = {
          ...newNotes[index],
          ...note,
          updated_at: new Date().getTime(),
        };
        newNotes[index] = newNote;
        return {
          ...state,
          notes: newNotes,
        };
      }
      return state;
    case ARCHIVE_NOTE:
    case FAVORITE_NOTE:
    case UNARCHIVE_NOTE:
    case UNFAVORITE_NOTE:
      let id = payload;
      index = state.notes.findIndex((item: Note) => item.id === id);
      if (index !== -1) {
        let newNotes: Note[] = [...state.notes];
        newNotes[index].updated_at = new Date().getTime();

        if (type === 'ARCHIVE_NOTE') {
          newNotes[index].is_archived = true;
        } else if (type === 'FAVORITE_NOTE') {
          newNotes[index].is_favorite = true;
        } else if (type === 'UNARCHIVE_NOTE') {
          newNotes[index].is_archived = false;
        } else {
          newNotes[index].is_favorite = false;
        }

        return {
          ...state,
          notes: newNotes,
        };
      }
      return state;
    default:
      return state;
  }
};

export const settingsReducer = (state = settingsInitialState, action: any) => {
  switch (action.type) {
    case TOGGLE_THEME:
      if (state.theme === 'light') {
        return {
          ...state,
          theme: 'dark',
        };
      } else {
        return {
          ...state,
          theme: 'light',
        };
      }
    default:
      return state;
  }
};
