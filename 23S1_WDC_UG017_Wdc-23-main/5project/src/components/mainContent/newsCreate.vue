<template>
  <div class="club-create">
    <h1>News Submit</h1>
    <div class="form-group">
      <label for="club">Club:</label>
      <select class="form-control" id="club" v-model="club">
        <option value="">-- Select Club --</option>
        <option v-for="club in clubs" :key="club.club_id" :value="club.club_id">{{ club.club_name }},clubid:{{ club.club_id
        }}</option>
      </select>
    </div>
    <form @submit.prevent="newsSubmit">
      <label>Title:
        <input type="text" v-model="title">
      </label>
      <br>
      <label>Contennt:
        <textarea v-model="content"></textarea>
      </label>
      <br>
      <label>Image:
        <input type="file" @change="handleFileUpload">
        <div class="image-preview" v-if="imageUrl">
          <img :src="imageUrl">
        </div>
      </label>
      <br>
      <button type="submit" :disabled="isCreating">news Submit</button>
    </form>
    <div v-if="isCreating" class="loading">news Submitting...</div>
    <div v-if="showSuccess" class="success-msg">news Submited successfully!</div>
  </div>
</template>
  
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'ClubCreate',
  data() {
    return {
      title: '',
      content: '',
      selectedFile: null,
      imageUrl: '',
      club: "",
      isCreating: false,
      showSuccess: false,
      clubs: []
    };
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
        const apiUrl = 'http://localhost:3000/api';
        const response = await axios.post(`${apiUrl}/managed_clubs`, { user_id: this.user_id });
        this.clubs = response.data;
      } catch (error) {
        console.error('Error fetching clubs:', error);
        alert('Failed to fetch clubs.');
      }
    },
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
      this.uploadImage();
    },
    uploadImage() {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);

      axios.post('http://127.0.0.1:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response.data);
          this.imageUrl = response.data.imageUrl;
        })
        .catch(error => {
          console.log(error);
        });
    },
    newsSubmit() {
      const data = {
        title: this.title,
        content: this.content,
        imageSrc: this.imageUrl,
        user_id: this.user_id,
        club_id: this.club,
        time: new Date().toLocaleDateString()
      };

      this.isCreating = true; // 显示loading提示
      axios.post('http://127.0.0.1:3000/api/newsSubmit', data)
        .then(response => {
          console.log(response.data);
          this.title = ''; // 清空表单输入框内容
          this.content = '';
          this.selectedFile = null;
          this.imageSrc = '';
          this.club = "";
          this.isCreating = false; // 隐藏loading提示
          this.showSuccess = true; // 显示添加成功的提示
        })
        .catch(error => {
          console.log(error);
          this.isCreating = false; // 隐藏loading提示
        });
    }
  }
};
</script>
  
<style scoped>
.club-create {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #f5f5f5;
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.club-create h1 {
  font-size: 36px;
  margin-bottom: 20px;
}

.club-create form label {
  display: block;
  margin-bottom: 10px;
}

.club-create form textarea {
  width: 100%;
  height: 100px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.club-create form input[type="text"],
.club-create form input[type="file"] {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.club-create .image-preview {
  margin-top: 10px;
  border-radius: 5px;
  overflow: hidden;
}

.club-create .image-preview img {
  display: block;
  max-width: 100%;
  height: auto;
}

.club-create button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.club-create .loading {
  font-size: 18px;
  margin-top: 20px;
}

.club-create .success-msg {
  font-size: 18px;
  margin-top: 20px;
  background-color: green;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
}
</style>
  