<template>
  <div class="container">
    <div class="left">My Club</div>
    <div class="right">Rules</div>
    <div class="bottom">Upcoming Events</div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  mounted() {
    console.log(3)
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
  padding:27px;
  
}

.left {
  flex: 1;
  max-width: calc(70% - 27px);
  height: 546px;
  background-color: aqua;
}

.right {
  flex: 1;
  max-width: calc(30% - 27px);
  height: 546px;
  background-color: red;
  margin-right: 27px;
}

.bottom {
  flex: 1 0 100%;
  max-width: calc(100% - 27px);
  height: calc((100vh - 616px - 27px) / 1.56);
  margin-top: 27px;
  background-color: blue;
}
</style>