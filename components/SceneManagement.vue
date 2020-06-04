<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <span style="line-height: 40px">选择模块:</span>
        <template>
          <el-select
            v-model="sceneModuleSelected"
            placeholder="请选择"
            style="width: 300px;margin-left: 20px"
            @change="sceneModuleChoose()"
          >
            <el-tooltip
              v-for="item in sceneModuleList"
              class="item"
              effect="dark"
              :content="item.comments == null ? item.name : item.comments"
              placement="right"
              :key="item.name"
            >
              <el-option :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-tooltip>
          </el-select>
        </template>
      </el-col>
      <el-col :span="4">
        <el-button type="success" @click="sceneCreate" style="float: right">新建场景</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <template>
          <el-table :data="sceneList" border style="width: 100%">
            <el-table-column prop="name" label="场景名"></el-table-column>
            <el-table-column prop="moduleName" label="模块名"></el-table-column>
            <el-table-column prop="comments" label="备注"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="middle" @click="serviceSort(scope.row)">服务编排</el-button>
                <el-button type="text" size="middle" @click="editScene(scope.row)">编辑</el-button>
                <el-button type="text" size="middle" @click="deleteScene(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    <FlowCreateScene />
    <FlowEditScene />
    <SortService/>
  </div>
</template>

<script>
import FlowCreateScene from "~/components/FlowCreateScene";
import FlowEditScene from "~/components/FlowEditScene";
import SortService from "~/components/SortService";

export default {
  components: {
    FlowCreateScene,
    FlowEditScene,
    SortService
  },
  data: () => {
    return {
      sceneModuleSelected: null,
      sceneList: []
    };
  },
  computed: {
    sceneModuleList() {
      return this.$store.state.sceneData.sceneModuleList;
    }
  },
  watch: {},
  methods: {
    sceneModuleChoose: function() {
      let moudleList = this.$store.state.sceneData.sceneModuleList;
      moudleList.forEach(element => {
        if (element.name == this.sceneModuleSelected) {
          this.sceneList = element.sceneInfos;
        }
      });
      this.$store.commit("sceneData/updateNowSortModule", this.sceneModuleSelected);
    },
    sceneCreate: function() {
      this.$store.commit("flowStatus/updateSceneCreateStatus", true);
    },
    editScene: function(row) {
      this.$store.commit("flowStatus/updateSceneEditStatus", true);
      this.$store.commit("sceneData/updateTempSceneData", row);
    },
    deleteScene: function(row) {
      this.$alert("确认要删除这条数据吗？", "注意", {
        confirmButtonText: "确定",
        callback: action => {
          this.$store.commit("sceneData/deleteSceneData", row);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        }
      });
    },
    serviceSort: function(row) {
      this.$store.commit("flowStatus/updateSortService", true);
      this.$store.commit("sceneData/updateNowSortScene", row.name);
    }
  }
};
</script>