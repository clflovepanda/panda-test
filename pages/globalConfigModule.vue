<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="success" @click="createConfig">新增全局变量</el-button>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table :data="configList" border style="width: 100%">
            <el-table-column prop="name" label="变量名"></el-table-column>
            <el-table-column prop="type" label="变量类型"></el-table-column>
            <el-table-column prop="value" label="值"></el-table-column>
            <el-table-column prop="comments" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="middle" @click="deleteConfig(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>

    <FlowCreateGlobalConfig />
  </div>
</template>
<script>
import FlowCreateGlobalConfig from "~/components/FlowCreateGlobalConfig";
export default {
  components: {
    FlowCreateGlobalConfig
  },
  data: () => {
    return {};
  },
  computed: {
    configList() {
      return this.$store.state.globalConfigData.globalConfigList;
    }
  },
  methods: {
    deleteConfig: function(row) {
      this.$alert("确认要删除这条数据吗？", "注意", {
        confirmButtonText: "确定",
        callback: action => {
          this.$store.commit("globalConfigData/delete", row);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        }
      });
    },
    createConfig: function() {
      this.$store.commit("flowStatus/updateGlobalConfigCreateStatus", true);
    }
  }
};
</script>