const userInitialState = {
  uid: '',
  name: '',
  profile_url: '',
  gender: 'female',
  weight_kg: 50,
  height_cm: 160,
  age: 30,
};

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

