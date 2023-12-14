<template>
  <div class="side-bar navbar-nav">
    <h1 @click="goHome" class="nav-link">Home</h1>
    <h1 @click="goClubs" class="nav-link">Clubs</h1>
    <h1 @click="goMembers" v-if="Permission" class="nav-link">Members</h1>
    <h1 @click="goEvents" class="nav-link">Events</h1>
    <h1 @click="goMyAccount" v-if="Permission" class="nav-link">MyAccount</h1>
    <h1 @click="goNews" v-if="Permission" class="nav-link">News</h1>
    <h1 @click="$router.push(`/RSCVcreate`)" v-if="Permission=='club_manager'" class="nav-link">Noticifation</h1>
    <h1 @click="$router.push(`/newsCreate`)" v-if="Permission=='club_manager'" class="nav-link">newsCreate</h1>

<!--     <h1 @click="goSettings" v-if="Permission" class="nav-link">Settings</h1>
    <h1 @click="goUpdates" class="nav-link">Updates</h1> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'SideBar',
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission
    })
  },

  methods: {
    // 导航到不同的路由
    goHome() {
      this.$router.push('/', () => {}, () => {});
    },
    goClubs() {
      this.$router.push('/clubs', () => {}, () => {});
    },
    goMembers() {
      this.$router.push('/members', () => {}, () => {});
    },
    goEvents() {
      this.$router.push('/events', () => {}, () => {});
    },
    goMyAccount() {
      this.$router.push('/myaccount', () => {}, () => {});
    },
    goNews() {
      this.$router.push('/news', () => {}, () => {});
    },
    goSettings() {
      this.$router.push('/settings', () => {}, () => {});
    },
    goUpdates() {
      this.$router.push('/updates', () => {}, () => {});
    },
  }
};
</script>

<style scoped>
.navbar-nav {
  background-color: #444444;
  position: fixed;
  width: 20%;
  height: 80vh;
  left: 10.24px;
  right: 1525.76px;
  top: 22%;
  bottom: 0;
}
.nav-link {
  margin-left: 20px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-size:30px;
  font-weight: bolder;
}
</style>
