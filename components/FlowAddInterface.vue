<template>
  <el-dialog title="新增接口" :visible.sync="showStatus" @closed="resetForm('addInfData')">
    <el-form :model="addInfData" ref="addInfData">
      <el-form-item label="服务名" label-width="120px" prop="className">
        <template>
          <el-select
            v-model="addInfData.infMagClassSelected"
            placeholder="请选择"
            style="width: 300px;margin-left: 20px"
            @change="infMagChooseClass()"
          >
            <el-tooltip
              v-for="item in serviceList"
              class="item"
              effect="dark"
              :content="item.secondName"
              placement="right"
              :key="item.name"
            >
              <el-option :key="item.name" :label="item.name" :value="item.fullName"></el-option>
            </el-tooltip>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="接口名" label-width="120px" prop="methodName">
        <template>
          <el-select
            v-model="addInfData.infMagMethodSelected"
            placeholder="请选择"
            style="width: 300px;margin-left: 20px"
          >
            <el-tooltip
              v-for="item in interfaceList"
              class="item"
              effect="dark"
              :content="item.secondName"
              placement="right"
              :key="item.name"
            >
              <el-option :key="item.name" :label="item.name" :value="item.fullName"></el-option>
            </el-tooltip>
          </el-select>
        </template>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSceneInf">确认添加</el-button>
    </span>
  </el-dialog>
</template>


<script>
export default {
  data: () => {
    return {
      showStatus: false,
      addInfData: {
        infMagClassSelected: "",
        infMagMethodSelected: ""
      },
      interfaceList: []
    };
  },
  computed: {
    serviceList() {
      return this.$store.state.serviceData.serviceList;
    },
    vuexAddInfStatus() {
      return this.$store.state.flowStatus.addInfStatus;
    }
  },
  watch: {
    vuexAddInfStatus() {
      this.showStatus = this.$store.state.flowStatus.addInfStatus;
    },
    showStatus() {
      this.$store.commit("flowStatus/updateAddInfStatus", this.showStatus);
    }
  },
  methods: {
    infMagChooseClass: function() {
      this.$store.state.serviceData.serviceList.forEach(element => {
        if (element.fullName == this.addInfData.infMagClassSelected) {
          this.interfaceList = element.methodInfos;
          return;
        }
      });
      this.addInfData.infMagMethodSelected = "";
    },
    addSceneInf: async function() {
      if (
        this.addInfData.infMagMethodSelected == null ||
        this.addInfData.infMagMethodSelected == ""
      ) {
        this.$message({
          message: "需要选择一个接口",
          type: "warning"
        });
        return;
      }
      let serviceList = this.$store.state.serviceData.serviceList;
      serviceList.forEach(element => {
        if (element.fullName == this.addInfData.infMagClassSelected) {
          element.methodInfos.forEach(el => {
            if (el.fullName == this.addInfData.infMagMethodSelected) {
              let infData = JSON.parse(JSON.stringify(el));
              this.$store.commit("sceneData/addSenceInf", infData);
            }
          });
        }
      });
      this.showStatus = false;
      await this.$axios.post(
        "/api/setModuleList",
        JSON.stringify(this.$store.state.sceneData.sceneModuleList) + "\r\n",
        {
          headers: {
            "content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        }
      );
      this.addInfData.infMagClassSelected = "";
      this.addInfData.infMagMethodSelected = "";
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>