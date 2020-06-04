<template>
  <el-dialog title="编辑模块" :visible.sync="showStatus" :open="refresh">
    <el-form :model="rowData">
      <el-form-item label="模块名" label-width="120px" prop="name">
        <el-input v-model="rowData.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="模块备注" label-width="120px" prop="comments">
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
    vuexModuleEditStatus() {
      return this.$store.state.flowStatus.moduleEditStatus;
    },
    vuexTempSceneModuleData() {
      return this.$store.state.sceneData.tempModuleData;
    }
  },
  watch: {
    vuexModuleEditStatus(newVal, oldVal) {
      this.showStatus = newVal;
    },
    showStatus(newVal, oldVal) {
      this.$store.commit("flowStatus/updateModuleEditStatus", newVal);
    },
    vuexTempSceneModuleData(newVal, oldVal) {
      this.rowData = JSON.parse(
        JSON.stringify(this.$store.state.sceneData.tempModuleData)
      );
    }
  },
  methods: {
    refresh: function() {
      this.rowData = JSON.parse(
        JSON.stringify(this.$store.state.sceneData.tempModuleData)
      );
    },
    save: async function() {
      this.$store.commit("sceneData/updateModuleData", this.rowData);
      this.$store.commit("flowStatus/updateModuleEditStatus", false);

      await this.$axios.post(
        "/api/setModuleList",
        JSON.stringify(this.$store.state.sceneData.sceneModuleList) + "\r\n",
        {
          headers: {
            "content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
    }
  }
};
</script>