<template>
  <div>
       <div class="shopcart">
     <div class="content" >
      <div class="content-left" @click="toggleList">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalPrice > 0}">
              <span class="icon-shopping_cart" :class="{'highlight':totalPrice > 0}"></span>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
     </div>
       <transition name="fold">
          <div class="shopcart-list" v-show="listShow">
              <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
              </div>
             <div class="list-content" ref="listContent">
                <ul>
                  <li v-for="food in selectFood" class="food">
                    <span class="name">{{food.name}}</span>
                    <div class="price">
                      <span>￥{{food.count* food.price}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                      <cartcontrol :food="food"></cartcontrol>
                    </div>
                  </li>
                </ul>
              </div>
          </div>
       </transition>
   </div>
       <!-- 购物车弹出的黑色遮罩层 -->
    <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import BS from "better-scroll";
import cartcontrol from "@/components/cartcontrol/cartcontrol";
export default {
   props:{
   	 selectFood:{
   	 	type: Array,
   	 	default(){
   	 		return [];
   	 	}
   	 },
     deliveryPrice:{
     	type: Number,
     	default: 0
     },
     minPrice:{
     	type: Number,
     	default: 0
     }
   },
   data(){
    return {
      fold: true
    }
   },
   components:{
     cartcontrol
   },
   methods:{
    toggleList(){
      if(!this.totalCount){
        return;
      }
      this.fold = !this.fold;
    },
    empty(){
      this.selectFood.forEach((food)=>{
        food.count=0;
      })
    },
    pay(){
      if(this.totalPrice < this.minPrice){
        return;
      }
      alert(`您需要支付${this.totalPrice+this.deliveryPrice}元`);
    },
    hideList() {
        this.fold = true;
      }
   },
   computed:{
   	totalPrice(){
       let total = 0;
       this.selectFood.forEach((food)=>{
        total += food.price * food.count;
       });
       return total;
   	},
    listShow(){
      if(!this.totalCount){
        this.fold = true;
        return false;
      }
      let show = !this.fold;
        if (show) {
          this.$nextTick(() => { // 调用 BSCroll插件
            if (!this.scroll) {
              this.scroll = new BS(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh(); // 因为listShow 是不断变化的，这里调用Bscroll的刷新接口
            }
          });
        }
      return show;
    },
   	totalCount(){
       let count = 0;
       this.selectFood.forEach((food)=>{
        count += food.count;
       });
       return count;
   	},
   	payDesc(){
   	 if(this.totalPrice === 0){
        return `￥${this.minPrice}元起送`;
   	  }else if(this.totalPrice < this.minPrice){
   	  	let diff = this.minPrice - this.totalPrice;
   	  	return `还差￥${diff}元起送`;
   	  }else{
   	  	return `去结算`;
   	  }
   	},
   	payClass(){
   		if(this.totalPrice < this.minPrice){
   			return 'not-enough';
   		}else{
   			return 'enough';
   		}
   	}
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
 .shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 66
  height:48px
  width: 100%
  background:#141d27
 .content
   display:flex
   .content-left
     flex: 1
    .logo-wrapper
      display: inline-block
      position: relative
      top: -10px
      margin: 0 3px
      padding: 6px
      width: 56px
      height: 56px
      box-sizing: border-box
      vertical-align: top
      border-radius: 50%
      background:#141d27
    .num
     position:absolute
     top: 0
     right: 0
     width: 24px
     height: 16px
     text-align: center
     color: #fff
     font-size: 9px
     border-radius: 16px
     background: rgb(240,20,20)
     box-shadow: 0 4px 8px rgba(0,0,0,.4)
    .logo
       width: 100%
       height: 100%
       border-radius: 50%
       text-align: center
       background:#2b343c
       &.highlight
        background: rgb(0,160,220)
     .icon-shopping_cart
      font-size:24px
      line-height: 44px
      color: #80858a
      &.highlight
       color:#fff
     .price
       display: inline-block
       vertical-align: top
       line-height: 24px
       margin-top: 12px
       padding-right: 4px;
       box-sizing: border-box
       border-right: 1px solid rgba(255,255,255,.1)
       font-size: 16px
       font-weight: 700
       color:rgba(255,255,255,.4)
       &.highlight
        color:#fff
     .desc
       display: inline-block
       vertical-align: top
       line-height: 24px
       margin: 12px 0 0 6px
       color:rgba(255,255,255,.4)
       font-size: 10px
   .content-right
     flex:0 0 105px
     width: 105px
     font-weight: 700
     .pay
       font-size: 12px
       line-height: 48px
       height: 48px
       text-align: center
       color:rgba(255,255,255,.4)
       background: #2b333b
       &.not-enough
        background: #2b333b
       &.enough
        background: #00b43c
        color: #fff
    .shopcart-list // 购物车列表样式
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 21, .1)
      .title
        float: left
        font-size: 14px
        color:rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      .food
       position: relative
       padding: 12px 0
       box-sizing: border-box
       border-1px(rgba(7, 17, 27, .1))
      .name
        line-height: 24px
        font-size: 14px
        color: rgb(7, 17, 27)
      .price
        position: absolute
        right: 90px
        bottom: 12px
        line-height: 24px
        font-size: 14px
        font-weight: 700
        color: rgb(240, 20, 20)
      .cartcontrol-wrapper
        position: absolute
        right: 0
        bottom: 6px
  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
<!--    -->