import * as Types from '../../action/types';

const initState = {
  theme: 'red',
};

export default function themeReducer(state = initState, action) {
  switch(action.type) {
    case Types.UPDATE_THEME:
      return {
        ...state,
        theme: action.theme
      } 
    default: 
    return state;
  }
}
