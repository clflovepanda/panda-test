<template>
<div>
  <el-drawer
    :visible.sync="drawer"
    :direction="direction"
    :with-header="false"
    :before-close="handleClose"
    size="50%"
  >
    <el-page-header @back="goBack" content="服务编排" style="margin: 20px 0px 0px 10px"></el-page-header>
    <el-divider></el-divider>
    <el-row style="margin: 10px 0px 0px 10px">
      <el-button type="info">查看全局配置</el-button>
      <el-button type="info">添加节点</el-button>
      <el-tooltip class="item" effect="dark" content="编译" placement="bottom">
        <el-button type="primary" icon="el-icon-document" circle></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="执行" placement="bottom">
        <el-button type="success" icon="el-icon-caret-right" circle></el-button>
      </el-tooltip>
    </el-row>
    <el-divider></el-divider>
    <el-row style="margin: 10px 0px 0px 10px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="type" label="类型" width="50"></el-table-column>
        <el-table-column prop="serviceName" label="类名"></el-table-column>
        <el-table-column prop="interfaceName" label="接口名"></el-table-column>
        <el-table-column prop="status" label="传参状态" width="80"></el-table-column>
        <el-table-column label="移动" width="100">
          <template>
            <el-tooltip class="item" effect="dark" content="下移" placement="bottom">
              <el-button icon="el-icon-bottom" size="mini" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="上移" placement="bottom">
              <el-button icon="el-icon-top" size="mini" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="configSortInfo(scope.row)" type="text" size="middle">配置参数</el-button>
            <el-button @click="editSortInfo(scope.row)" type="text" size="middle">编辑</el-button>
            <el-button @click="deleteSortInfo(scope.row)" type="text" size="middle">删除</el-button>
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
</div>
</template>

<script>
import FlowConfigParams from "~/components/FlowConfigParams";
export default {
  components: {
    FlowConfigParams
  },
  data: () => {
    return {
      drawer: false,
      direction: "rtl",
      tableData: [
        {
          type: "接口",
          serviceName: "IRimRoomService",
          interfaceName: "enterRoom",
          status: "正常"
        }
      ]
    };
  },
  computed: {
    vuexSortServiceStatus() {
      return this.$store.state.flowStatus.sortServiceStatus;
    }
  },
  watch: {
    vuexSortServiceStatus(newVal, oldVal) {
      this.drawer = this.$store.state.flowStatus.sortServiceStatus;
    },
    drawer(newVal, oldVal) {
      this.$store.commit("flowStatus/updateSortService", newVal);
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
    configSortInfo: function() {
      this.$store.commit("flowStatus/updateConfigParamsStatus", true);
    },
    editSortInfo: function() {},
    deleteSortInfo: function() {}
  }
};
</script>