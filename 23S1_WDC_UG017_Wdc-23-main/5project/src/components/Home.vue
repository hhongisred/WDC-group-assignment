<template>
    <div>
        <topMenu />
        <sideBar />

        <router-view class="main" />

    </div>
</template>
<script>
import topMenu from "./menu"
import sideBar from "./sideBar"

export default ({
    name: "HomeView",
    components: {
        topMenu,
        sideBar
    }
})
</script>
<style scoped>
.main {
    /* Main Background */
    position: fixed;
    width: calc(80%-10px);
    height: 80vh;
    left: 21%;
    right: 10px;
    top: 22%;
    bottom: -26px;
    background: rgb(196, 196, 196);
    overflow: scroll;
}
</style>
