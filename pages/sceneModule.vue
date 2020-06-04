<template>
  <el-row>
    <el-col :span="24">
      <template>
        <el-tabs v-model="sceneMgActiveName">
          <el-tab-pane label="模块管理" name="first">
            <ModuleManagement />
          </el-tab-pane>
          <el-tab-pane label="场景管理" name="second">
            <SceneManagement />
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import ModuleManagement from "~/components/ModuleManagement";
import SceneManagement from "~/components/SceneManagement";

export default {
  components: {
    ModuleManagement,
    SceneManagement
  },
  data: () => {
    return {
      sceneMgActiveName: "first"
    };
  }
};
</script>