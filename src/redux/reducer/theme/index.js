import * as Types from '../../action/theme/types';

const initState = {
  theme: 'yellow',
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
