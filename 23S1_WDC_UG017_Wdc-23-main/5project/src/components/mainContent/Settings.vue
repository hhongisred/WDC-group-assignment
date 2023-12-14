<template>
    <div class="container">
        <div class="club-items">SettingsPage</div>
        <div class="club-items">My Club</div>
    </div>
</template>
  
<script>
export default {
    name: 'SettingsPage',
    mounted() {
        console.log(3)
    }
}
</script>
  
<style scoped>
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    overflow:scroll;
}

.club-items {
  width: calc(100% - 54px);
  margin-top:27px;
  height: 543px;
  background-color: aqua;
}
</style>