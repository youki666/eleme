<template>
  <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
      	<ul>
      		<li v-for='(item, index) in goods' class="menu-list"
      		:class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
      			<span class="text border-1px">
      			    <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
      			    {{item.name}}
      			</span>
      		</li>
      	</ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
      	<ul>
      		<li class="food-list food-hook"  v-for="(item,index) in goods" >
      			<h1 class="title">{{item.name}}</h1>
      			<ul>
      				<li v-for="food in item.foods" class="food-item border-1px" >
      					<div class="icon" @click="selectFoods(food,$event)">
      						<img :src="food.icon" width="57" height="57">
      					</div>
      					<div class="content">
      						<h2 class="name">{{food.name}}</h2>
      						<p class="desc">{{food.description}}</p>
      						<div class="extra">
      						  <span class="count">月售{{food.sellCount}}份</span>
      						  <span>好评率{{food.rating}}%</span>
      					    </div>
          					<div class="price">
      						  <span class="now">￥{{food.price}}</span>
      						  <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
      					    </div>
      					    <div class="cartcontrol-wrapper">
      					    	<cartcontrol :food="food"></cartcontrol>
      					    </div>
      					</div>
      				</li>
      			</ul>
      		</li>
      	</ul>
      </div>
      <shopcart :selectFood="selectFood":deliveryPrice="seller.deliveryPrice" 
      :minPrice="seller.minPrice"></shopcart>
      <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BS from "better-scroll";
import shopcart from "@/components/shopcart/shopcart";
import cartcontrol from "@/components/cartcontrol/cartcontrol";
import food from '@/components/food/food';
const ERR_OK = 0;
export default {
   props: {
   	seller: {
   		type: Object
   	}
   },
   components:{
   	shopcart,
   	cartcontrol,
   	food
   },
   data(){
      return {
      	goods:[],
      	listHeight:[],
      	scrollY: 0,
        selectedFood:{}
      }
   },
   computed: {
     currentIndex(){
     	for(let i=0;i<this.listHeight.length;i++){
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          console.log('y:' + this.scrollY);
          console.log(height1 + '....' + height2);
          if(!height2 ||(this.scrollY >= height1 && this.scrollY < height2)){
          	return i;
          }
     	}
     	return 0;
     },
     selectFood(){
     	let foods=[];
     	this.goods.forEach((good)=>{
         good.foods.forEach((food)=>{
           if(food.count){
           	foods.push(food);
           }
         });
     	});
     	return foods;
     }
   },
   created() {
     this.$http.get('/api/goods').then((response)=>{
    	response = response.body;
        if(response.errno ===ERR_OK ){
        	this.goods = response.data;
        	//console.log(this.goods);
        	this.$nextTick(()=>{//异步更新数据
        		this._initScroll();//滑动菜单
        		this._calculateHeight();
        	});
        }
     });
     	this.classMap = ['decrease','discount','special','invoice','guarantee'];
   },
methods: {
      // 初始化滚动事件
      _initScroll() {
        // 第一个参数是dom对象，第二个参数是options(json格式)
        // vue 中获取指定对象的方式
        // 获取左侧菜单区域
       // BScroll计算dom高度，如果获取不到高度会没有效果，所以上面要调用ick
        this.menuScroll = new BS(this.$refs.menuWrapper, {
          click: true // 一开始的点击事件被bscroll阻止了，设置这个才能点击
        });
        // 获取右侧商品区域
        this.foodsScroll = new BS(this.$refs.foodsWrapper, {
          click: true, // 这里也要设置为true增加减少按钮才能点击
          probeType: 3 // 获取实时滚动的位置，详见bscroll API
        });
        // 监听右侧食品区域滚动的事件
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)); // 四舍五入得到的y值
           console.log('当前滚动的Y值：' + this.scrollY);
        });
      },
      _calculateHeight: function () {
        // 获取右侧一个商品的整个li，一个li里面包含了该分类下的所有商品
         let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-hook');
         let height = 0;
         this.listHeight.push(height);
         for (let i = 0; i < foodList.length; i++) {
           let item = foodList[i];
           height += item.clientHeight; // 获取每一个li的可视区域的高度
           this.listHeight.push(height); // 这样就得到了每一个商品分类下的所有商品对应的高度
         }
      },
        selectMenu(index, event) { // 这里多传递一个事件 ,event 就是click传递的event，当设置 click为 true时，默认就派发了一个点击事件，而pc端本身也有click事件
        if (!event._constructed) {
          return; // 原生的浏览器的event没有 vue的这个 _constructed 属性，所以当没有这个时，直接return。避免在pc端点击时事件执行（触发）2次的效果
        }
        //console.log(index);
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-hook');
        let el = foodList[index]; // 滚动到响应的元素
        console.log(el);
        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFoods(food,event){
         if (!event._constructed) {
             return;
         }
          this.selectedFood = food;
          //console.log(this.selectedFood.image);
          this.$refs.food.show();
      }

 }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
  .goods
    position: absolute
    display: flex
    overflow: hidden
    top: 174px
    bottom: 46px
    width: 100%
   .menu-wrapper
    flex: 0 0 80px
    background: #f3f5f7
   .menu-list
      display: table //垂直居中
      width: 56px
      height: 54px
      padding: 0 12px
      line-height: 14px
     &.current
       position: relative
       z-index: 10
       font-weight: 700
       margin-top: -1px
       background: #fff
      .text
        border-none()
      .icon
        display:inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
         bg-image('decrease_3')
        &.discount
         bg-image('discount_3')
        &.guarantee
         bg-image('guarantee_3')
        &.invoice
         bg-image('invoice_3')
        &.special
         bg-image('special_3')
      .text
       font-size: 12px
       display: table-cell
       width: 56px
       vertical-align: middle
       border-1px(rgba(7,17,27,.1))
   .foods-wrapper
           flex: 1
     .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147,153,159)
      background: #f3f5f7
     .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border-1px(rgba(7,17,27,.1))
      &.last-child
       margin-bottom:0
     .icon
      flex: 0 0 57px
      margin-right: 4px
     .content
      flex:1
      .name
       margin: 2px 0 8px 0
       font-size: 14px
       line-height: 14px
       height: 14px
       color: rgb(7,17,27)
      .desc,.extra
       font-size: 10px
       line-height: 10px
       color: rgb(147,153,159)
      .desc
       margin-bottom: 8px
       line-height: 12px
      .extra
       line-height: 10px
      .count
         margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
      .now
        color: rgb(240,20,20)
        font-size: 14px
        margin-right: 8px
      .old
        text-decoration: line-through
        font-size: 10px
        color: rgb(147,153,159)
       .cartcontrol-wrapper
        position: absolute
        right: 0
        bottom: 12px
</style>
