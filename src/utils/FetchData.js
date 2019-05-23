import GitHubTrending from 'GitHubTrending';
import AsyncStore from './AsyncStore';
import { MODULE } from '../redux/action/CONST';

export default class FetchData {


  fetchData(url, module_name) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((res) => {
        if (res && res.length && this.checkoutTimestamp(res.timestamp)) {
          resolve(res.data);
          return;
        }
        throw new Error('本地数据拉取失败!');
      }).catch(() => {
        this.fetchServiceData(url, module_name).then((res) => {
          resolve(res);
        }).catch((e) => {
          reject(e);
        });
      });
    });
  }

  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStore.get(url).then((localData) => {
        resolve(localData);
      }).catch((e) => {
        reject(e);
      })
    });
  }

  fetchServiceData(url, module_name) {
    return new Promise((resolve, reject) => {
      if (module_name === MODULE.POPULAR) {
        fetch(url).then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('请求数据失败');
        }).then((res) => {
          this.savaLocalData(url, res);
          resolve(res);
        }).catch((e) => {
          reject(e);
        });
      } else {
        new GitHubTrending().fetchTrending(url).then((data)=> {
          this.savaLocalData(url, data);
          resolve(data);
        }).catch((error)=> {
          reject(error);
        });
      }
    });
  }

  savaLocalData(url, data) {
    AsyncStore.set(url, this.timestampWrapData(data));
  }

  timestampWrapData(data) {
    return {
      data,
      timestamp: new Date().getTime(),
    };
  }

  checkoutTimestamp(timastamp) {
    return (new Date().getTime() - timastamp) < 1000 * 60 * 60 * 6; // 6小时有效期
  }
}