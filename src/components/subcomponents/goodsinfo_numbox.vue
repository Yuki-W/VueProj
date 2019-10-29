<template>
  <div>
    <!-- 我们不知道什么时候可以获取到商品数量的最大值max
         但是，总有一刻，会得到一个真正的 max值
         我们可以使用 watch 属性监听 父组件传递过来的max值，不管watch触发几次，最后一次一定是一个合法的 max值
     -->
    <div class="mui-numbox" data-numbox-min="1">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input
        id="test"
        class="mui-input-numbox"
        type="number"
        value="1"
        @change="countChange"
        ref="numbox"
      />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
  },
  methods: {
    countChange() {
      // 每当 文本框的数据被修改时，立即把 最新的数据，通过事件调用 传递给父组件

      // 获取文本框内容：this.$refs.numbox.value
      this.$emit("getcount",parseInt(this.$refs.numbox.value));
    }
  },
  props:["max" ],
  watch: {
    // 属性监听
    max : function(newVal,oldVal) {
      // 使用 JS API 设置 numbox 最大值
      mui(".mui-numbox").numbox().setOption("max",newVal);
    }
  },
};
</script>

<style lang="" scoped>
</style>
