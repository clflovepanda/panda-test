<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="success" @click="sceneModuleCreate">新建模块</el-button>
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-col :span="24">
        <template>
          <el-table :data="sceneModuleData" border style="width: 100%">
            <el-table-column prop="name" label="模块名"></el-table-column>
            <el-table-column prop="comments" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="middle" @click="editSceneModule(scope.row)">编辑</el-button>
                <el-button type="text" size="middle" @click="deleteSceneModule(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <FlowCreateModule />
    <FlowEditModule />
  </div>
</template>
<script>
import FlowCreateModule from "~/components/FlowCreateModule";
import FlowEditModule from "~/components/FlowEditModule";
export default {
  components: {
    FlowCreateModule,
    FlowEditModule
  },
  data: () => {
    return {};
  },
  computed: {
    sceneModuleData() {
      return this.$store.state.sceneData.sceneModuleList;
    }
  },
  watch: {},
  methods: {
    sceneModuleCreate() {
      this.$store.commit("flowStatus/updateModuleCreateStatus", true);
    },
    editSceneModule(row) {
      this.$store.commit("sceneData/updateTempModuleData", row);
      this.$store.commit("flowStatus/updateModuleEditStatus", true);
    },
    deleteSceneModule(row) {
      this.$alert(
        "当前操作会删除当前模块下的所有场景。确认要删除这条数据吗？",
        "注意",
        {
          confirmButtonText: "确定",
          callback: action => {
            this.$store.commit("sceneData/deleteModuleData", row);
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        }
      );
    }
  }
};
</script>