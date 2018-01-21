<template>
  <div class="ratingselect">
     <div class="rating-type border-1px">
     	<span @click="select(2, $event)" class="block positive":class="{'active': selectType===2}">{{desc.all}} <span class="count">{{ratings.length}}</span></span>
     	<span  @click="select(0, $event)"class="block positive" :class="{'active': selectType===0}">{{desc.positive}}<span class="count">{{positive.length}}</span></span>
     	<span  @click="select(1, $event)"class="block negative":class="{'active': selectType===1}">{{desc.negative}}<span class="count">{{negative.length}}</span></span>
     </div>
     <div class="switch" :class="{'on':onlyContent}"  @click="toggleContent">
     	<span class="icon-check_circle"></span>
        <span class="text">只看有评价的内容</span>
     </div>
  </div>
</template>

<script>
  const POSITIVE = 0; // 好评
  const NEGATIVE = 1; // 差评
  const ALL = 2; // 所有评价
export default {
    props:{
     ratings:{
     	type: Array,
     	default() {
     		return [];
     	}
     },
     selectType:{// 选择的评价类型
       type: Number,
        default: ALL
     },
     onlyContent:{
     	type: Boolean,
     	default: false
     },
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
    },
    computed:{
       positive(){
         return this.ratings.filter((rating)=>{
         	 return rating.rateType === POSITIVE;
         })
       },
       negative(){
       	 return this.ratings.filter((rating)=>{
       	 	return rating.rateType === NEGATIVE;
       	 })
       }
    },
    methods:{
    	select(type,event){// 改变查看的评价内容和评价样式
    	 if (!event._constructed){
    	 	return;
    	 }
    	  // 子组件派发事件，改变父组件(food)的 ratingType 状态
        //this.selectType = type;
         this.$emit('select', type);
    	},
        toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        // 子组件派发事件，改变父组件（food)的 ratingType 状态
        this.$emit('toggle');
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
 @import '../../common/stylus/mixin.styl';
   .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size: 0
      .block
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        line-height: 16px
        border-radius: 1px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active
          color: #fff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive // 好评
          background: rgba(0, 160, 220, .2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, .2)
          &.active
            background: rgb(77, 85, 93)
    .switch // 是否只查看有内容的评价
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, .1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        margin-right: 4px
        font-size: 24px
      .text
        display: inline-block
        vertical-align: top
        font-size: 12px
</style>
