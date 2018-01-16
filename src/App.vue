<template>
  <div id="app">
     <vheader :seller="seller"></vheader>
      <div class="tab border-1px">
         <div class="tab-item">
           <router-link :to="{path:'goods'}">商品</router-link>
         </div>
         <div class="tab-item">
           <router-link :to="{path:'ratings'}">评价</router-link>
         </div>
         <div class="tab-item">
           <router-link :to="{path:'seller'}">商家</router-link>
         </div>
      </div>
       <div class="content">
          <router-view></router-view>
       </div>
  </div>
</template>

<script>
import vheader from "@/components/header/header";
const ERR_OK = 0;
export default {
  name: 'App',
  data() {
    return {
      seller:{}
    };
  },
  components: {
   vheader
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      //console.log(response.body);
        response = response.body;
      if(response.errno === ERR_OK){
        this.seller = response.data;
        console.log(this.seller);
      }
    })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "./common/stylus/mixin.styl"
.tab
  display: flex
  height: 40px
  line-height: 40px
  border-1px:(rgba(7,17,27,0.1))
.tab-item
    flex: 1
    text-align: center
& > a
       display: block
       text-decoration:none
       font-size: 14px
       color: rgb(177,185,193)
&.active
    color: rgb(240,20,20)
</style>
