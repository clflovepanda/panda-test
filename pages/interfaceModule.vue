<template>
  <el-row>
    <el-col :span="24">
      <template>
        <el-tabs v-model="infMgActiveName">
          <el-tab-pane label="服务管理" name="first">
            <ServiceManagement/>
          </el-tab-pane>
          <el-tab-pane label="接口管理" name="second">
            <InterfaceManagement/>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-col>
  </el-row>
</template>

<script>
import ServiceManagement from '~/components/ServiceManagement';
import InterfaceManagement from '~/components/InterfaceManagement';

export default {
    components: {
        ServiceManagement, InterfaceManagement
    },
    data: () => {
        return {
            infMgActiveName: "first"
        }
    }
}
</script>