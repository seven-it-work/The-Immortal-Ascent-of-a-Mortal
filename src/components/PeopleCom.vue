<script lang="ts">
import {defineComponent} from 'vue'
import {beAttacked, doAttacked} from "../util/AnimateUtils.ts";

export default defineComponent({
  name: "PeopleCom",
  methods:{},
  created() {
      // setInterval(()=>{
    doAttacked(document.getElementById("123")).then(()=>{
          console.log("执行完了")
        })
      // },6000)
  },
})
</script>

<template>
  <a-card :bordered="true" style="width: 200px" class="people-com" id="123">
    <template #title>
      <a-row>
        <a-col :span="8">
          <a-avatar :size="40">USER</a-avatar>
        </a-col>
        <a-col :span="16">
          <div>名称：xxx</div>
          <div>境界：练气期</div>
        </a-col>
      </a-row>
    </template>
    <div>
      <div class="progress-container">
        <span>生命：</span>
        <a-progress
            :stroke-color="{from: '#108ee9',to: '#87d068',}"
            :percent="99.9"
            status="active"
            :size="[300, 20]"
        />
      </div>
      <div class="progress-container">
        <span>法力：</span>
        <a-progress
            :stroke-color="{from: '#108ee9',to: '#87d068',}"
            :percent="99.9"
            status="active"
            :size="[300, 20]"
        />
      </div>
      <div class="progress-container">
        <span>攻击：</span>
        <a-progress
            :stroke-color="{from: '#108ee9',to: '#87d068',}"
            :percent="99.9"
            status="active"
            :size="[300, 20]"
        />
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.progress-container {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
}

.progress-container span {
  width: 40%;
}

</style>