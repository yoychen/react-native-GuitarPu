export const SET_LYRICS = 'SET_LYRICS';
export const ADD_TONE = 'ADD_TONE';
export const REMOVE_TONE = 'REMOVE_TONE';

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
