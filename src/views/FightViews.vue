<script lang="ts">
import {defineComponent} from 'vue'
import PeopleCom from "../components/PeopleCom.vue";
import {textEllipsis} from "../util/StrUtils.ts";
import EquipmentCom from "../components/EquipmentCom.vue";

export default defineComponent({
  name: "FightViews",
  methods: {textEllipsis},
  components: {EquipmentCom, PeopleCom}
})
</script>

<template>
  <!--PC，安卓存在挤在一起问题-->
<!--战斗区域-->
  <a-row style="padding: 20px" justify="space-between">
    <a-col :span="8">
      <div>
        <PeopleCom></PeopleCom>
      </div>
      <div>
        <PeopleCom></PeopleCom>
      </div>
    </a-col>
    <a-col :span="4">
      <div>第1回合</div>
      <a-checkbox>自动</a-checkbox>
      <a-button>下一个回合</a-button>
    </a-col>
    <a-col :span="10">
      <div>
        <PeopleCom></PeopleCom>
      </div>
    </a-col>
  </a-row>
<!--  进度区域-->
  <a-row style="padding: 20px">
    <a-flex style="margin:5px;width: 100%;height: 80px;border-radius: 6px;border: 1px solid #40a9ff" justify="space-between" align="center">
      <span>进  度：</span>
      <a-card>
        xxx
      </a-card>
      <a-card>
        xxx
      </a-card>
      <a-card>
        xxx
      </a-card>
    </a-flex>
    <a-progress :percent="50" :size="[800, 40]"/>
  </a-row>
  <a-row  justify="space-between" align="center" style="margin: 20px">
    <a-col :span="10">
      <div style="border:1px solid #40a9ff;border-radius: 6px;height: 400px">
      </div>
    </a-col>
    <a-col>
      <a-divider type="vertical" style="height: 400px; background-color: #7cb305" />
    </a-col>
    <a-col :span="13">
      <div style="border:1px solid #40a9ff;border-radius: 6px;height: 400px">
        <a-row>
          <a-col flex="none">
            <EquipmentCom></EquipmentCom>
          </a-col>
          <a-col flex="auto">
            装备信息
          </a-col>
        </a-row>
      </div>
    </a-col>
  </a-row>
<!--  战斗日志-->
</template>

<style scoped>

</style>