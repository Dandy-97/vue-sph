import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken } from "@/utils/token"
// 登录注册模块
const state = {
    code: '',
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
};
const mutations = {
    GETCODE(state, str) {
        state.code = str;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        // 本地存储数据清空
        localStorage.removeItem('TOKEN');
    }
};
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        // 获取验证码的这个接口：把验证码返回,但是正常情况,后台把验证码发到用户手机上【省钱】
        let res = await reqGetCode(phone);
        if (res.code === 200) {
            commit('GETCODE', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 用户注册
    async userRegister({ commit }, value) {
        let res = await reqUserRegister(value);
        if (res.code === 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户登录
    async userLogin({ commit }, value) {
        let res = await reqUserLogin(value);
        // 服务器下发token,用户唯一标识符(token,uuid)
        // 将来经常通过带token找服务器要用户信息进行展示
        if (res.code === 200) {
            commit('USERLOGIN', res.data.token);
            // 持久化存储token
            setToken(res.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await reqUserInfo()
        if (res.code === 200) {
            commit('GETUSERINFO', res.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let res = await reqLogout();
        if (res.code === 200) {
            commit('CLEAR');
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}