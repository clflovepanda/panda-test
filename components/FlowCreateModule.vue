<template>
  <el-dialog title="新建模块" :visible.sync="showStatus" @closed="resetForm('moduleData')">
    <el-form :model="moduleData" ref="moduleData">
      <el-form-item label="模块名" label-width="120px" prop="name">
        <el-input v-model="moduleData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="模块备注" label-width="120px" prop="comments">
        <el-input v-model="moduleData.comments" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createSceneModule">创 建</el-button>
    </span>
  </el-dialog>
</template>


<script>
export default {
  data: () => {
    return {
      showStatus: false,
      moduleData: {}
    };
  },
  computed: {
    vuexShowStatus() {
      return this.$store.state.flowStatus.moduleCreateStatus;
    }
  },
  watch: {
    vuexShowStatus(newVal, oldVal) {
      this.showStatus = newVal;
    },
    showStatus(newVal, oldVal) {
      this.$store.commit("flowStatus/updateModuleCreateStatus", newVal);
    }
  },
  methods: {
    createSceneModule: async function() {
      let flag = false;
      this.$store.state.sceneData.sceneModuleList.forEach(element => {
        if (element.name == this.moduleData.name) {
          this.$message.error("模块名重复!");
          flag = true;
          return;
        }
      });
      if (flag) {
        return;
      }
      this.$store.commit("sceneData/addSceneModule", this.moduleData);
      this.$store.commit("flowStatus/updateModuleCreateStatus", false);
      await this.$axios.post(
        "/api/setModuleList",
        JSON.stringify(this.$store.state.sceneData.sceneModuleList) + "\r\n",
        {
          headers: {
            "content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>