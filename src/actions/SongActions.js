export const SET_LYRICS = 'SET_LYRICS';
export const SET_KEY = 'SET_KEY';
export const SET_SINGER = 'SET_SINGER';
export const SET_NAME = 'SET_NAME';
export const ADD_TONE = 'ADD_TONE';
export const REMOVE_TONE = 'REMOVE_TONE';
export const RESET_SONG = 'RESET_SONG';

// function receivedLyrics(lyrics) {
//   return {
//     type: SET_LYRICS,
//     lyrics,
//   };
// }

export async function setLyrics(lyrics) {
  return (dispatch) => {
    dispatch({
      type: SET_LYRICS,
      lyrics,
    });
  };
}

export async function setName(name) {
  return (dispatch) => {
    dispatch({
      type: SET_NAME,
      name,
    });
  };
}

export async function setSinger(singer) {
  return (dispatch) => {
    dispatch({
      type: SET_SINGER,
      singer,
    });
  };
}

export async function setKey(key) {
  return (dispatch) => {
    dispatch({
      type: SET_KEY,
      key,
    });
  };
}

export async function addTone(tone, index) {
  return (dispatch) => {
    dispatch({
      type: ADD_TONE,
      tone,
      index,
    });
  };
}

export async function removeTone(index) {
  return (dispatch) => {
    dispatch({
      type: ADD_TONE,
      index,
    });
  };
}

export async function resetSong() {
  return (dispatch) => {
    dispatch({
      type: RESET_SONG,
    });
  };
}
