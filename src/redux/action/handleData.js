import * as Types from './types';
import { MODULE } from './CONST';

export function handleData(moduleName, dispatch, actionType, label, data, pageSize, pageIndex, cb) {
  switch(moduleName) {
    case MODULE.POPULAR: 
      if (actionType === Types.POPULAR_REFRESH_SUCCESS) {
        let projectModel = pageSize >= data.length ? data : data.slice(0, pageSize);
        dispatch({ type: actionType, label, data, projectModel });
      } else {
        // 分页
        if (pageIndex > Math.ceil(data.length / pageSize)) {
          setTimeout(()=>{
            dispatch({ type: actionType, label, projectModel: data });
            cb && cb();
          }, 100);
          return;
        }
        setTimeout(() => {
          let projectModel = pageIndex * pageSize >= data.length ? data : data.slice(0, pageIndex * pageSize);
          dispatch({ type: actionType, label, projectModel });
        }, 100);
      }
      
    break;

    case MODULE.TRENDING: 
      if (actionType === Types.TRENDING_REFRESH_SUCCESS) {
        let projectModel = pageSize >= data.length ? data : data.slice(0, pageSize);
        dispatch({ type: actionType, label, data, projectModel });
      } else {
        // 分页
        if (pageIndex > Math.ceil(data.length / pageSize)) {
          setTimeout(()=>{
            dispatch({ type: actionType, label, projectModel: data });
            cb && cb();
          }, 100);
          return;
        }
        setTimeout(() => {
          let projectModel = pageIndex * pageSize >= data.length ? data : data.slice(0, pageIndex * pageSize);
          dispatch({ type: actionType, label, projectModel });
        }, 100);
      }
    break;
  }
}
