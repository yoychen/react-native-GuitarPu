import {
  SET_LYRICS,
  SET_SINGER,
  SET_NAME,
  SET_KEY,
  ADD_TONE,
  REMOVE_TONE,
  RESET_SONG,
} from '../actions/SongActions';

export function song(state = {
  name: '',
  singer: '',
  key: 'C',
  lyrics: '',
  tone: [],
}, action) {
  switch (action.type) {
    case SET_LYRICS:
      return Object.assign({}, state, {
        lyrics: action.lyrics,
      });
    case SET_NAME:
      return Object.assign({}, state, {
        name: action.name,
      });
    case SET_KEY:
      return Object.assign({}, state, {
        key: action.key,
      });
    case SET_SINGER:
      return Object.assign({}, state, {
        singer: action.singer,
      });
    case ADD_TONE:
      let res = Object.assign({}, state);
      res.tone[action.index] = action.tone;
      return res;
    case REMOVE_TONE:
      let res2 = Object.assign({}, state);
      res2.tone[action.index] = undefined;
      return res2;
    case RESET_SONG:
      return {
        name: '',
        singer: '',
        key: 'C',
        lyrics: '',
        tone: [],
      };
    default:
      return state;
  }
}
