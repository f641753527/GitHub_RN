import * as Types from '../types';
import FetchData from '../../../utils/FetchData';

export function POPULAR_REFRESH(label, url, pageIndex, pageSize) {
  return (dispatch) => {
    dispatch({ type: Types.POPULAR_REFRESH, label });

    const fetch = new FetchData();

    fetch.fetchData(url).then((res) => {
      let data = res.items || [];
      let projectModel = pageIndex * pageSize >= data.length ? data : data.slice(0, pageIndex * pageSize);
      dispatch({ type: Types.POPULAR_REFRESH_SUCCESS, label, data, projectModel });
    }).catch((e) => {
      dispatch({ type: Types.POPULAR_REFRESH_ERROR, label });
    });
  }
}

export function POPULAR_LOAD_MORE(label, data = [], pageIndex, pageSize, cb) {
  return (dispatch) => {
    dispatch({ type: Types.POPULAR_LOAD_MORE, label, pageIndex });
    if (pageIndex > Math.ceil(data.length / pageSize)) {
      // 加载完毕
      cb && cb();
      setTimeout(() => {
        dispatch({ type: Types.POPULAR_LOAD_MORE_SUCCESS, label, projectModel: data });
      }, 500);
      return;
    }
    setTimeout(() => {
      let projectModel = pageIndex * pageSize >= data.length ? data : data.slice(0, pageIndex * pageSize);
      dispatch({ type: Types.POPULAR_LOAD_MORE_SUCCESS, label, projectModel });
    }, 1000);
  }
}
