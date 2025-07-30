import { createApp } from 'vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from "./App.vue";
import router from './router'
import md5 from 'js-md5';
import "./style/com.css";
import "./style/media.css";

const pinia = createPinia();
const app = createApp(App);
// 将md5方法挂载到全局
app.config.globalProperties.$md5 = md5

pinia.use(piniaPluginPersistedstate) 

app.use(pinia);
app.use(router);
app.mount("#app");

