<template>
  <el-dialog title="接口信息修改" :visible.sync="showStatus">
    <el-form :model="rowData">
      <el-form-item label="接口名" label-width="120px">
        <el-input v-model="rowData.name" autocomplete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="接口别名" label-width="120px">
        <el-input v-model="rowData.secondName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口备注" label-width="120px">
        <el-input v-model="rowData.comments" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="接口参数" label-width="120px">
        <el-input v-model="rowData.params" autocomplete="off" :disabled="true"></el-input>
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
      showStatus: false,
      rowData: {}
    };
  },
  computed: {
    vuexInterfaceEditStatus() {
      return this.$store.state.flowStatus.interfaceEditStatus;
    },
    vuexTempRowInfData() {
      return this.$store.state.serviceData.tempRowInfData;
    }
  },
  watch: {
    vuexInterfaceEditStatus(newVal, oldVal) {
      this.showStatus = this.$store.state.flowStatus.interfaceEditStatus;
    },
    showStatus(newVal, oldVal) {
      this.$store.commit("flowStatus/updateInterfaceEditStatus", newVal);
    },
    vuexTempRowInfData(newVal, oldVal) {
      this.rowData = JSON.parse(
        JSON.stringify(this.$store.state.serviceData.tempRowInfData)
      );
    }
  },
  methods: {
      save: async function() {
        this.$store.commit("serviceData/updateInterfaceList", {
            serviceName: this.$store.state.serviceData.tempSelectService, 
            rowData: this.rowData
        });
        this.showStatus = false;
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