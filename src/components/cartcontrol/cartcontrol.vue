<template>
  <div class="cartcontrol">
        <transition name="move">
          <div class="decrease " v-show="food.count>0" @click.stop.prevent="deCrease">
              <span class="inner icon-remove_circle_outline"></span>
          </div>
        </transition>
     <div class="count" v-show="food.count>0">{{food.count}}</div>
     <div class="add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
 props:{
   food:{
    type: Object
   }
 },
 methods:{
    addCart:function(){
      //console.log('click');
      if (!event._constructed) {
          return;
        }
      if(!this.food.count){
       Vue.set(this.food,'count',1);
      }else{
        this.food.count++;
      }
    },
    deCrease: function(){
      if (!event._constructed) {
          return;
      }
      if (this.food.count) {
         this.food.count--;
      }
    }
 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .decrease
      display: inline-block
      padding: 6px
      transition: all .4s linear
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner // 减按钮外层
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all .4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(360deg)
    .count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
<!--    -->