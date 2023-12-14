<template>
  <div class="login-container">
    <div class="header">
      <h2 @click="$router.push('/')">Student</h2>
      <div class="club-info">
        <h3>Club</h3>
        <h3>UAG17</h3>
      </div> 
    </div>

    <div class="content-container">
      <h1 style="text-align: center;" v-if="!loginSuccess">{{ activeTab }}</h1>
      <h1 style="text-align: center;" v-else>Login Success, Redirecting to Home</h1>

      <div class="tabs-container" v-if="!loginSuccess">
        <button class="tab" v-if="activeTab === 'login'" :class="{ active: activeTab === 'login' }"
          @click="setActiveTab('login')">Login</button>
        <button class="tab" v-if="activeTab !== 'login' && !loginSuccess" @click="setActiveTab('login')">Login</button>
        <button class="tab" v-if="activeTab === 'signup' && !loginSuccess"
          :class="{ active: activeTab === 'signup' }">Sign Up</button>
        <button class="tab" v-if="activeTab !== 'signup' && !loginSuccess" @click="setActiveTab('signup')">Sign Up</button>
        <button class="tab" v-if="activeTab === 'forget' && !loginSuccess"
          :class="{ active: activeTab === 'forget' }">Forget Password</button>
        <button class="tab" v-if="activeTab !== 'forget' && !loginSuccess" @click="setActiveTab('forget')">Forget Password</button>

      </div>

      <div class="form-container" v-if="!loginSuccess">
        <form class="form">
          <input v-if="activeTab === 'login'" type="text" class="input" :class="{ active: usernameFocused }"
            @focus="usernameFocused = true" @blur="usernameFocused = false" v-model="login.username"
            placeholder="Username" />
          <input v-if="activeTab === 'login'" type="password" class="input" :class="{ active: passwordFocused }"
            @focus="passwordFocused = true" @blur="passwordFocused = false" v-model="login.password"
            placeholder="Password" />
          <button v-if="activeTab === 'login'" class="submit" @click="handleLogin">Submit</button>

          <div v-if="activeTab === 'signup'">
            <input type="text" class="input" :class="{ active: usernameFocused }" @focus="usernameFocused = true"
              @blur="usernameFocused = false" v-model="signup.username" placeholder="Username" />
            <input type="email" class="input" :class="{ active: emailFocused }" @focus="emailFocused = true"
              @blur="emailFocused = false" v-model="signup.email" placeholder="Email" />
            <input type="password" class="input" :class="{ active: passwordFocused }" @focus="passwordFocused = true"
              @blur="passwordFocused = false" v-model="signup.password" placeholder="Password" />
            <input type="text" class="input" :class="{ active: nicknameFocused }" @focus="nicknameFocused = true"
              @blur="nicknameFocused = false" v-model="signup.nickname" placeholder="Nickname" />
            <button class="submit" @click="handleSignup">Submit</button>
          </div>
          <div v-if="activeTab === 'forget'">
            <input type="text" class="input" :class="{ active: E_mailFocused }" @focus="E_mailFocused = true"
              @blur="E_mailFocused = false" v-model="E_mail" placeholder="E-mail" />
              <button class="primary" @click="handleE_mailSent" v-if="CodeSent===false" >Send</button>
              <button class="primary"  v-if="CodeSent===true" disabled >Sent</button>
            <input type="text" class="input" :class="{ active: CodeFocused }" @focus="CodeFocused = true"
              @blur="CodeFocused = false" v-model="Code" placeholder="Code" />
            <button v-if="!reset" class="submit" @click="handleForget">Submit</button>
            <input  v-if="reset" type="password" class="input" :class="{ active: CodeFocused }" @focus="CodeFocused = true"
              @blur="CodeFocused = false" v-model="Forget_password" placeholder="PASSWORD" />
              <input  v-if="reset" type="password" class="input" :class="{ active: CodeFocused }" @focus="CodeFocused = true"
              @blur="CodeFocused = false" v-model="Forget_repassword" placeholder="RE-PASSWORD" />
              <button  v-if="reset" class="submit" @click="ForgetSubmit">Submit</button>
          </div>
        </form>
        <p style="color: red;" v-if="error">{{ error }}</p>
        <div class="forgot-password">
          <a v-if="activeTab === 'login'" @click="setActiveTab('forget')">Forgot Password?</a>
        </div>

      </div>
    </div>
  </div>
</template>


<style>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header { 
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #F5F5F5;
  border-bottom: 1px solid #E0E0E0;
}

.club-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.tabs-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.tab {
  border: none;
  background-color: transparent;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
  outline: none;
  color: #999;
}

.tab.active {
  color: #000;
  font-weight: bold;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
}

.input {
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #AAA;
  outline: none;
}

.input.active {
  border-bottom: 1px solid #000;
}

.submit {
  width: 300px;
  padding: 10px;
  margin: 20px 0;
  font-size: 18px;
  border: none;
  background-color: #000;
  color: #FFF;
  cursor: pointer;
  outline: none;
}

p {
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
}

p.error {
  color: red;
}
.primary {
  background-color:black;
  color:white;
  font-size: 20px;
  border-radius: 20%;
}
</style>


<script>
import axios from 'axios'
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSuccess: false,
      Code:"",
      CodeFocused:false,
      CodeSent:false,
      Forget_validate:false,
      Forget_password:"",
      Forget_repassword:"",
      reset:false,
      E_mail:"",
      E_mailFocused:false,
      activeTab: 'login',
      usernameFocused: false,
      emailFocused: false,
      passwordFocused: false,
      nicknameFocused: false,
      login: {
        username: '',
        password: ''
      },
      signup: {
        username: '',
        email: '',
        password: '',
        nickname: ''
      },
      error: null
    }
  },
  methods: {
    setActiveTab(tab) {
      if (this.activeTab !== tab) {
        this.usernameFocused = false;
        this.emailFocused = false;
        this.passwordFocused = false;
        this.nicknameFocused = false;
        this.login.username = '';
        this.login.password = '';
        this.signup.username = '';
        this.signup.email = '';
        this.signup.password = '';
        this.signup.nickname = '';
        this.Forget_validate=false,
        this.Forget_password="",
        this.error = null;
      }
      this.activeTab = tab;
    },
    async handleE_mailSent() {
      console.log(1)
      this.CodeSent = true;
      const response = await this.$axios.post('http://localhost:3000/api/handleE_mailSent', {
        E_mail: this.E_mail,
      });
      console.log(response)

      setTimeout(() => {
        this.CodeSent = false;
      }, 30000);
    },
    async handleForget() {
      console.log(2)
      try {
        const response = await axios.post('http://127.0.0.1:3001/api/mail_validated', {
          E_mail: this.E_mail,
          Code: this.Code
        });
        console.log(response)
        if (response.status == 200) {
          this.reset = true;
        }
      }
      catch (e) {
        alert(e.message)
      }
    },
    async ForgetSubmit() {
      if (this.Forget_password != this.Forget_repassword) {
        throw new Error("password incorrect");
      }
      const response = await this.$axios.post('http://localhost:3000/api/forgetSubmit', {
        E_mail: this.E_mail,
        Code: this.Code,
        password: this.Forget_repassword
      });
      console.log(response)
      if (response.status == 200) {
        this.reset = false;
        this.Forget_validate=false;
        this.Forget_password="";
      }
    },
    async handleLogin() {
      try {
        const response = await this.$axios.post('http://localhost:3000/api/login', {
          username: this.login.username,
          password: this.login.password,
        });
        const data = response.data;
        if (data.success) {
          alert(data.message);
          console.log(data);
          this.$store.dispatch('setAuthentication', true);
          this.$store.dispatch('setPermission', data.data.permission);
          this.$store.dispatch('setUsername', data.data);
          this.loginSuccess = true;
          setTimeout(() => {
            this.$router.push('/');
          }, 3000);

        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error(err);
        alert('Server Error');
      }
    },
    async handleSignup() {
      try {
        // 通过邮箱验证
        const emailRegex = /^[\w-]+(.[\w-]+)*@([\w-]+.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(this.signup.email)) {
          throw new Error('Invalid email address.');
        }

        // 向服务器发送注册请求
        const response = await this.$axios.post('http://localhost:5050/api/signup', {
          username: this.signup.username,
          email: this.signup.email,
          password: this.signup.password,
          nickname: this.signup.nickname
        });
        
        const data = response.data;
        console.log(data)
        if (data.success) {
          this.activeTab = 'login';
          alert(data.message);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error(err);
        this.error = err.message;
      }
    }


  }
};
</script>

