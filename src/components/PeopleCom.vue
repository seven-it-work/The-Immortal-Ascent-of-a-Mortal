<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {ImmortalCultivators} from "../objs/ImmortalCultivators.ts";
import {getPercent} from "../util/ProbabilityUtils.ts";
import {progressFormat} from "../util/StrUtils.ts";

// @ts-ignore
export default defineComponent({
  name: "PeopleCom",
  methods: {progressFormat, getPercent},
  created() {
  },
  props: {
    immortalCultivator: {
      required: true,
      type: Object as PropType<ImmortalCultivators>
    }
  }
})
</script>

<template>
  <a-card :bordered="true" style="width: 200px" class="people-com" :id="`card_animate_${immortalCultivator.id}`">
    <template #title>
      <a-row>
        <a-col :span="8">
          <a-avatar :size="40">{{ immortalCultivator?.name?.substr(0, 1) }}</a-avatar>
        </a-col>
        <a-col :span="16">
          <div>名称：{{ immortalCultivator.name }}</div>
          <div>境界：{{ immortalCultivator.getLevelStr() }}</div>
          <!--          <div>等级：{{ immortalCultivator.level }}</div>-->
        </a-col>
      </a-row>
    </template>
    <div>
      <div class="progress-container">
<!--                <span>{{immortalCultivator.currentLife}}/{{immortalCultivator.getLife()}}</span>-->
        <a-progress
            :stroke-color="{from: '#108ee9',to: '#87d068',}"
            :percent="getPercent(immortalCultivator.currentLife,immortalCultivator.getLife())"
            status="active"
            :size="[300, 20]"
            :format="(percent)=>progressFormat(percent,'生命')"
        />
      </div>
      <div class="progress-container">
        <a-progress
            :stroke-color="{from: '#108ee9',to: '#87d068',}"
            :percent="getPercent(immortalCultivator.currentMana,immortalCultivator.getMana())"
            status="active"
            :size="[300, 20]"
            :format="(percent)=>progressFormat(percent,'法力')"
        />
      </div>
      <div class="progress-container">
        <span>攻击：{{immortalCultivator.getAttack()}}</span>
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