<template>
  <div class="container">
    <h1 class="text-center my-4">Browse Notification</h1>
    <div class="flex-row">
      <div v-for="(rscv, index) in rscvList" :key="index" class="flex-item">
        <div class="card">
          <img v-if="rscv.imageSrc" :src="rscv.imageSrc" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ rscv.user_id }} posted in {{ rscv.club_name }}</h5>
            <p class="card-text">{{ rscv.message }}</p>
            <small class="text-muted">{{ rscv.time }}</small>
            <small class="text-muted">{{ rscv.club }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width:100%;
}

.flex-row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  width:70%;

}

.flex-item {
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  
}

.card {
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  border: none;
  width:1000px;
}

.card-body {
  padding: 1rem;
}

.card-title {
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
}

.card-text {
  margin-top: 0.5rem;
  line-height: 1.5;
}
</style>

<script>
import axios from "axios";
import { mapState } from 'vuex';

export default {
  name: "BrowseRSCV",
  data() {
    return {
      rscvList: [],
    };
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      user_id: state => state.user_id

    })
  },


  created() {
    this.fetchRSCV();
  },
  methods: {
    mounted() {
      if (!this.$store.state.isAuthenticated) {
        alert("please login")
        this.$router.push('/')
      }

    },
    async fetchRSCV() {
      try {
        const apiUrl = "http://localhost:3000/api";
        const response = await axios.post(`${apiUrl}/RSCVlist`, { user_id: this.user_id });
        this.rscvList = response.data;
      } catch (error) {
        console.error("Error fetching RSCV:", error);
        alert("Failed to fetch RSCV.");
      }
    },
  },
};
</script>
