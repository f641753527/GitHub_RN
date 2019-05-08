import * as Types from '../../action/types';

const initState = {
  
};

/**
 * @param: initState: 
 * popular: {
 *    java: {
 *      is_loading: false,
 *      items: [],
 *    },
 *    php: {
 *      is_loading: false,
 *      items: [],
 *    },
 * }
 * @name: 
 * @description: 
 * @param {type} 
 * @return: 
 */

export default function popularReducer(state = initState, action) {
  switch(action.type) {
    case Types.LOAD_POPULAR_REFRESH:
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          is_loading: true,
        },
      };
    case Types.LOAD_POPULAR_ERROR:
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          is_loading: false,
        },
      };
    case Types.LOAD_POPULAR_SUCCESS:
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          items: action.data,
          is_loading: false,
        },
      };
    default: 
    return state;
  }
}
