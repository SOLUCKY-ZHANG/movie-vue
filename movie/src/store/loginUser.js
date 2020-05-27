import loginService from "../services/loginService.js"

export default {
    namespaced: true, 
    state: {
        data: null, //当前登录的用户为空
        isLoading: false //当前正在登录
    },
    mutations: { 
        setIsLoading(state, payload) { //用于改变是否正在登录的状态
            state.isLoading = payload;
        },
        setUser(state, userObj) {//用于改变登录的用户
            state.data = userObj;
        }
    },
    actions: { 
        async login(context, payload) {  //需要传入账号和密码
            context.commit("setIsLoading", true);
            const resp = await loginService.login(payload.loginId, payload.loginPwd)
            if (resp) {
                //登录成功
                context.commit("setUser", resp);
                localStorage.setItem("loginUser", JSON.stringify(resp));
                return true;
            }
            context.commit("setIsLoading", false);
            return false;
        },
        loginOut(context) {
            //退出登录
            context.commit("setUser", null);
            localStorage.removeItem("loginUser");
        },
        syncLocal(context) {
            //初始化时，同步本地存储
            const local = localStorage.getItem("loginUser");
            if (local) {
                //已经登录
                const user = JSON.parse(local); //拿出本地存储中的用户对象
                context.commit("setUser", user); //同步到状态
            }
        }
    }
}
