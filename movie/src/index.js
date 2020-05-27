import App from "./app.js"
import router from "./router.js"
import store from "./store/index.js"
store.dispatch("loginUser/syncLocal"); //同步本地存储
window.store = store;

const vm = new Vue({
    template: `<App />`,
    components: {
        App
    },
    el: "#app",
    router,
    store
})
