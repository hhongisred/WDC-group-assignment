<template>
  <div class="club-container">
    <button v-if="Permission == 'Admin'" type="button" class="btn btn-primary" @click="$router.push('/Clubmanage')">
      Club manage
    </button>
    <button v-if="Permission == 'Admin'" type="button" class="btn btn-primary" @click="$router.push('/clubCreate')">
      Club Create
    </button>

    <section v-if="Permission === ''">
      <h1>Popular Clubs</h1>
      <ul class="club-list">
        <li v-for="Club in Clubs" :key="Club.club_id" class="club-item">
          <router-link :to="{ path: '/clubDetail', query: { club_id: Club.club_id } }">
            <img class="club-item__logo" :src="Club.logo" alt="">
            <h2 class="club-item__name">{{ Club.club_name }}</h2>
          </router-link>
        </li>
      </ul>
    </section>

    <section v-if="Permission !== ''">
      <h1>My Clubs</h1>
      <ul class="club-list">
        <li v-for="Club in my_Clubs" :key="Club.club_id" class="club-item">
          <router-link :to="{ path: '/clubDetail', query: { club_id: Club.club_id } }">
            <img class="club-item__logo" :src="Club.logo" alt="">
            <h2 class="club-item__name">{{ Club.club_name }}</h2>
            <div class="club-item__placeholder"></div> 
          </router-link>
        </li>
      </ul>
    </section>

    <section>
      <h1>All Clubs</h1>
      <ul class="club-list">
        <li v-for="Club in All_Clubs" :key="Club.club_id" class="club-item">
          <router-link :to="{ path: 'ClubDetail', query: { club_id: Club.club_id } }">
            <img class="club-item__logo" :src="Club.logo" alt="">
            <h2 class="club-item__name">{{ Club.club_name }}</h2>
            <div class="club-item__placeholder"></div> 
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.club-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
}

.btn-primary {
  width: 150px;
  margin-bottom: 1rem;
}

h1 {
  text-align: left;
  margin-top: 2rem;
}
.club-item__placeholder {
  width: 200px; /* 设置一个固定宽度，确保该元素对应的 club-item 元素有宽度 */
}

.club-list {
  display: flex;
  flex-direction: row;
  white-space: nowrap;
  overflow-x: auto;
}

.club-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.club-item__logo {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.club-item__name {
  margin: 1rem 0;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}
</style>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'MemebersPage',

  async mounted() {
    console.log("Permission", this.$store.state.Permission);
    this.Permission = this.$store.state.Permission;

    let response_all_clubs = await axios.post("http://127.0.0.1:3000/api/iter_clubs", {})
    this.All_Clubs = response_all_clubs.data;

    let response_polular_clubs = await axios.post("http://127.0.0.1:3000/api/popular_clubs", {})
    this.Clubs = response_polular_clubs.data;
    console.log("2222", this.Clubs)

    let response_my_clubs = await axios.post("http://127.0.0.1:3000/api/my_clubs", { user_id: this.user_id })
    console.log(response_my_clubs)
    this.my_Clubs = response_my_clubs.data;
    console.log("3333", this.my_Clubs)
  },

  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      user_id: state => state.user_id

    })
  },

  data() {
    return {
      All_Clubs: [],
      Clubs: [],
      my_Clubs: [],
      Events: [
        {
          Date: "25th,May",
          Time: "Monday_6pm",
          content: "Hill riding"
        },
        {
          Date: "25th,May",
          Time: "Monday_6pm",
          content: "Hill riding1"
        },
        {
          Date: "25th,May",
          Time: "Monday_6pm",
          content: "Hill riding2"
        },
      ]
    }
  }
};
</script>

<!-- <style scoped>
.button-item {
  background-color: white;
  height: 24%;
  font-size: 50px;
  margin-bottom: 5px;
  font-weight: bolder;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.buttons-area {
  background-color: black;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5%;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  margin-left: 10px;
  margin-right: 10px;
}

.club-items {
  width: calc(100% - 54px);
  margin-top: 27px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  text-align: center;
}

.img-container {
  margin-left: 20px;
  width: 300px;
  height: 300px;
}

.eventList {
  display: flex;
  flex-direction: row;
  font-size: 30px;
  font-weight: bolder;
  border: 2px solid black;
}

.event-date {
  width: 30%;
  background-color: gray;
}

.event-content {
  flex: 1;
  background-color: white;
}

.left {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  max-width: calc(70% - 27px);
  height: 546px;
}

.right {
  flex: 1;
  max-width: calc(30% - 27px);
  height: 546px;
  margin-right: 27px;
}

.event-items {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;
}
</style> -->