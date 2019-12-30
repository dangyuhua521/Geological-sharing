import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token30'
const UserInfoKey = 'UserInfo30'
// const TokenKey = 'Admin-Tokennet30'
// const UserInfoKey = 'UserInfonet30'
export function getToken() {
    return Cookies.get(TokenKey)
}


export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getUserInfo() {
    return localStorage.getItem("UserInfo")
    // return Cookies.get('UserInfo')
}
export function setUserInfo(data) {
  return localStorage.setItem('UserInfo', JSON.stringify(data))
}

export function removeUserInfo() {
   return localStorage.removeItem('UserInfo')
}