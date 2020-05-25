<template>
  <el-dialog title="创建全局变量" :visible.sync="showStatus" @closed="resetForm('moduleData')">
    <el-form :model="configData" ref="moduleData">
      <el-form-item label="变量名" label-width="120px" prop="name">
        <el-input v-model="configData.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="变量类型" label-width="120px" prop="comments">
        <el-select
            v-model="configData.type"
            placeholder="请选择"
            style="width: 300px;margin-left: 20px"
          >
            <el-tooltip
              v-for="item in typeList"
              class="item"
              effect="dark"
              :content="item.secondName"
              placement="right"
              :key="item.name"
            >
              <el-option :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-tooltip>
          </el-select>
      </el-form-item>
      <el-form-item label="值" label-width="120px" prop="name">
        <el-input v-model="configData.value" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" label-width="120px" prop="name">
        <el-input v-model="configData.comments" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="createConfigData">创 建</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data: () => {
    return {
      showStatus: false,
      configData: {},
      typeList: [
          { name: "int", secondName: "int整数" },
          { name: "string", secondName: "字符串" },
          { name: "long", secondName: "long整数" },
          { name: "float", secondName: "单精度浮点数" },
          { name: "double", secondName: "双精度浮点数" },
          { name: "int数组", secondName: "int数组" },
          { name: "string数组", secondName: "string数组" },
          { name: "long数组", secondName: "long数组" },
          { name: "float数组", secondName: "单精度浮点数数组" },
          { name: "double数组", secondName: "双精度浮点数数组" },
          { name: "Map<String, String>", secondName: "Map类型" },
          { name: "Map<String, Integer>", secondName: "Map类型" },
        ]
    };
  },
  computed: {
    vuexGlobalConfigCreateStatus() {
      return this.$store.state.flowStatus.globalConfigCreateStatus;
    }
  },
  watch: {
    vuexGlobalConfigCreateStatus(newVal, oldVal) {
      this.showStatus = this.$store.state.flowStatus.globalConfigCreateStatus;
    },
    showStatus(newVal, oldVal) {
      this.$store.commit("flowStatus/updateGlobalConfigCreateStatus", newVal);
    }
  },
  methods: {
    createConfigData() {
      this.$store.commit("globalConfigData/add", this.configData);
      this.$store.commit("flowStatus/updateGlobalConfigCreateStatus", false);
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>