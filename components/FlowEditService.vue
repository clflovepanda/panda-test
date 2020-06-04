<template>
  <el-dialog title="服务类信息修改" :visible.sync="serviceEditStatus">
    <el-form :model="rowData">
      <el-form-item label="服务类名" label-width="120px">
        <el-input v-model="rowData.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="服务别名" label-width="120px">
        <el-input v-model="rowData.secondName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="服务备注" label-width="120px">
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
      rowData: {},
      serviceEditStatus: false
    };
  },
  computed: {
    vuexServiceEditStatus() {
      return this.$store.state.flowStatus.serviceEditStatus;
    },
    vuexServiceTempRowData() {
      return this.$store.state.serviceData.tempRowData;
    }
  },
  watch: {
    vuexServiceEditStatus(newVal, oldVal) {
      this.serviceEditStatus = this.$store.state.flowStatus.serviceEditStatus;
    },
    serviceEditStatus(newVal, oldVal) {
      this.$store.commit("flowStatus/updateServiceEditStatus", newVal);
    },
    vuexServiceTempRowData(newVal, oldVal) {
      this.rowData = JSON.parse(
        JSON.stringify(this.$store.state.serviceData.tempRowData)
      );
    }
  },
  methods: {
    save: async function() {
      this.$store.commit("serviceData/updateServiceList", this.rowData);
      this.$store.commit("flowStatus/updateServiceEditStatus", false);
      await this.$axios.post(
        "/api/setServiceDomTree",
        JSON.stringify(this.$store.state.serviceData.serviceList) + "\r\n",
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
