<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <nuxt-link to="/interfaceModule" class="asideMenuItem">
            <div>
              <i class="el-icon-menu"></i>接口信息
            </div>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="2">
          <nuxt-link to="/sceneModule" class="asideMenuItem">
            <div>
              <i class="el-icon-video-camera"></i>场景管理
            </div>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="3">
          <nuxt-link to="/interfaceModule" class="asideMenuItem">
            <div>
              <i class="el-icon-video-play"></i>自动化测试
            </div>
          </nuxt-link>
        </el-menu-item>
        <el-menu-item index="4">
          <nuxt-link to="/globalConfigModule" class="asideMenuItem">
            <div>
              <i class="el-icon-tickets"></i>全局参数设置
            </div>
          </nuxt-link>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {}
};
</script>

<style>
.asideMenuItem {
  color: #303133;
  font-size: 14px;
  cursor: pointer;
  line-height: 56px;
  vertical-align: middle;
  list-style: none;
  text-decoration: none;
}
</style>