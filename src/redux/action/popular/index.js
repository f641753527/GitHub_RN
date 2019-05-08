import * as Types from '../types';
import FetchData from '../../../utils/FetchData';

export function LOAD_POPULAR_REFRESH(label, url) {
  return (dispatch) => {
    dispatch({ type: Types.LOAD_POPULAR_REFRESH, label });

    const fetch = new FetchData();

    fetch.fetchData(url).then((data) => {
      dispatch({ type: Types.LOAD_POPULAR_SUCCESS, label, data: data.items });
    }).catch((e) => {
      dispatch({ type: Types.LOAD_POPULAR_ERROR, label });
    });
  }
}
