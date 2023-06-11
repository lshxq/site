import Cookies from 'js-cookie'
import axiosInst from 'axios';
axiosInst.defaults.baseURL='/site-api';

let currentUser = null
const setCurrentUser = (cu, token) => {
  currentUser = cu
  Cookies.set("jwt-token", token, {expires: 1})
}
const axios = (params) => {
  return new Promise((res, rej) => {
    axiosInst(params).then(res).catch(ex => {
      const {
        mock
      } = params
      if (mock) {
        const buildResponse = data => {
          return { // 模拟axios返回的数据结构
            data
          }
        }
        
        let mockData = null
        if( typeof mock === 'function') {
          mockData=buildResponse(mock(params))
        } else {
          mockData = buildResponse(mock)
        }
        console.log('调用接口失败，采用mock数据', mockData)
        res(mockData)
      } else {
        rej(ex)
      }
    })
  })
}
export default {
  getCurrentUserAsync() {
    const prom = axios({
      url: '/user/token/parse',
    })
    return new Promise((res, rej) => {
      prom.then(resp => {
        const user = resp.data
        currentUser = user
        res(user)
      }).catch(ex => {
        rej(ex)
      })
    })
  },
  getCurrentUser() {
    return currentUser
  },
  setCurrentUser,
  axios,
  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  },
  getFileExtention(filename) { // 获得文件扩展名
    if (filename) {
      const start = filename.lastIndexOf('.')
      if(start > 0) {
        return filename.substring(start, filename.length)
      }
    }
    return ''
  },
  ua() {
    const ua = navigator.userAgent,
          isWindowsPhone = /(?:Windows Phone)/.test(ua),
          isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone, 
          isAndroid = /(?:Android)/.test(ua), 
          isFireFox = /(?:Firefox)/.test(ua), 
          isChrome = /(?:Chrome|CriOS)/.test(ua),
          isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
          isPhone = /(?:iPhone)/.test(ua) && !isTablet,
          isPc = !isPhone && !isAndroid && !isSymbian;
    return {
          isTablet,
          isPhone,
          isAndroid,
          isPc,
          isChrome
    };
  }
}