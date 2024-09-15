<script setup lang="ts">
import People from "../obj/People";
var people = new People();
const temp=[]
const jj = [
  "练气期",
  "筑基期",
  "开光期",
  "融合期",
  "金丹期",
  "元婴期",
  "出窍期",
  "分神期",
  "合体期",
  "大乘期",
  "真仙境",
  "金仙境",
]
const jj2 = [
  "大罗金仙境",
  "混元大罗金仙境",
  "混元无极大罗金仙境",
  "混沌至尊境",
  "天尊境",
  "至高无上境",
  "超脱境",
  "无上真仙",
]

for (let i = 0; i < jj.length; i++) {
  for (let j = 0; j < 9+i; j++) {
    temp.push(jj[i])
  }
}
for (let i = 0; i < jj2.length; i++) {
  for (let j = 0; j < 30+i*10; j++) {
    temp.push(jj2[i])
  }
}

import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
  <div v-for="item in temp">
    {{item}}
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
