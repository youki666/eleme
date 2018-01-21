<template>
   <transition name="move">
	    <div class="food" v-show="showFlag" ref="food">
   	       <div class="food-content">
   	       	   <div class="img-header">
   	       	   	<img :src="food.image" alt="">
   	       	   	<div class="back" @click="hide">
   	       	         <span class="icon-arrow_lift"></span>
   	            </div>
   	       	   </div>
   	       	   <div class="contents">
   	       	   	  <h1 class="food-title">{{food.name}}</h1>
                   <div class="food-detail">
                   	   <span class="sell-count">月售{{food.sellCount}}</span>
                       <span class="rating">好评率{{food.rating}}%</span>
                   </div>
                   <div class="food-price"> <!--价格-->
                       <span class="now">￥{{food.price}}</span>
                       <span class="old"  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
       	       	   <div class="cartcontrol-wrapper">
   	       	   	      <cartcontrol :food="food"></cartcontrol>
   	       	      </div>
   	       	     <transition name="fade">
   	       	     	 <div @click.stop.prevent="add" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
   	       	     </transition>
   	       	   </div>
                           <!-- 上下边框组件 -->
               <split v-show="food.info"></split>
                 <!-- 商品介绍 -->
               <div class="info" v-show="food.info">
                   <h1 class="title">商品信息</h1>
                   <p class="text">{{food.info}}</p>
               </div>
               <split></split>
               <div class="rating">
               	 <h1 class="title">商品评价</h1>
               	 <ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc"
               	 :ratings="food.ratings"@select="selectRating" @toggle="toggleContent"></ratingselect>
               	 <div class="rating-wrapper">
               	 	<ul v-show="food.ratings &&food.ratings.length">
               	 		<li v-show="needShow(rating.rateType, rating.text)" v-for="(rating, index) in food.ratings" class="rating-item border-1px">
               	 			<div class="user">
               	 				 <span class="name">{{rating.username}}</span>
                                 <img :src="rating.avatar" alt="user" width="12" height="12" class="avatar">
               	 			</div>
               	 			<div class="time">{{rating.rateTime | formatDate}}</div>
               	 			<p class="text">
               	 				<span :class="{'icon-thumb_up':rating.rateType === 0, 'icon-thumb_down': rating.rateType===1}"></span>
                                <span>{{rating.text}}</span>
               	 			</p>
               	 		</li>
               	 	</ul>
               	 <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
               	 </div>
               </div>
   	        </div>
        </div>
   </transition>
</template>

<script>
import Vue from 'vue';
import BS from 'better-scroll';
import cartcontrol from '@/components/cartcontrol/cartcontrol';
import split from '@/components/split/split';
import ratingselect from '@/components/ratingselect/ratingselect';
import { formatDate } from '@/common/js/date';
const ALL = 2; // 所有评价
  export default {
  	props:{
  	 food:{
  	 	type: Object
  	 }
  	},
  	components:{
      cartcontrol,
      split,
      ratingselect
  	},
    data() { // data 用来观测数据变化
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    filters: {
      formatDate(time) { // 将评价的时间戳转换成 年月日，时分
        let date = new Date(time); // 先把时间戳转换成date格式
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods:{
     show(){
       this.showFlag = true;
       this.selectType = ALL;
       this.onlyContent = false;
       this.$nextTick(()=>{
       	if(!this.scroll){
       	 this.scroll = new BS(this.$refs.food, {click:true});
       	}else{
       		this.scroll.refresh();
       	}
       })
    	},
     hide(){
     	this.showFlag = false;
     },
    needShow(type, text) { // 需要显示的评价类型
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType == ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      },
     add(){
     	if (!event._constructed) {
          return;
        }
        this.$emit('add', event.target);
        Vue.set(this.food, 'count', 1);
     },
     selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    }
  };
</script>

<style  lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl';
  .food
   position: fixed
   left: 0
   top: 0
   bottom: 48px
   z-index: 9
   width: 100%
   background: #fff
   transform: translate3d(0 ,0 ,0)
   &.move-enter-active,&.move-leave-active
    transition: all 0.5s linear
   &.move-enter,&.move-leave-active
    transform: translate3d(100%, 0, 0)
  .img-header
    position: relative
    top: 0
    left: 0
    width: 100%
    height: 0
    padding-top: 100%
    img
     position: absolute
     left: 0
     top: 0
     width: 100%
     height: 100% /* 图片布局 end*/
    .back
     position: absolute
     top: 0
     left: 10px
     .icon-arrow_lift
      display: block
      padding: 10px
      font-size: 20px
      color: #fff
   .contents // 商品层
      position: relative
      padding: 18px
      .food-title // 商品名
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .food-detail // 商品详细
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating // 月销量和好评率
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .food-price // 价格
        font-weight: 700
        line-height: 24px
        .now // 现价
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old // 原价
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
    .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      line-height: 24px
      padding: 0 12px
      box-sizing: border-box
      border-radius: 12px
      font-size: 10px
      color: #fff;
      background: rgb(0, 160, 220)
      opacity: 1
      &.fade-enter-active, &.fade-leave-active
       transition: all 0.2s
      &.fade-enter, &.fade-leave-active
       opacity: 0
       z-index: -1
   .info // 商品详情
      padding: 18px
     .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
     .text // 商品介绍
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating // 商品评价
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper // 评价区域
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, .1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>