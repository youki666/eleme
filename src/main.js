// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';//前后端数据交互
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import  './common/stylus/index.styl'
Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueResource);
/* eslint-disable no-new */
const routes = [{
	path:"/",
	redirect:"/goods"
},{
	path:"/goods",
	name: 'goods',
	component: goods
},{
	path:"/ratings",
	name: 'ratings',
	component: ratings
},{
	path:"/seller",
	name: 'seller',
	component: seller
}];
const router = new VueRouter({
	routes,
	mode:'history',
	linkActiveClass: 'active',
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
