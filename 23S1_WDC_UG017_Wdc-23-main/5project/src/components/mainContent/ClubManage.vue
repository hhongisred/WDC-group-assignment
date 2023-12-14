<template>
    <div>
        <h2>Club Management</h2>
        <ul>
            <li v-for="club in clubs" :key="club.club_id">
                <strong>clubname:{{ club.club_name }}</strong>
                club_id:{{ club.club_id }}
                members:{{ club.userList!=NULL?JSON.parse(club.userList).length:0 }}
                <button @click="deleteClub(club.club_id)">Delete</button>
            </li>
        </ul>
    </div>
</template>
  
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
    data() {
        return {
            clubs: [],
        };
    },
    computed: {
        ...mapState({
            isAuthenticated: state => state.isAuthenticated,
            username: state => state.username,
            Permission: state => state.Permission,
            user_id: state => state.user_id,
        })
    },
    mounted() {
        this.fetchClubs();

    },
    methods: {
        /*       async fetchClubs() {
                try {
                  const response = await axios.post('http://127.0.0.1:3000/api/iterAdminClubs', { user_id: this.user_id });
                  this.clubs = response.data;
                  console.log(this.clubs)
                } catch (error) {
                  console.error(error);
                }
              },
         */

        async fetchClubs() {
            try {
                const response = await axios.post('http://127.0.0.1:3000/api/iter_clubs');
                this.clubs = response.data;
                console.log(this.clubs)
            } catch (error) {
                console.error(error);
            }
        },
        async deleteClub(clubId) {
            if (!window.confirm('Are you sure you want to delete this club?')) {
                return;
            }

            try {
                await axios.post('http://127.0.0.1:3000/api/deleteClub', { club_id: clubId });
                this.clubs = this.clubs.filter(club => club.club_id !== clubId);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>
<style>
  /* 父容器设置为 Flexbox 布局 */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center; /* 在主轴方向（垂直方向）居中对齐 */
  }

  h2 {
    margin-top: 0; /* 去除默认的顶部边距 */
  }

  ul {
    list-style: none; /* 去除列表样式 */
    padding: 0; /* 去除内部间距 */
    margin-bottom: 1rem; /* 底部留出一段间距 */
    width: 100%; /* 设置宽度为 100% */
  }

  li {
    display: flex;
    justify-content: space-between; /* 在主轴方向（水平方向）等分对齐 */
    align-items: center; /* 在交叉轴方向（垂直方向）居中对齐 */
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  button {
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
  }
</style>