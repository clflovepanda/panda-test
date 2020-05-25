<template>
  <el-dialog title="新建场景" :visible.sync="showStatus" @closed="resetForm('sceneCreateData')">
    <el-form :model="rowData" ref="sceneCreateData">
      <el-form-item label="场景名" label-width="120px" prop="name">
        <el-input v-model="rowData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="模块名" label-width="120px" prop="moduleName">
        <el-select v-model="rowData.moduleName" placeholder="请选择">
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
      <el-button type="primary" @click="createScene">创 建</el-button>
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
      vuexSceneCreateStatus() {
          return this.$store.state.flowStatus.sceneCreateStatus;
      },
      vuexModuleList() {
          return this.$store.state.sceneData.sceneModuleList;
      }
  },
  watch: {
      vuexSceneCreateStatus(newVal, oldVal) {
          this.showStatus = this.$store.state.flowStatus.sceneCreateStatus;
      },
      showStatus(newVal, oldVal) {
          this.$store.commit("flowStatus/updateSceneCreateStatus", newVal);
      }
  },
  methods: {
    createScene: function() {
        if(this.rowData.name == null) {
            this.$message.error("name不可以为空");
            return;
        }
        if(this.rowData.moduleName == null) {
            this.$message.error("模块不能为空");
            return;
        }
        if(this.rowData.comments == null) {
            this.rowData.comments = "";
        }
        this.$store.commit("sceneData/addScene", this.rowData);
        this.showStatus = false;
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>