<template>
  <el-dialog title="参数配置" :visible.sync="showStatus" width="95%">
    <el-row>
      <el-col :span="2" style="height: 40px; line-height:40px; text-align:right">
        <span>当前字段：</span>
      </el-col>
      <el-col :span="5">
        <span style="height: 40px; line-height:40px; text-align:left">{{nowKey}}</span>
      </el-col>
      <el-col :span="12" style="line-height:40px; text-align:leeft">
        <el-row>
          <el-col :span="4" style>
            <span>字段的值：</span>
          </el-col>
          <el-col :span="20">
            <span style="height:40px; line-height:40px; text-align:left">{{nowVal.value}}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" style>
            <span>字段来源：</span>
          </el-col>
          <el-col :span="20">
            <span style="height:40px; line-height:40px; text-align:left">{{nowVal.from}}</span>
          </el-col>
        </el-row>
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
            <div
              style="border: 2px solid gray; height: 400px; over-flow: hidden; padding: 0px 0px 5px 0px"
            >
              <el-scrollbar style="height: 400px">
                <el-tree
                  :data="paramsTreeData"
                  @node-click="handleNodeClick"
                  :render-content="renderParamTree"
                  node-key="seq"
                  :default-expanded-keys="paramTreeExpanded"
                  :default-expand-all="true"
                ></el-tree>
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
            <div style="border: 2px solid gray; height: 400px; over-flow: hidden">
              <el-scrollbar style="height: 400px; height=100%">
                <el-tabs v-model="activeName" tab-position="left" style="height:100%">
                  <el-tab-pane label="全局配置数据" name="first">
                    <el-table
                      :data="vuexGlobalConfigList"
                      max-height="280"
                      border
                      style="width: 100%"
                    >
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
                  <el-tab-pane label="上下文数据" name="second">
                    <el-scrollbar style="height: 400px">
                      <el-tree :data="contextTreeData" @node-click="handleContextNodeClick"></el-tree>
                    </el-scrollbar>
                  </el-tab-pane>
                  <el-tab-pane label="自定义数据" name="third">
                    <el-row style="padding: 20px 0px 0px 0px">
                      <el-col :span="22" :offset="1">
                        <el-input type="textarea" :rows="8" placeholder="请输入内容" v-model="inputVal"></el-input>
                      </el-col>
                    </el-row>
                    <el-row style="margin: 20px 0px 0px 0px">
                      <el-col :span="22" :offset="1">
                        <el-button type="success" style="width: 100%" @click="confirmInput">确 认</el-button>
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
      nowKeyType: "",
      nowKeyInfo: "",
      nowVal: {
        value: "",
        type: "",
        from: "无",
        idx: "",
        simpleType: "",
        enumClass: "",
        classInfo: null
      },
      inputVal: "",
      showStatus: false,
      paramsTreeData: [
        {
          label: "recruitId <Long>",
          attrName: "panda",
          attrType: "long"
        },
        {
          label: "oppositeId <Long>"
        }
      ],
      contextTreeData: [],
      paramTreeExpanded: []
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
      this.refresh();
    }
  },
  methods: {
    handleNodeClick(data) {
      this.nowKey = (data.parent + "." + data.paramName).substring(1);
      this.nowKeyType = data.type;
      this.nowKeyInfo = data;
      this.$store.commit("sceneData/updateNowSortParam", data.seq);
    },
    handleContextNodeClick(data) {
      this.nowVal.value = (data.parent + "." + data.paramName).substring(1);
      this.nowVal.from = "上下文数据";
      this.nowVal.idx = data.seq;
      this.nowVal.type = data.type;
      this.nowVal.simpleType = data.simpleType;
      this.nowVal.enumClass = data.enumClass;
      this.nowVal.classInfo = data;
      // this.nowKey = (data.parent + "." + data.paramName).substring(1);
    },
    confirmConnect: async function() {
      if (this.nowKey == null || this.nowKey == "" || this.nowKey == "空") {
        alert("key不能为空");
        return;
      }
      if (this.nowVal.value == null || this.nowVal.value == "") {
        alert("value不能为空");
        return;
      }
      if (this.nowVal.from == "上下文数据") {
        if (this.nowKeyType != this.nowVal.type) {
          this.$message.error("类型不一致，无法赋值");
          return;
        }
        this.setVal(this.nowKeyInfo, this.nowVal);
      } else {
        this.$store.commit("sceneData/setParamVal", this.nowVal);
      }
      this.refresh();
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
    setVal(param, obj) {
      //只针对上下文情况下的递归赋值
      this.$store.commit("sceneData/updateNowSortParam", param.seq);
      if (!obj.simpleType && !obj.enumClass) {
        obj.classInfo.children.forEach((element, index) => {
          console.log("element:", element);
          let temp = {
            value: (element.parent + "." + element.paramName).substring(1),
            type: element.type,
            from: "上下文数据",
            idx: element.seq,
            simpleType: element.simpleType,
            enumClass: element.enumClass,
            classInfo: element
          };
          this.setVal(param.children[index], temp);
        });
      } else {
        this.$store.commit("sceneData/setParamVal", obj);
      }
    },
    confirmInput() {
      this.nowVal.value = this.inputVal;
      this.nowVal.from = "手动输入";
    },
    chooseConfig(row) {
      this.nowVal.value = row.name;
      this.nowVal.from = "全局配置";
    },
    refreshContext() {
      let nowModuleName = this.$store.state.sceneData.nowSortModule;
      let nowSceneName = this.$store.state.sceneData.nowSortScene;
      let nowMethodIndex = this.$store.state.sceneData.nowSortMethod;
      let moduleSceneList = this.$store.state.sceneData.sceneModuleList;
      let serviceInfList = this.$store.state.serviceData.serviceList;
      let arranges = null;
      // 找到对应的场景中的某个接口方法
      moduleSceneList.forEach(element => {
        if (element.name == nowModuleName) {
          element.sceneInfos.forEach(el => {
            if (el.name == nowSceneName) {
              arranges = el.arrangeInfos.slice(0, nowMethodIndex);
            }
          });
        }
      });
      this.contextTreeData = [];
      arranges.forEach((nowArrange, index) => {
        if (nowArrange.methodInfo.resultInfo.type != "void") {
          this.buildTree(
            nowArrange.methodInfo.resultInfo,
            "",
            this.contextTreeData,
            index,
            nowArrange.methodInfo.name
          );
        }
      });
    },
    refresh: function() {
      let nowArrange = this.getNowSort();
      this.refreshParams(nowArrange.methodInfo);
      this.refreshContext();
    },
    refreshParams: function(methodInfo) {
      let paramInfos = methodInfo.paramInfos;
      this.paramsTreeData = [];
      if (paramInfos == null || paramInfos.length == 0) {
        return;
      }
      paramInfos.forEach((element, index) => {
        this.buildTree(element, "", this.paramsTreeData, index);
      });
    },
    buildTree: function(classInfo, parent, tree, seq, methodName) {
      let node = {
        paramName: classInfo.name,
        paramValue: "",
        parent: parent,
        seq: seq,
        simpleType: classInfo.simpleType,
        enumClass: classInfo.enumClass,
        hasVal: classInfo.hasVal,
        type: classInfo.type,
        label:
          classInfo.name +
          " <" +
          classInfo.typeName +
          ">" +
          " 序号: " +
          seq +
          (methodName ? " ——来自接口: " + methodName : "") +
          (classInfo.simpleType == true || classInfo.enumClass == true
            ? "（值：" + classInfo.value + "）"
            : "")
      };
      if (classInfo.isSimpleType != true) {
        node.children = [];
        classInfo.attrs.forEach((element, i) => {
          this.buildTree(
            element,
            parent + "." + classInfo.name,
            node.children,
            seq + "-" + i
          );
        });
      }
      tree.push(node);
    },
    getNowSortMethod: function() {
      let nowArrange = this.getNowSort();
      // 在服务接口列表中找到这个方法
      let serviceInfList = this.$store.state.serviceData.serviceList;
      let methodInfo = null;
      serviceInfList.forEach(element => {
        if (element.fullName == nowArrange.serviceFullName) {
          element.methodInfos.forEach(el => {
            if (el.fullName == nowArrange.methodInfo.methodFullName) {
              methodInfo = el;
            }
          });
        }
      });
      return methodInfo;
    },
    getNowSort: function() {
      let nowModuleName = this.$store.state.sceneData.nowSortModule;
      let nowSceneName = this.$store.state.sceneData.nowSortScene;
      let nowMethodIndex = this.$store.state.sceneData.nowSortMethod;
      let moduleSceneList = this.$store.state.sceneData.sceneModuleList;
      let nowArrange = null;
      // 找到对应的场景中的某个接口方法
      moduleSceneList.forEach(element => {
        if (element.name == nowModuleName) {
          element.sceneInfos.forEach(el => {
            if (el.name == nowSceneName) {
              nowArrange = el.arrangeInfos[nowMethodIndex];
            }
          });
        }
      });
      return nowArrange;
    },
    renderParamTree: function(h, { node, data, $store }) {
      if (data.simpleType || data.enumClass) {
        if (data.hasVal) {
          return (
            <span style="font-size:14px;cursor:pointer; color: #67C23A">
              {node.label}
            </span>
          );
        } else {
          return (
            <span style="font-size:14px;cursor:pointer; color: #F56C6C">
              {node.label}
            </span>
          );
        }
      } else {
        return <span style="font-size:14px;cursor:pointer">{node.label}</span>;
      }
    }
  }
};
</script>

<!--
    label: attribute name;
    type: field type;
    value: field value;
    valueFrom: origin value, global config, 

-->