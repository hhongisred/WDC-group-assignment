<template>
    <div class="club-create">
      <h1>Create a New Club</h1>
      <form @submit.prevent="createClub">
        <label>Club Name:
          <input type="text" v-model="clubName">
        </label>
        <br>
        <label>Description:
          <textarea v-model="clubDesc"></textarea>
        </label>
        <br>
        <label>Logo Image:
          <input type="file" @change="handleFileUpload">
          <div class="image-preview" v-if="imageUrl">
            <img :src="imageUrl">
          </div>
        </label>
        <br>
        <button type="submit" :disabled="isCreating">Create Club</button>
      </form>
      <div v-if="isCreating" class="loading">Creating club...</div>
      <div v-if="showSuccess" class="success-msg">Club created successfully!</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ClubCreate',
    data() {
      return {
        clubName: '',
        clubDesc: '',
        selectedFile: null,
        imageUrl: '',
        isCreating: false,
        showSuccess: false
      };
    },
    methods: {
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
      createClub() {
        const data = {
          name: this.clubName,
          description: this.clubDesc,
          logo: this.imageUrl
        };
        
        this.isCreating = true; // 显示loading提示
        axios.post('http://127.0.0.1:3000/api/clubs', data)
        .then(response => {
          console.log(response.data);
          this.clubName = ''; // 清空表单输入框内容
          this.clubDesc = '';
          this.selectedFile = null;
          this.imageUrl = '';
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
  