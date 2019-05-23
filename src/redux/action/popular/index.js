import * as Types from '../types';
import FetchData from '../../../utils/FetchData';
import {handleData} from '../handleData';
import { MODULE } from '../CONST';

export function POPULAR_REFRESH(label, url, pageSize) {
  return (dispatch) => {
    dispatch({ type: Types.POPULAR_REFRESH, label });

    const fetch = new FetchData();

    fetch.fetchData(url, MODULE.POPULAR).then((res) => {
      let data = res.items || [];
      handleData(MODULE.POPULAR, dispatch, Types.POPULAR_REFRESH_SUCCESS, label, data, pageSize);
    }).catch((e) => {
      dispatch({ type: Types.POPULAR_REFRESH_ERROR, label });
    });
  }
}

export function POPULAR_LOAD_MORE(label, data = [], pageSize, pageIndex, cb) {
  return (dispatch) => {
    dispatch({ type: Types.POPULAR_LOAD_MORE, label, pageIndex });
    handleData(MODULE.POPULAR, dispatch, Types.POPULAR_LOAD_MORE_SUCCESS, label, data, pageSize, pageIndex, cb);
  }
}

