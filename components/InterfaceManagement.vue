<template>
  <div>
    <el-row style="height: 40px">
      <el-col :span="12">
        <span style="line-height: 40px">选择服务类:</span>
        <template>
          <el-select
            v-model="infMagClassSelected"
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
              <el-option :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-tooltip>
          </el-select>
        </template>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px">
      <el-col :span="24">
        <template>
          <el-table :data="interfaceList" border style="width: 100%">
            <el-table-column prop="name" label="方法名"></el-table-column>
            <el-table-column prop="secondName" label="别名"></el-table-column>
            <el-table-column prop="comments" label="备注"></el-table-column>
            <el-table-column prop="params" label="参数"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="middle" @click="showEditInfDialog(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>

    <FlowEditInterface/>
  </div>
</template>

<script>
import FlowEditInterface from "~/components/FlowEditInterface";

export default {
  components: {
    FlowEditInterface
  },
  computed: {
    serviceList() {
      return this.$store.state.serviceData.serviceList;
    }
  },
  data: () => {
    return {
      infMagClassSelected: "",
      interfaceList: []
    };
  },
  methods: {
    infMagChooseClass: function() {
      this.$store.state.serviceData.serviceList.forEach(element => {
        if (element.name == this.infMagClassSelected) {
          this.interfaceList = element.interfaces;
          return;
        }
      });
    },
    showEditInfDialog: function(row) {
        this.$store.commit("flowStatus/updateInterfaceEditStatus", true);
        this.$store.commit("serviceData/updateTempRowInfoData", row);
        this.$store.commit("serviceData/updateTempSelectService", this.infMagClassSelected);
    }
  }
};
</script>