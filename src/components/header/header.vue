<template>
  <div class="header">
    <div class="content-wrapper">
    	<div class="avatar">
    		<img :src="seller.avatar" width="64" height="64">
    	</div>
    	<div class="content">
    		<div class="title">
    			<span class="brand"></span>
    			<span class="name">{{seller.name}}</span>
    		</div>
    		<div class="desc">
    			{{seller.description}}/{{seller.deliveryTime}}分钟送达
    		</div>
    		<div class="support" v-if="seller.supports">
    			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
    			<span class="text">{{seller.supports[0].description}}</span>
    		</div>
    	</div>
    	<div class="support-count" v-if="seller.supports">
    		<span class="count">{{seller.supports.length}}个</span>
    		<span class="icon-keyboard_arrow_right" @click="show"></span>
    	</div>
    </div>
    <div class="bulletin-wrapper">
    	<span class="bulletin-title"></span>
    	<span class="bulletin-text">{{seller.bulletin}}</span>
    	<span class="icon-keyboard_arrow_right arrow_right" @click="show"></span>
    </div>
    <div class="bg">
    	<img :src="seller.avatar" alt="bg" width="100%" height="100%">
    </div>
    <div class="detail " v-show="detailShow">
    	<div class="detail-wrapper clearfix">
    		<div class="detail-main">
    			<h1 class="detail-name">{{seller.name}}</h1>
    			<div class="star-wrapper">
    				<star :size="48" :score="seller.score"></star>
    			</div>
    			<div class="detail-title">
    				<div class="line"></div>
    			    <div class="text">商家优惠</div>
    			    <div class="line"></div>
    			</div>
    			<ul v-if="seller.supports" class="supports">
    				<li v-for="(item, index) in seller.supports" class="supports-item">
    					<span class="supports-icon" :class="classMap[seller.supports[index].type]"></span>
    					<span class="supports-text">{{item.description}}</span>
    				</li>
    			</ul>
    		</div>
    	</div>
    	<div class="detail-close" @click="close">&times;</div>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
export default {
   props: {
   	seller:{
   		type: Object
   	}
   },
   components:{
     star
   },
   data() {
      return {
      	detailShow: false
      };
   },
   methods: {
      show: function(){
      	this.detailShow = true;
      },
      close: function(){
      	this.detailShow = false;
      }
   },
   created() {
   	this.classMap = ['decrease','discount','special','invoice','guarantee'];
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.header
   position: relative
   background :rgba(7,17,27,.5)
   color:#fff
.content-wrapper
  position: relative
  padding:24px 12px 18px 24px
  font-size:0
.avatar
  display:inline-block
  vertical-align: top
  font-size:14px
img
 border-radius: 4px
.content
  display:inline-block
  font-size:14px
  margin-left:16px
.title
  margin:2px 0 8px 0
.brand
  display:inline-block
  vertical-align: top
  width:30px
  height:18px
  bg-image('brand')
  background-size: 30px 18px
  background-repeat: no-repeat
.name
  margin-left: 6px
  font-size: 16px
  font-weight: bold
  line-height: 18px
.desc
 margin-bottom: 10px
 line-height: 12px
.support
 .icon
  display: inline-block
  width: 12px
  height: 12px
  margin-right: 4px
  background-size: 12px 12px
  background-repeat: no-repeat
  &.decrease
   bg-image('decrease_1')
  &.discount
   bg-image('discount_1')
  &.guarantee
   bg-image('guarantee_1')
  &.invoice
   bg-image('invoice_1')
  &.special
   bg-image('special_1')
 .text
  line-height: 12px
  font-size: 12px
  vertical-align: top
.support-count
  position: absolute
  bottom: 20px
  right: 12px
  padding: 0 8px
  height: 24px
  border-radius: 4px
  line-height: 24px
  color: #fff
  background :rgba(0,0,0,.2)
  text-align: center
  .count
   font-size: 10px
   vertical-align: top
  .icon-keyboard_arrow_right
   margin-left: 2px
   line-height: 24px
   font-size: 10px
.bulletin-wrapper
 position: relative
 height: 28px
 line-height: 28px
 background :rgba(7,17,27,.2)
 padding: 0 22px 0 12px;
 white-space: nowrap
 overflow: hidden
 text-overflow: ellipsis
.bulletin-title
  display: inline-block
  vertical-align: top
  width: 22px
  height: 12px
  margin-top: 7px
  bg-image('bulletin')
  background-size: 22px 12px
  background-repeat: no-repeat
.bulletin-text
  margin:0 4px
  vertical-align: top
.arrow_right
 position: absolute
 font-size: 10px
 right: 12px
 bottom: 8px
.bg
 position: absolute
 top:0
 left:0
 width: 100%
 height:100%
 z-index: -1
 filter: blur(10px)
.detail
  position: fixed
  top: 0
  left: 0
  z-index: 100
  width: 100%
  height: 100%
  overflow: auto
  background: rgba(7,17,27,.8)
.detail-wrapper
  min-height: 100%
  width: 100%
.detail-main
  margin-top: 64px
  padding-bottom: 64px
  text-align: center
 .detail-name
  line-height: 16px
  font-size: 16px
  font-weight: 700
 .star-wrapper
  margin-top: 18px
  padding: 2px 0
  text-align: center
 .detail-title
  margin: 30px auto 24px
  display: flex
  width: 80%
 .line
  flex:1
  position:relative
  top: -6px
  border-bottom: 1px solid rgba(255,255,255,.2)
.supports
 width: 80%
 margin: 0 auto
.supports-item
 padding: 0 12px
 margin-bottom: 12px
 text-align:left
 font-size: 0
 &:last-child
  margin-bottom: 0
.supports-icon
 display:inline-block
 vertical-align: top
 width: 16px
 height: 16px
 margin-right: 6px
 background-size: 16px 16px
 background-repeat: no-repeat
 &.decrease
  bg-image('decrease_2')
 &.discount
  bg-image('discount_2')
 &.guarantee
  bg-image('guarantee_2')
 &.invoice
  bg-image('invoice_2')
 &.special
  bg-image('special_2')
.supports-text
 line-height: 12px
 font-size: 12px
.detail-close
  position: relative
  width: 32px
  height: 32px
  margin: -64px auto -10px auto
  clear: both
  font-size: 24px
</style>
