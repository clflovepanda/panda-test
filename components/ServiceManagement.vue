<template>
  <div>
    <el-table :data="serviceList" border style="width: 100%">
      <el-table-column prop="name" label="服务类名"></el-table-column>
      <el-table-column prop="secondName" label="别名"></el-table-column>
      <el-table-column prop="comments" label="备注"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="middle" @click="showEditServiceInfoDialog(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <FlowEditService/>
  </div>
</template>

<script>
import FlowEditService from "~/components/FlowEditService";

export default {
  components: {
    FlowEditService
  },
  computed: {
    serviceList() {
      return this.$store.state.serviceData.serviceList;
    }
  },
  data: () => {
      return {
        row: null,
        serviceClassInfoEditVal: false
      }
  },
  methods: {
    showEditServiceInfoDialog: function(row) {
        this.$store.commit("flowStatus/updateServiceEditStatus", true);
        this.$store.commit("serviceData/updateTempRowData", row);
    }
  }
};
</script>