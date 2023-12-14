<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <h1>Member Management</h1>
    <table class="table table-striped table-hover mt-5">
      <thead>
        <tr>
          <select class="form-select" v-model="club" @change="updateClub(club)">
            <option v-for="club in clubs" :key="club.club_id" :value="club.club_id">{{ club.club_name }}</option>
          </select>
          <th>Name</th>
          <th>Email</th>
          <th>Joined Clubs</th>
          <th v-if="Permission === 'Admin'">Permission</th>

          <th></th>
          <th></th>

        </tr>
      </thead>
      <tbody>
        <td></td>

        <tr v-for="(member, index) in members" :key="index">
          <td></td>
          <td>{{ member.nickname }}</td>
          <td>{{ member.E_mail }}</td>
          <td>
            <select class="form-select">
              <option v-for="participated_club in member.part_clubs" disabled :key="participated_club.club_id">{{
                participated_club.club_name }}</option>
            </select>
          </td>
          <td v-if="Permission === 'Admin'">
            <select class="form-select" v-model="member.permission" @change="updatePermission(member.user_id, club)">
              <option :value="member.permission">{{ member.permission }}</option>
              <option value="Admin">Admin</option>
              <option value="student">student</option>
              <option value="club_manager">club_manager</option>
            </select>
          </td>
          <td>
            <a v-if="Permission==='Admin'" @click = "deleteMember(club,member.user_id)">Delete</a>
          </td>


        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'MemberManagementPage',
  data() {
    return {
      members: [

      ],
      clubs: [],
      club: "",
      participated_clubs: []
    };
  },
  async mounted() {
    const clubs = await axios.post(`http://localhost:3000/api/iter_clubs`);
    this.clubs = clubs.data
    console.log(this.clubs)
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      user_id: state => state.user_id
    })
  },
  methods: {
    mounted() {
      if (!this.$store.state.isAuthenticated) {
        alert("please login")
        this.$router.push('/')
      }

    },
    async updateClub(club_id) {
      console.log(club_id)
      this.fetchMembers(club_id)
    },
    async fetchMembers(club_id) {
      try {
        const apiUrl = 'http://localhost:3000/api';
        const response = await axios.post(`${apiUrl}/getClubMembers`, { club_id: club_id });
        console.log(response.data)
        response.data.forEach(e => {
          e.part_clubs = []
        })
        response.data.forEach(async (e) => {
          e.participated_clubs = JSON.parse(e.participated_clubs);
          for (const clubgot of e.participated_clubs) {
            const data = await axios.post(`${apiUrl}/get_club`, { club_id: clubgot.club_id });
            e.part_clubs.push(data.data[0])
          }
        });
        this.members = response.data;
        this.participated_clubs = response.data[0].participated_clubs
        console.log(this.members)
      } catch (error) {
        console.error('Error fetching members:', error);
        alert('Failed to fetch members.');
      }
    },
    test(club) {
      console.log(club)
    },
    async deleteMember(club_id,user_id) {
      console.log(club_id)
      try {
        // 发送 HTTP POST 请求到服务器，将社团 ID 和用户 ID 发送到后端
        const response = await axios.post('http://localhost:3000/api/deleteMember', {
          club_id: club_id,
          user_id: user_id
        });
        console.log(response.data);
      } catch (error) {
        alert(error);
      }
    },
    async updatePermission(user_id, club_id) {
      console.log("!!!", user_id)
      const member = this.members.filter(member => member.user_id == user_id);
      console.log("member", member)
      try {
        const apiUrl = 'http://localhost:3000/api';
        const response = await axios.patch(`${apiUrl}/members`, { user_id: user_id, permission: member[0].permission, club_id: club_id });
        console.log(response.data);
      } catch (error) {
        console.error('Error updating member permission:', error);
        alert('Failed to update member permission.');
      }
    },

  },
};
</script>
  
  <style>
  /* 设置表格边框 */
  table {
    border-collapse: collapse;
    width: 100%;
    max-width: 800px;
  }
  th,
  td {
    padding: 0.5rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }
  th {
    font-weight: bold;
  }
  /* 选择器样式 */
  select {
    padding: 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid gray;
  }
</style>
