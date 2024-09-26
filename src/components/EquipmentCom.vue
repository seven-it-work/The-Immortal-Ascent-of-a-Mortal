<script lang="ts">
import {defineComponent} from 'vue'
import {textEllipsis} from "../util/StrUtils.ts";

export default defineComponent({
  name: "EquipmentCom",
  methods: {textEllipsis}
})
</script>

<template>
  <a-row>
    <a-col :span="12">
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'武器'">{{ textEllipsis('武器') }}</a-tooltip>
        </div>
      </a-card>
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'上装'">{{ textEllipsis('上装') }}</a-tooltip>
        </div>
      </a-card>
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'下装'">{{ textEllipsis('下装') }}</a-tooltip>
        </div>
      </a-card>
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'鞋子'">{{ textEllipsis('鞋子') }}</a-tooltip>
        </div>
      </a-card>
    </a-col>
    <a-col :span="12">
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'坐骑'">{{ textEllipsis('坐骑') }}</a-tooltip>
        </div>
      </a-card>
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'项链'">{{ textEllipsis('项链') }}</a-tooltip>
        </div>
      </a-card>
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'戒指'">{{ textEllipsis('戒指') }}</a-tooltip>
        </div>
      </a-card>
      <a-card
          style="width: 60px; height: 60px;margin: 5px"
          :bodyStyle="{ margin: '0', padding: '0' }"
      >
        <div style="width: 100%; height: 60px;" class="center-content" >
          <a-tooltip :title="'腰带'">{{ textEllipsis('腰带') }}</a-tooltip>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>