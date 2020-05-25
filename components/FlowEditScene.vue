<template>
  <el-dialog title="编辑场景" :visible.sync="showStatus">
    <el-form :model="rowData">
      <el-form-item label="场景名" label-width="120px" prop="name">
        <el-input v-model="rowData.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="模块名" label-width="120px" prop="moduleName">
        <el-select v-model="rowData.moduleName" placeholder="请选择" disabled>
          <el-option
            v-for="item in vuexModuleList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="场景备注" label-width="120px" prop="comments">
        <el-input v-model="rowData.comments" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">保 存</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data: () => {
    return {
      showStatus: false,
      rowData: {}
    };
  },
  computed: {
    vuexModuleList() {
      return this.$store.state.sceneData.sceneModuleList;
    },
    vuexSceneEditStatus() {
        return this.$store.state.flowStatus.sceneEditStatus;
    },
    vuexSceneList() {
        return this.$store.state.sceneData.tempSceneData;
    }
  },
  watch: {
      vuexSceneEditStatus(newVal, oldVal) {
          this.showStatus = this.$store.state.flowStatus.sceneEditStatus;
      },
      showStatus(newVal, oldVal) {
          this.$store.commit("flowStatus/updateSceneEditStatus", newVal);
      },
      vuexSceneList(newVal, oldVal) {
          this.rowData = JSON.parse(JSON.stringify(this.$store.state.sceneData.tempSceneData));
      }
  },
  methods: {
    save: function() {
        this.$store.commit("sceneData/updateSceneData", this.rowData);
        this.showStatus = false;
    }
  }
};
</script>