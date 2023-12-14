<template>
  <div class="club-detail container">
    <h1>{{ club.club_name }}</h1>
    <div class="row">
      <div class="col-md-6 d-flex justify-content-center align-items-center">
        <img :src="club.logo" alt="" class="img-fluid rounded">
      </div>
      <div class="col-md-6">
        <p class="lead">{{ club.description }}</p>
        <ul class="list-group list-unstyled">
          <li><strong>Create time:</strong> {{ club.create_time }}</li>
          <li><strong>Members:</strong> {{ club.members }}</li>
          <li><strong>Manager:</strong> {{ club.manager }}</li>
          <li><strong>Description:</strong> {{ club.description }}</li>
          <li><strong>User:</strong>
            <p v-if="club.userList">
              <span v-for="user in getParsedUserList()" :key="user.user_id"><p>{{ user.username }}</p></span>
            </p>
            <p v-if="club.userList&&club.userList.length==3">
              <span><p>...</p></span>
            </p>
          </li>

        </ul>
        <button v-if="!isRegistered && this.$store.state.user_id" @click="registerClub()" class="btn btn-primary mt-3">Register</button>
        <p v-if="isRegistered">You are already registered for this club.</p>
        <p v-if="!this.$store.state.user_id"><router-link to="/login" class="text-decoration-none">Please Login.</router-link></p>
      </div>
    </div>
  </div>
</template>

<style>
@import '~bootstrap/dist/css/bootstrap.css';

.club-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.club-detail .row {
  margin-top: 20px;
}

.club-detail img {
  max-width: 100%;
}

.club-detail ul {
  margin-top: 20px;
}

.club-detail button, .club-detail p {
  margin-top: 20px;
}
.button-item{
  background-color: white;
  height:24%;
  font-size: 50px;
  margin-bottom: 5px;
  font-weight: bolder;
  align-items: center;
  display:flex;
  flex-direction: column;
  justify-content: center;

}
.buttons-area{
  background-color: black;
  display: flex;
  flex-direction: column;
  width:50%;
  margin-top:10px;
  margin-bottom: 10px;
  border-radius: 5%;
  
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow:scroll;
  margin-left: 10px;
  margin-right: 10px;

}

.club-items {
width: calc(100% - 54px);
margin-top:27px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-evenly;
text-align: center;

}
.img-container{
  margin-left:20px;
  width:300px;
  height:300px;
}
.eventList{
  display:flex;
  flex-direction: row;
  font-size: 30px;
  font-weight: bolder;
  border:2px solid black;

}
.event-date{
  width:30%;
  background-color:gray ;
}
.event-content{
  flex:1;
  background-color:white ;
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

.event-items{
  width:90%;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  margin-right: 10px;

}
</style>

 
<script>
import axios from 'axios';

export default {
  data() {
    return {
      club: {},
      isRegistered:false
    };
  },
  async mounted() {
    console.log(this.$store.state);
    try {
      const response = await axios.post('http://127.0.0.1:3000/api/get_club', { club_id: this.$route.query.club_id, user_id: this.$store.state.user_id });
      console.log(response.data[0]);
      this.club = response.data[0];
      this.isRegistered = this.isUserRegistered();
      if (this.club.userList) {
        const newUserList = [];
        const userList = JSON.parse(this.club.userList);
        for (let i = 0; i < userList.length; i++) {
          const user = userList[i];
          let getUsername = await axios.post('http://127.0.0.1:3000/api/get_user', { user_id: user.user_id });
          newUserList.push({ username: getUsername.data, user_id: user.user_id });
          console.log(newUserList);
        }
        this.club.userList = JSON.stringify(newUserList);
        console.log("new club", newUserList);
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    getParsedUserList() {
      try {
        return JSON.parse(this.club.userList);
      } catch (error) {
        console.error('Error parsing user list:', error);
        return [];
      }
    },
    async registerClub() {
      const that = this;
      try {
        const response = await axios.post('http://127.0.0.1:3000/api/register_club', { club_id: this.club.club_id, user_id: this.$store.state.user_id });
        console.log(response.data);
        if (response.data.success) {
          that.isRegistered = true;
          console.log("when button entered",that.isRegistered);
        }
      } catch (error) {
        console.error(error);
      }
    },
    isUserRegistered() {
      const { user_id } = this.$store.state;
      console.log("user_id", user_id);
      if (!user_id || !this.club.userList) return false;
      const userList = JSON.parse(this.club.userList);
      console.log("userlist", userList);
      return userList.some(u => u.user_id == user_id);
    }
  }
};


</script>
  
  