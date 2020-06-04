<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="refresh">刷新数据</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <template>
          <el-tabs v-model="infMgActiveName">
            <el-tab-pane label="接口数据" name="first">
              <el-tree :data="serviceTree" @node-click="handleNodeClick"></el-tree>
            </el-tab-pane>
            <el-tab-pane label="场景数据" name="second">
              <el-tree :data="sceneTree" @node-click="handleNodeClick"></el-tree>
            </el-tab-pane>
            <el-tab-pane label="配置数据" name="third"></el-tab-pane>
          </el-tabs>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      infMgActiveName: "first",
      serviceTree: [],
      sceneTree: []
    };
  },
  computed: {
    serviceData() {
      return this.$store.state.serviceData.serviceList;
    }
  },
  watch: {},
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    },
    refresh() {
      this.serviceTree = [];
      let temp = this.$store.state.serviceData.serviceList;
      this.buildTree(temp, this.serviceTree);
      this.sceneTree = [];
      let temp2 = this.$store.state.sceneData.sceneModuleList;
      this.buildTree(temp2, this.sceneTree);
    },
    buildTree(obj, tree) {
      // console.log("buildTree:", obj);
      // this.cnt ++;
      // if(this.cnt > 100) {
      //   return;
      // }
      if (obj instanceof Array) {
        // console.log("is array");
        this.buildArr(obj, tree);
      } else if (typeof obj == "string") {
        // console.log("is string");
        // this.buildString(obj, tree);
        return;
      } else if (typeof obj == "function") {
        // console.log("is function");
        return;
      } else if (typeof obj == "undefined") {
        // console.log("is undefined");
        return;
      } else if (typeof obj == "boolean") {
        // console.log("is boolean");
        // this.buildString(obj, tree);
        return;
      } else if (typeof obj == "number") {
        // console.log("is number");
        // this.buildString(obj, tree);
        return;
      } else {
        // console.log("is object");
        this.buildObj(obj, tree);
      }
    },
    buildArr(arr, tree) {
      if (arr == null || arr.length == 0) {
        return;
      }
      arr.forEach(el => {
        this.buildTree(el, tree);
      });
    },
    buildObj(obj, tree) {
      if (obj == null) {
        return;
      }
      if(!obj.name && !obj.methodInfo) {
        return;
      }
      let node;
      try {
        node = {
          label: obj.name ? obj.name : obj.methodInfo.name,
          children: []
        };
      } catch(e) {
        console.log(e);
      }

      tree.push(node);

      let keys = Object.keys(obj);
      // console.log(keys);
      keys.forEach(key => {
        let attrNode = {
          label: key + ": " + obj[key],
          children: []
        };
        node.children.push(attrNode);
        this.buildTree(obj[key], attrNode.children);
      });
    },
    buildString(obj, tree) {
      // console.log(obj);
      let node = {
        label: obj
      };
      tree.push(node);
    }
  }
};
</script>