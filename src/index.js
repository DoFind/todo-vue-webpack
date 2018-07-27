import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'


// 创建一个也是唯一的一个顶级元素
const root = document.createElement('div');
document.body.appendChild(root);

new Vue ({
  render: (h) => h(App)
}).$mount(root)