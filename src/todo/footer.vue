<template>
  <div id="footer">
    <span>Written by {{author}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      author: 'cc'
    }
  }
}
</script>

<style lang="stylus" scoped>
#footer {
  margin-top: 40px;
  text-align: center;
  font-size: 10px;
  color: #bfbfbf;
  text-shadow: 0 1px 0 rgba(144, 144, 144, 0.3);
}
</style>

