<template>
  <div class="container-fluid bg-light" style="margin-left: -20px">
    <div class="row justify-content-start pt-5 mb-3">
      <div class="col-md-8 col-lg-6">
        <h1 class="text-center text-black font-weight-bold display-4">My Account</h1>
      </div>
    </div>

    <div class="row justify-content-start mb-5">
      <div class="col-md-8 col-lg-6">
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <label for="nickname" class="font-weight-bold">Nickname</label>
            <input type="text" class="form-control" id="nickname" v-model="localNickname">
          </div>
          <div class="form-group">
            <label for="E_mail" class="font-weight-bold">E-mail</label>
            <input type="text" class="form-control" id="E_mail" v-model="E_mail">
          </div>
          <div class="form-group">
            <label for="description" class="font-weight-bold">Description</label>
            <textarea class="form-control" id="description" rows="3" v-model="localDescription"></textarea>
          </div>
          <div class="form-group">
            <label>Avatar:
              <input type="file" @change="handleFileUpload">
              <div class="image-preview" v-if="imageUrl">
                <img :src="imageUrl">
              </div>
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="checkbox1">
            <label class="form-check-label" for="checkbox1">
              Event notificed by e-mail
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="checkbox2">
            <label class="form-check-label" for="checkbox2">
              News notificed by e-mail
            </label>
          </div>

          <button type="submit" class="btn btn-primary" style="margin-top:10px">Save Changes</button>
        </form>
      </div>
    </div>

    <!--     <div v-else class="row justify-content-center mb-5">
      <div class="col-md-8 col-lg-6">
        <p class="text-center text-black font-weight-bold h4">Loading ...</p>
      </div>
    </div>
 -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  name: 'MyAccount',

  data() {
    return {
      localNickname: '',
      localDescription: '',
      E_mail:"",
      selectedFile: null,
      imageUrl: '',

    };
  },

  async mounted() {
    this.localNickname = this.nickname;
    this.localDescription = this.description;
    if (!this.$store.state.isAuthenticated) {
      alert("please login")
      this.$router.push('/')
    }

  },

  computed: {
    ...mapState({
      isAuthenticated: state => state.isAuthenticated,
      username: state => state.username,
      Permission: state => state.Permission,
      user_id: state => state.user_id,
      nickname: state => state.nickname,
      description: state => state.description
    })
  },

  methods: {
    async updateUser() {
      try {
        const apiUrl = 'http://localhost:3000/api';
        const response = await axios.post(`${apiUrl}/updateAccount`, {
          user_id: this.user_id,
          nickname: this.localNickname,
          description: this.localDescription,
          E_mail:this.E_mail,
          avatar:this.imageUrl
        });
        console.log(response.data);
        alert('User updated successfully.');
      } catch (error) {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
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
    }
  }
};
</script>

  
<style scoped>
.container-fluid {
  background-color: #f8f9fa;
}
</style>
  