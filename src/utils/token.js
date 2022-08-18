// 对外暴漏一个函数
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token);
}