export function createNote(note) {
  return {type: types.CREATE_NOTE, note};
}
import * as types from './actionTypes';
