<template>
  <div>
    <el-container>
      <el-header class="header">PandaQ V2.0 —— Alpha版</el-header>
      <el-container>
        <el-aside width="200px">
          <Menu/>
        </el-aside>
        <el-main>
          <nuxt />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Menu from '~/components/Menu'

export default {
  components: {
    Menu
  }
}
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
}
.header {
  background: #409eff;
  text-align: left;
  color: white;
  font-size: 24px;
  line-height: 60px;
}
.aside {
  width: 200px;
  background: white;
}
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
