<template>
  <div class="top-menu" :style="{ backgroundColor: selectedColor }">
      <div class="item-left">
        <div class="left-item">
          <img src="../assets\logo_1.png" />
        </div>
        <div class="left-item">
          <div class="text" style="font-size: 25px; margin-left:5px;">Student&ensp;</div>
          <div class="text" style="font-size: 28px;">Club </div>
          <div class="text" style="font-size: 16px;font-weight:bolder;">UAG17 </div>
        </div>
      </div>
      <div class="item-right">
        <div class="right-items" v-if="$store.getters.isAuthenticated">
          <div class="right-item">
            <div class="logged">
              <div class="info">
                <h2>{{ username }}</h2>
                <h2>{{ Permission }}</h2>
              </div>
              <img style="margin-left: 32px;" v-if="!avatar" src="../assets\userimg.png" alt="" class="user-img">
              <img style="margin-left: 32px;" v-if="avatar" :src="avatar" alt="" class="user-img">
              <h2 style="margin-left: 32px;" @click="tologout">logout</h2>
            </div>
          </div>
        </div>
        <div class="unlogged" v-if="!$store.getters.isAuthenticated">
          <h2 style="margin-left: 32px;margin-right: 32px;" @click="tologin">login</h2>
        </div>
      </div>
  </div>
</template>

<script>
import router from '@/router';
import { mapState } from 'vuex';

export default {
  name: 'topMenu',
  mounted() {
    console.log(this.Permission);
    if (this.Permission == "student") {
      this.selectedColor = "88E2FF"
    }
    else if (this.Permission == "Admin") {
      this.selectedColor = "D688FF"
    }
    if (this.Permission == "club manager") {
      this.selectedColor = "FF9696"
    }

  },

/*   watch: {
      Permission(newVal) {
        console.log("11111",this.Permission)
      }
    },
 */  data() {
    return {
      colors: {
        student: "#0000ff",
        Admin: "aqua",
        "club manager": "red"
      },
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      avatar:state=>state.avatar
    }),
    selectedColor() {
      return this.colors[this.Permission] || "";
    }

  },

  methods: {
    tologin() {
      router.push({
        path: "/login"
      })
    },
    tologout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style scoped>
.top-menu {
  /* Header */
  position: fixed;
  width: 100%; 
  height: 19%;
  top: 15px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
  background-color: rgb(210, 210, 234);
}

.item-left {
  flex: 0 0 384px;    /* updated to flex layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.item-right {
  flex: 1;    /* updated to flex layout */
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

/* ...rest of your styles... */
.left-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: right;
  justify-content: center;
}

.text {
  font-weight: bold;
  margin-right: 32px;
}

.left-container {
  margin-left: 20px;
  align-items: flex-start;
}

img {
  margin-left: 32px;
  bottom: 2px;
  width: 108px;
  height: 101px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.right-items {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.right-item {
  margin-right: 32px;
}

.logged {
  margin-left: 32px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.user-img {
  width: 90px;
  height: 90.83px;
}

.search {
  margin-left: 32px;
  width: 67px;
  height: 67px
}

.unlogged {
  margin-top: 4px;
  margin-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: right;
}</style>