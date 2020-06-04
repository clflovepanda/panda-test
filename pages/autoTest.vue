<template>
  <div>
    <el-row>
      <el-col :span="8">
        <span style="line-height: 40px">选择模块:</span>
        <template>
          <el-select
            v-model="sceneModuleSelected"
            placeholder="请选择"
            style="width: 300px;margin-left: 20px"
            @change="sceneModuleChoose()"
          >
            <el-tooltip
              v-for="item in sceneModuleList"
              class="item"
              effect="dark"
              :content="item.comments == null ? item.name : item.comments"
              placement="right"
              :key="item.name"
            >
              <el-option :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-tooltip>
          </el-select>
        </template>
      </el-col>
      <el-col :span="8">
        <span style="line-height: 40px">选择场景:</span>
        <template>
          <el-select
            v-model="sceneSceneSelected"
            placeholder="请选择"
            style="width: 300px;margin-left: 20px"
            @change="sceneSceneChoose()"
          >
            <el-tooltip
              v-for="item in sceneList"
              class="item"
              effect="dark"
              :content="item.comments == null || item.comments == '' ? item.name : item.comments"
              placement="right"
              :key="item.name"
            >
              <el-option :key="item.name" :label="item.name" :value="item.name"></el-option>
            </el-tooltip>
          </el-select>
        </template>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button type="success">测试模块</el-button>
        <el-button type="success" @click="executeTest">测试场景</el-button>
        <el-button type="success">测试全部</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">日志界面</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      sceneModuleSelected: "",
      sceneSceneSelected: "",
      sceneList: []
    };
  },
  computed: {
    sceneModuleList() {
      return this.$store.state.sceneData.sceneModuleList;
    }
  },
  watch: {},
  methods: {
    sceneModuleChoose() {
      let moudleList = this.$store.state.sceneData.sceneModuleList;
      moudleList.forEach(element => {
        if (element.name == this.sceneModuleSelected) {
          this.sceneList = element.sceneInfos;
        }
      });
    },
    sceneSceneChoose() {},
    executeTest: async function() {
        await this.$axios.get(
            "/api/runScene?",
            {
                params: {
                    module: this.sceneModuleSelected,
                    scene: this.sceneSceneSelected,
                    type: "scene"
                }
            }
        ).then(function(response) {
            console.log(response);
        });
    }
  }
};
</script>