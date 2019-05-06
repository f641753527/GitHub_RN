import AsyncStore from './AsyncStore';

export default class FetchData {


  fetchData(url) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url).then((res) => {
        if (res && this.checkoutTimestamp(res.timestamp)) {
          resolve(res);
          return;
        }
        throw new Error('本地数据拉取失败!');
      }).catch(() => {
        this.fetchServiceData(url).then((res) => {
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

  fetchServiceData(url) {
    return new Promise((resolve, reject) => {
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