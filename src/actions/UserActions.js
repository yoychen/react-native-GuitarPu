export const SET_USER_INFO = 'SET_USER_INFO';

export async function setUserInfo({ uid, name }) {
  return (dispatch) => {
    dispatch({
      type: SET_USER_INFO,
      uid,
      name,
    });
  };
}
