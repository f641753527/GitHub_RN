import * as Types from '../types';
import FetchData from '../../../utils/FetchData';
import { handleData } from '../handleData';
import { MODULE } from '../CONST';

export function TRENDING_REFRESH(label, url, pageSize) {
  return (dispatch) => {
    dispatch({ type: Types.TRENDING_REFRESH, label });

    const fetch = new FetchData();

    fetch.fetchData(url).then((res) => {
      let data = res || [];
      handleData(MODULE.TRENDING, dispatch, Types.TRENDING_REFRESH_SUCCESS, label, data, pageSize);
    }).catch((e) => {
      dispatch({ type: Types.TRENDING_REFRESH_ERROR, label });
    });
  }
}

export function TRENDING_LOAD_MORE(label, data = [], pageSize, pageIndex, cb) {
  return (dispatch) => {
    dispatch({ type: Types.TRENDING_LOAD_MORE, label, pageIndex });
    handleData(MODULE.TRENDING, dispatch, Types.TRENDING_LOAD_MORE_SUCCESS, label, data, pageSize, pageIndex, cb);
  }
}

