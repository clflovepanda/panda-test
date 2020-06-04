<template>
  <div>
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      :with-header="false"
      :before-close="handleClose"
      size="70%"
    >
      <el-page-header @back="goBack" content="服务编排" style="margin: 20px 0px 0px 10px"></el-page-header>
      <el-divider></el-divider>
      <el-row style="margin: 10px 0px 0px 10px">
        <el-button type="success" @click="showAddInf">添加节点</el-button>
        <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
          <el-button type="primary" icon="el-icon-refresh" @click="refreshList" circle></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="检验传参" placement="bottom">
          <el-button type="primary" icon="el-icon-document" circle></el-button>
        </el-tooltip>
      </el-row>
      <el-divider></el-divider>
      <el-row style="margin: 10px 0px 0px 10px">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column fixed prop="type" label="类型" width="50"></el-table-column>
          <el-table-column prop="serviceName" label="类名"></el-table-column>
          <el-table-column prop="interfaceName" label="接口名"></el-table-column>
          <el-table-column prop="resultType" label="返回值"></el-table-column>
          <el-table-column
            prop="complete"
            label="传参状态"
            width="100"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.complete == 'true' ? 'success' : 'danger'"
                disable-transitions
              >{{scope.row.complete == 'true' ? "完成" : "缺失"}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button
                @click="configSortInfo(scope.row, scope.$index)"
                type="text"
                size="middle"
              >配置参数</el-button>
              <el-button
                @click="deleteSortInfo(scope.row, scope.$index)"
                type="text"
                size="middle"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center; margin: 20px 0px 0px 0px">
          <el-button type="primary" @click="save" style="width: 80%">保存并退出</el-button>
        </el-col>
      </el-row>
    </el-drawer>
    <FlowConfigParams />
    <FlowAddInterface />
  </div>
</template>

<script>
import FlowConfigParams from "~/components/FlowConfigParams";
import FlowAddInterface from "~/components/FlowAddInterface";

export default {
  components: {
    FlowConfigParams,
    FlowAddInterface
  },
  data: () => {
    return {
      drawer: false,
      direction: "rtl",
      tableData: []
    };
  },
  computed: {
    vuexSortServiceStatus() {
      return this.$store.state.flowStatus.sortServiceStatus;
    },
    vuexAddInfStatus() {
      return this.$store.state.flowStatus.addInfStatus;
    }
  },
  watch: {
    vuexSortServiceStatus(newVal, oldVal) {
      this.drawer = this.$store.state.flowStatus.sortServiceStatus;
    },
    vuexAddInfStatus() {
      this.refreshList();
    },
    drawer(newVal, oldVal) {
      this.$store.commit("flowStatus/updateSortService", newVal);
      this.refreshList();
    }
  },
  methods: {
    handleClose: function() {
      this.drawer = false;
    },
    save() {
      this.drawer = false;
    },
    goBack: function() {
      this.drawer = false;
    },
    configSortInfo: function(rowData, index) {
      this.$store.commit("sceneData/updateNowSortMethod", index);
      this.$store.commit("flowStatus/updateConfigParamsStatus", true);
    },
    deleteSortInfo: async function(rowData, index) {
      this.$store.commit("sceneData/deleteSceneInf", index);
      this.refreshList();
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
    showAddInf: function() {
      this.$store.commit("flowStatus/updateAddInfStatus", true);
    },
    refreshList: function() {
      this.checkStatus();
      let moduleList = this.$store.state.sceneData.sceneModuleList;
      let nowModule = this.$store.state.sceneData.nowSortModule;
      let nowScene = this.$store.state.sceneData.nowSortScene;
      moduleList.forEach(element => {
        if (element.name == nowModule) {
          element.sceneInfos.forEach(el => {
            if (el.name == nowScene) {
              this.tableData = [];
              let newVal = el.arrangeInfos;
              if (!newVal) {
                return;
              }
              newVal.forEach(e => {
                let temp = {
                  type: e.arrangeType,
                  serviceName: e.methodInfo.serviceName,
                  interfaceName: e.methodInfo.name,
                  complete: "" + e.complete,
                  resultType: e.methodInfo.resultInfo.typeName
                };
                this.tableData.push(temp);
              });
            }
          });
        }
      });
    },
    checkStatus: function() {
      let moduleList = this.$store.state.sceneData.sceneModuleList;
      let nowModule = this.$store.state.sceneData.nowSortModule;
      let nowScene = this.$store.state.sceneData.nowSortScene;
      moduleList.forEach(tempModule => {
        if (tempModule.name == nowModule) {
          tempModule.sceneInfos.forEach(tempScene => {
            if (tempScene.name == nowScene) {
              if (!tempScene.arrangeInfos) {
                return;
              }
              tempScene.arrangeInfos.forEach((tempArrange, index) => {
                let flag = true;
                tempArrange.methodInfo.paramInfos.forEach(tempParam => {
                  flag = this.checkParams(tempParam);
                });
                let data = {
                  moduleName: nowModule,
                  sceneName: nowScene,
                  arrangeMethodIndex: index,
                  status: flag == true
                };
                this.$store.commit("sceneData/updateArrangeStatus", data);
              });
            }
          });
        }
      });
    },
    checkParams: function(obj) {
      if (obj.simpleType || obj.enumClass) {
        return obj.hasVal;
      } else {
        let result = true;
        obj.attrs.forEach(attr => {
          result &= this.checkParams(attr);
        });
        return result;
      }
    }
  }
};
</script>