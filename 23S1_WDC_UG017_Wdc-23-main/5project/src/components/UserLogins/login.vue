<template>
    <div class="login-container">
      <div class="tabs-container">
        <button class="tab" :class="{ active: activeTab === 'login' }" @click="setActiveTab('login')">
          Login
        </button>
        <button class="tab" :class="{ active: activeTab === 'signup' }" @click="setActiveTab('signup')">
          Sign Up
        </button>
      </div>
      <div class="form-container">
        <form class="form">
          <input type="text" class="input" :class="{ active: usernameFocused }" @focus="usernameFocused = true" @blur="usernameFocused = false" placeholder="Username">
          <input type="password" class="input" :class="{ active: passwordFocused }" @focus="passwordFocused = true" @blur="passwordFocused = false" placeholder="Password">
          <button class="submit">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <style scoped>
  .login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .tabs-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  
  .tab {
    background-color: transparent;
    border: none;
    padding: 10px 20px;
    color: #000;
    font-weight: bold;
    font-size: 20px;
    outline: none;
    cursor: pointer;
  }
  
  .tab.active {
    color: #aaa;
  }
  
  .form-container {
    width: 100%;
    max-width: 500px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .input {
    width: 100%;
    margin-bottom: 20px;
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 10px;
    color: #000;
    background-color: transparent;
  }
  
  .input.active {
    background-color: #fff;
    color: #000;
  }
  
  .submit {
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #000;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
  }
  
  .submit:hover {
    background-color: #fff;
    color: #000;
  }
  </style>
  
  <script>
  export default {
    name: 'LoginForm',
    data() {
      return {
        activeTab: 'login',
        usernameFocused: false,
        passwordFocused: false,
      }
    },
    methods: {
      setActiveTab(tab) {
        this.activeTab = tab;
      },
    },
  };
  </script>