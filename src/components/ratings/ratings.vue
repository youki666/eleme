<template>
  <div class="ratings" ref="ratings">
     <div class="ratings-content">
     	<div class="overview">
     		<div class="overview-left">
     			<h1 class="score">{{seller.score}}</h1>
     			<div class="title">综合评分</div>
     			<div class="rank">高于周围商家{{seller.rankRate}}%</div>
     		</div>
     		<div class="overview-right">
     			<div class="score-wrapper">
     				<span class="title">服务态度</span>
     				<star class='star' :size="36" :score="seller.serviceScore"></star>
     				<span class="score">{{seller.serviceScore}}</span>
     			</div>
     			<div class="score-wrapper">
     				<span class="title">服务态度</span>
     				<star class='star' :size="36" :score="seller.foodScore"></star>
     				<span class="score">{{seller.foodScore}}</span>
     			</div>
     			<div class="delivery-wrapper">
     				<span class="title">送达时间</span>
     				<span class="time">{{seller.deliveryTime}}分钟</span>
     			</div>
     		</div>
     	</div>
     	<split></split>
     	 <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType" :onlyContent="onlyContent" 
               	 :ratings="ratings"></ratingselect>
         <div class="rating-wrapper">
         	<ul>
         		<li v-for="rating in ratings" class="rating-item" v-show="needShow(rating.rateType, rating.text)">
         			<div class="avatar">
         				<img :src="rating.avatar" width="28" height="28">
         			</div>
         			<div class="content">
         				<h1 class="name">{{rating.username}}</h1>
         				<div class="star-wrapper">
         					<star :size="24" :score="rating.score" class='star'></star>
         					<span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
         				</div>
         				<p class="text">{{rating.text}}</p>
         				<div class="recommend" v-show="rating.recommend && rating.recommend.length">
     					<span class="icon-thumb_up"></span>
     					<span class="item" v-for="(item, index) in rating.recommend">{{item}}</span>
         				</div>
         				<div class="time">
         					{{rating.rateTime | formatDate}}
         				</div>
         			</div>
         		</li>
         	</ul>
         </div>
     </div>
  </div>
</template>

<script>
import star from "@/components/star/star";
import ratingselect from "@/components/ratingselect/ratingselect";
import split from "@/components/split/split";
import { formatDate } from '@/common/js/date';
import BS from 'better-scroll'; // 导入滚动类库
const ALL = 2; // 所有评价
const ERR_OK = 0;
export default {
    props:{
    	seller:{
    		type: Object
    	}
    },
    data() { // data 用来观测数据变化
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        desc: { // 评价类型的显示的文案，当父子间传递数据进来的时候，这边就会被替换成传递过来的数据
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
      }
    },
    methods: {
      needShow(type, text) { // 需要显示的评价类型
        if (this.onlyContent && !text) { // 如果需要显示有内容，并且内容为空则返回
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
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
    },
    filters: {
      formatDate(time) { // 将评价的时间戳转换成 年月日，时分
        let date = new Date(time); // 先把时间戳转换成date格式
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components:{
    	star,
    	ratingselect,
    	split
    },
    created(){
    	this.$http.get("/api/ratings").then((response)=>{
    		response = response.body;
             console.log(response);
             if(response.errno ===ERR_OK){
             	this.ratings = response.data;
             }
    	});
       this.$nextTick(() => {
        this.scroll = new BS(this.$refs.ratings, {
          click: true
        });
      });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
 .ratings
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview
   display: flex
   padding: 18px 0
   .overview-left
     flex: 0 0 137px
     width: 137px
     padding: 6px 0
     border-right: 1px solid rgba(7,17,27,.1)
     text-align: center
     .score
      line-height: 28px
      font-size: 24px
      color: rgb(255,153,0)
      margin-bottom: 6px
     .title
      margin-bottom: 8px
      line-height: 12px
      font-size: 12px
      color: rgb(7,17,27)
     .rank
      padding-bottom: 6px
      line-height: 10px
      font-size: 10px
      color: rgb(147,153,159)
   .overview-right
      flex: 1
      padding-left: 24px
      .score-wrapper
       line-height: 18px
       font-size: 0
       margin-bottom: 8px
       .title
        font-size: 12px
        line-height: 18px
        color: rgb(7,17,27)
       .star
        display: inline-block
        margin: 0 12px
        vertical-align: top
       .score
        display: inline-block
        line-height: 18px
        font-size: 12px
        vertical-align: top
        color: rgb(255,153,0)
      .delivery-wrapper
       font-size: 0
       .title
        line-height: 18px
        font-size: 12px
        color: rgb(7,17,27)
       .time
        margin-left: 12px
        font-size: 12px
        color: rgb(147,153,159)
  .rating-wrapper
   padding: 0 18px
   .rating-item
    display: flex
    padding: 18px 0
    border-1px: rgba(7,17,27,.1)
   .avatar
    flex: 0 0 28px
    width: 28px
    margin-right: 12px
    img
     border-radius: 50%
   .content
    position: relative
    flex: 1
    .name
     margin-bottom: 4px
     line-height: 12px
     font-size: 10px
     color: rgb(7,17,27)
    .star-wrapper
     margin-bottom: 6px
     .star
      display:inline-block
      margin-right: 6px
      vertical-align: top
     .delivery
      display: inline-block
      vertical-align: top
    .text
     line-height: 18px
     margin-bottom: 8px
     color: rgb(7,17,27)
     font-size: 12px
    .recommend
     line-height: 16px
     font-size: 0
     .icon-thumb_up, .item
      display: inline-block
      font-size: 9px
      margin: 0 8px 4px 0
     .icon-thumb_up
      color: rgb(0, 160, 220)
     .item
      padding: 0 6px
      border: 1px solid rgba(7,17,27,.1)
      border-radius: 1px
      color: rgb(147,153,159)
      background: #fff
    .time
     position: absolute
     top:0
     right: 0
     font-size: 10px
     color: rgb(147,153,159)
</style>
