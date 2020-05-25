<template>
  <el-dialog title="参数配置" :visible.sync="showStatus" width="80%">
    <el-row>
      <el-col :span="2" style="height: 40px; line-height:40px; text-align:right">
        <span>当前字段：</span>
      </el-col>
      <el-col :span="5">
        <span style="height: 40px; line-height:40px; text-align:left; color: red">{{nowKey}}</span>
      </el-col>
      <el-col :span="2" style="height: 40px; line-height:40px; text-align:right">
        <span>字段的值：</span>
      </el-col>
      <el-col :span="5">
        <span style="height:40px; line-height:40px; text-align:left; color:red">{{nowVal}}</span>
      </el-col>
      <el-col :span="4" :offset="1">
        <el-button type="success" @click="confirmConnect">确认赋值</el-button>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="10" :offset="1">
        <el-row>
          <el-col :span="24" style="line-height: 40px">参数列表:</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="border: 1px solid gray; height: 300px; over-flow: hidden">
              <el-scrollbar style="height: 300px">
                <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="10" :offset="2">
        <el-row>
          <el-col :span="24" style="line-height: 40px">取值位置:</el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="border: 1px solid gray; height: 300px; over-flow: hidden">
              <el-scrollbar style="height: 300px; height=100%">
                <el-tabs v-model="activeName" tab-position="left" style="height:100%">
                  <el-tab-pane label="全局配置数据" name="first">
                    <el-table :data="vuexGlobalConfigList" max-height="280" border style="width: 100%">
                      <el-table-column fixed prop="name" label="变量名"></el-table-column>
                      <el-table-column prop="type" label="变量类型"></el-table-column>
                      <el-table-column prop="value" label="值"></el-table-column>
                      <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                          <el-button @click="chooseConfig(scope.row)" type="text" size="small">选择</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane label="上下文数据" name="second">上下文数据</el-tab-pane>
                  <el-tab-pane label="自定义数据" name="third">
                    <el-row style="padding: 20px 0px 0px 0px">
                      <el-col :span="22" :offset="1">
                        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="nowVal.value"></el-input>
                      </el-col>
                    </el-row>
                    <el-row style="margin: 20px 0px 0px 0px">
                      <el-col :span="22" :offset="1">
                        <el-button type="success" style="width: 100%">确 认</el-button>
                      </el-col>
                    </el-row>
                  </el-tab-pane>
                </el-tabs>
              </el-scrollbar>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  data: () => {
    return {
      activeName: "first",
      nowKey: "空",
      nowVal: {
        value: "",
        type: "",
        from: ""
      },
      showStatus: false,
      treeData: [
        {
          label: "一级 1",
          attrName: "panda",
          attrType: "int",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  computed: {
    vuexConfigParamsStatus() {
      return this.$store.state.flowStatus.configParamsStatus;
    },
    vuexGlobalConfigList() {
      return this.$store.state.globalConfigData.globalConfigList;
    }
  },
  watch: {
    vuexConfigParamsStatus(newVal, oldVal) {
      this.showStatus = this.$store.state.flowStatus.configParamsStatus;
    },
    showStatus(newVal, oldVal) {
      this.$store.commit("flowStatus/updateConfigParamsStatus", newVal);
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.nowKey = data.label;
    },
    confirmConnect() {},
    chooseConfig(row) {}
  }
};
</script>

<!--
    label: attribute name;
    type: field type;
    value: field value;
    valueFrom: origin value, global config, 

-->