<template>
  <div class="container my-4">
    <h1>Create Event</h1>
    <form @submit.prevent="submitForm" class="my-4 p-3 bg-light border rounded">
      <div class="form-group">
        <label for="club">ClubVisible:</label>
        <select class="form-control" id="club" v-model="club">
          <option value="">-- Select Club --</option>
          <option value="">-- All Visible --</option>
          <option v-for="club in clubs" :key="club.club_id" :value="club.club_id">{{ club.club_name }},clubid:{{
            club.club_id }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="club">Club:</label>
        <select class="form-control" id="club" v-model="clubSubmitted">
          <option value="">-- Select Club --</option>
          <option v-for="club in clubs" :key="club.club_id" :value="club.club_name">{{ club.club_name }},clubid:{{
            club.club_id }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="time">Time:</label>
        <input type="datetime-local" class="form-control" id="time" v-model="time" required>
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" class="form-control" id="location" v-model="location" required>
      </div>
      <div class="form-group">
        <label for="content">Content:</label>
        <textarea class="form-control" id="content" rows="5" v-model="content" required></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'CreateEventPage',
  data() {
    return {
      club: '',
      time: '',
      location: '',
      content: '',
      clubs: [],
      clubSubmitted:""
    }
  },
  created() {
    this.fetchClubs();
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      user_id: state => state.user_id,
    })
  },

  methods: {
    mounted() {
      if (!this.$store.state.isAuthenticated) {
        alert("please login")
        this.$router.push('/')
      }

    },
    async fetchClubs() {
      try {
        const apiUrl = 'http://localhost:3001/api';
        const response = await axios.post(`${apiUrl}/managed_clubs`, { user_id: this.user_id });
        this.clubs = response.data;
      } catch (error) {
        console.error('Error fetching clubs:', error);
        alert('Failed to fetch clubs.');
      }
    },
    submitForm() {
      const apiUrl = 'http://localhost:3001/api';
      const eventData = {
        club_id: this.club,
        time: this.time,
        location: this.location,
        content: this.content,
        clubSubmitted:this.clubSubmitted
      };
      axios.post(`${apiUrl}/eventSubmit`, eventData)
        .then(response => {
          console.log('Event created:', response.data);
          alert('Event created successfully!');
          this.club = '';
          this.time = '';
          this.location = '';
          this.content = '';
          this.clubSubmitted = ""
        })
        .catch(error => {
          console.error('Error creating event:', error);
          alert('Failed to create event.');
        });
    }
  }
}
</script>
