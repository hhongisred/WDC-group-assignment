<template>
  <div class="container">
    <div class="club-items" v-if="Permission === 'Admin'">
      <h1>Control Panel</h1>
      <div class="club-list">
        <div v-for="Club in Panel" :key="Club" class="club-item" @click="$router.push(Club.action)">
          <img :src="Club.src" alt="" class="club-logo">
          <p class="club-name">{{ Club.Clubname }}</p>
        </div>
      </div>
    </div>

    <div class="club-items my-club" v-if="Permission === 'student' || Permission === `club_manager`">
      <h1>My Club</h1>

      <div class="club-list">
        <div v-for="Club in Clubs" :key="Club.club_id" class="club-item"
          @click="$router.push({ path: 'ClubDetail', query: { club_id: Club.club_id } })">
          <img :src="Club.logo" alt="" class="club-logo">
          <p class="club-name">ClubName:{{ Club.club_name }}</p>
        </div>
      </div>
      <div class="my-club-buttons" v-if="Permission === 'club_manager'">
        <div class="button-item" @click="$router.push('/clubs')">My Clubs</div>
        <div class="button-item active">Events</div>
        <div class="button-item" @click="$router.push('/members')">Members</div>
        <div class="button-item" @click="$router.push('/RSCV')">RSVP</div>
      </div>
    </div>
    <div class="event-items" v-if="Permission === 'student'||Permission === ''">
      <h1>Upcoming Events</h1>
      <div class="event-list">
        <div v-for="Event in Events" :key="Event.time" class="event-item">
          <div class="event-date">{{ Event.date }}</div>
          <div class="event-content">{{ Event.time }}: {{ Event.content }} location:{{Event.location }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'MemebersPage',
  async mounted() {
    console.log("Permission", this.$store.state.Permission);
    if  (this.$store.state.Permission=="")
    {
      const Events = await axios.post(`http://127.0.0.1:3000/api/my_events`, { club_id: null });
      this.Events = Events.data;
      console.log(this.Events)
      const events = this.Events.filter(response => response.data.length !== 0).map(response => response.data[0]).slice(0, 3);
      this.Events = events
    }
    else
    {
      let response_my_clubs = await axios.post("http://127.0.0.1:3000/api/my_clubs", { user_id: this.user_id })
    console.log(response_my_clubs)
    this.Clubs.push(response_my_clubs.data[0]);
    console.log("3333", this.Clubs)
    axios.post(`http://127.0.0.1:3000/api/my_clubs`, { user_id: this.user_id })
      .then(response => {
        const participatedClubs = response.data;
        console.log(participatedClubs);
        const promises = participatedClubs.map(club => {
          console.log(club)
          return axios.post(`http://127.0.0.1:3000/api/my_events`, { club_id: club.club_id });
        });

        Promise.all(promises)
          .then(responses => {
            const events = responses.filter(response => response.data.length !== 0).map(response => response.data[0]).slice(0, 3);
            console.log(events);
            this.Events = events;
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      })

    }
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
      Clubs: [
/*         {Clubname:"testClub",src:'https://img2.baidu.com/it/u=2681043174,2321931780&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'},
 *//*         {Clubname:"testClub1",src:'https://img2.baidu.com/it/u=2681043174,2321931780&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'},
        {Clubname:"testClub2",src:'https://img2.baidu.com/it/u=2681043174,2321931780&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'},
 */      ],
      Panel: [
        { Clubname: "Manage Users", src: 'https://img2.baidu.com/it/u=2681043174,2321931780&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500', action: "members" },
        { Clubname: "Manage Clubs", src: 'https://img2.baidu.com/it/u=2681043174,2321931780&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500', action: "clubs" },
        { Clubname: "Create Club", src: 'https://img2.baidu.com/it/u=2681043174,2321931780&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500', action: "clubCreate" },
      ],
      Events: [
/*         {
          Date: "25th,May",
          Time: "Monday_6pm",
          content: "Hill riding"
        }, {
          Date: "25th,May",
          Time: "Monday_6pm",
          content: "Hill riding1"
        }, {
          Date: "25th,May",
          Time: "Monday_6pm",
          content: "Hill riding2"
        },
 */      ]
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start; /* 将元素沿主轴左对齐 */
}


.club-logo {
  max-width: 100%;
  /* 图片宽度不超过容器 */
  height: auto;
  /* 高度自适应 */
  object-fit: cover;
  /* 缩放以适应容器 */
  max-height: 200px;
  /* 最大高度为 200px */
}

.club-list {
  display: flex;
  flex-wrap: nowrap;
  /* 去掉换行 */
  overflow-x: auto;
  /* 添加水平滚动条 */
}

.club-name {
  font-size: 30px;
  font-weight: bolder;
}

.club-items,
.event-items {
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.club-items h1,
.event-items h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.left {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.img-container {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}

.button-item {
  background-color: #3498db;
  color: #444444;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 5%;
  margin-right: 10px;
}

.button-item:hover {
  background-color: gray;
}

.right {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  margin-left: 20px;
  flex: 1;
}

.eventList {
  display: flex;
}

.event-Date {
  font-weight: bold;
  margin-right: 10px;
}

.event-content {
  margin-left: 10px;
}</style>

