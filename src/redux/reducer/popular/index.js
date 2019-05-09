import * as Types from '../../action/types';

const initState = {
  
};

/**
 * @param: initState: 
 * popular: {
 *    java: {
 *      is_loading: false,
 *      items: [],  // 原始数据
 *      projectModal: [], 分页数据
 *      pageIndex: 1, // 页码 1开始
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
    case Types.POPULAR_REFRESH:
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          is_loading: true,
          pageIndex: 1,
        },
      };
    case Types.POPULAR_REFRESH_ERROR:
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          is_loading: false,
        },
      };
    case Types.POPULAR_REFRESH_SUCCESS:
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          items: action.data,
          projectModel: action.projectModel,
          is_loading: false,
        },
      };
      case Types.POPULAR_LOAD_MORE:
        return {
          ...state,
          [action.label]: {
            ...state[action.label],
            load_more: true,
            pageIndex: action.pageIndex,
          },
        };
      case Types.POPULAR_LOAD_MORE_SUCCESS:
        return {
          ...state,
          [action.label]: {
            ...state[action.label],
            projectModel: action.projectModel,
            load_more: false,
          },
        };
    default: 
    return state;
  }
}
