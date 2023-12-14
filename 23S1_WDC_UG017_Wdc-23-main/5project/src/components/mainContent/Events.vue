<template>
  <div class="container d-flex flex-column align-items-center">
    <h1 class="mb-5">Upcoming Events</h1>
    <div class="row">
      <div>
        <button
          v-if="Permission === 'club_manager'"
          type="button"
          class="btn btn-lg btn-primary px-5 py-3 mb-4"
          @click="createEvent"
        >
          Create Event
        </button>
        <div class="accordion overflow-auto" id="eventsAccordion" style="max-height: 60vh;">
          <div v-for="(event, index) in events" :key="index" class="accordion-item">
            <h2 class="accordion-header" :id="'heading' + (index + 1)">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + (index + 1)"
                aria-expanded="false"
                :aria-controls="'collapse' + (index + 1)"
                @click="toggleCollapse(index + 1)"
                style="font-weight: bold; font-size: 1.2rem;"
              >
                {{ event.time }} --------- {{ event.location }}
              </button>
            </h2>
            <div
              :id="'collapse' + (index + 1)"
              class="accordion-collapse collapse"
              :aria-labelledby="'heading' + (index + 1)"
              data-bs-parent="#eventsAccordion"
            >
              <div class="accordion-body" style="font-size: 1.1rem;">
                <p>clubid:{{ event.club_id }}</p>
                <p>content:{{ event.content }}</p>
                <div>
                  <strong>ClubSubmit:</strong>
                  <div
                  >
                  clubSubmitted:{{ event.clubSubmitted }}
                  </div>
                </div>

                <div v-if="Permission=='club_manager'&&event.participated_users.length !== 0">
                  <strong>participate List</strong>
                  <div
                    v-for="user in JSON.parse(event.participated_users ? event.participated_users : [''])"
                    :key="user.user_id"
                  >
                    {{ user.nickname }}
                  </div>
                </div>
                <button
                  :disabled="!event.participated"
                  type="button"
                  @click="JoinEvent(event)"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex';
import axios from 'axios';

export default {
  name: 'EventsPage',
  async mounted() {
/*     if(!this.$store.state.isAuthenticated){
     alert("please login")
     this.$router.push('/') 
    } */
    const apiUrl = 'http://127.0.0.1:3001/api';
    console.log(this.Permission)
    if(this.Permission)
    {
      axios.post(`${apiUrl}/my_clubs`, { user_id: this.user_id })
      .then(response => {
        const participatedClubs = response.data;
        console.log(participatedClubs); 
        const promises = participatedClubs.map(club => {
          console.log(club)
          return axios.post(`${apiUrl}/my_events`, { club_id: club.club_id });
        });

        Promise.all(promises)
          .then(responses => {
            const events = responses.filter(response => response.data.length !== 0).map(response => response.data[0]);
            console.log(events); 
            this.events = events;
          })
          .catch(error => {
            console.error('Error fetching events:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching participated clubs:', error);
        });
        this.events.forEach((event) => {
      event.participated_users = JSON.parse(event.participated_users);
      Object.defineProperty(event, "participated", {
        value: event.participated_users.some(u => u.user_id === this.user_id),
        writable: true,
        enumerable: true,
        configurable: true
      });
      console.log(event)
    });

    }
    else {
      let events = await axios.post(`${apiUrl}/my_events`, { club_id: null });
      console.log(events)
      this.events = events.data
    }
    console.log("2222",this.events)
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      user_id: state => state.user_id,
      nickname:state => state.nickname
    })
  },
  data() {
    return {
      events: []
    }
  },
  methods: {
    toggleCollapse(id) {
      const collapseEl = document.getElementById(`collapse${id}`);
      const isCollapsed = collapseEl.classList.contains('show');
      if (isCollapsed) {
        collapseEl.classList.remove('show');
      } else {
        collapseEl.classList.add('show');
      }
    },
    createEvent() {
      this.$router.push('/eventSubmit');
    },
    async JoinEvent(e) {
      try {
        console.log(e)
        e["participated"] = true;
        const apiUrl = 'http://localhost:3000/api';
        let response = await axios.post(`${apiUrl}/joinEvents`, { user_id: this.user_id ,nickname:this.nickname,event_id:e.event_id});
        console.log(response)
      } catch (error) {
        console.error('Error fetching clubs:', error);
        alert('Failed to fetch clubs.');
      }

    }

  },
}
</script>

<style>
button.btn-primary {
  width: 100%;
}
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; /* 将子元素沿主轴左对齐 */
}
.accordion {
  width: 100%;
}

.overflow-auto::-webkit-scrollbar {
  width: 5px;
}
@media (min-width: 768px) {
  button.btn-primary {
    width: auto;
  }
}

.accordion {
  width: 100%;
}

@media (min-width: 768px) {
  .accordion {
    width: auto;
  }
}

.overflow-auto::-webkit-scrollbar {
  width: 5px;
}

</style>