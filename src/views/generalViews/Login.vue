<template>
  <Header title="Login to your account"></Header>
  <div class="login">
    <div id="login-div">
    <h2 class="h2-login">Credentials</h2>
    <form id="login-form" @submit.prevent="login">
      <input id="login-input" type="email" v-model="email" placeholder="Email" required>
      <input id="login-input" type="password" v-model="password" placeholder="Password" required>
      <button id="login-button" type="submit" :disabled="isLoggedIn">Log in</button>
      
    </form>
    <div v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
      </div>
    <router-link id="forgotpassword" to="/forgot-password">Forgot Password?</router-link>
    <router-link id="register" to="/register">no account?</router-link>
  </div>
  </div>
  <div class="creating-account">
    <h2 id="h2-create">Want to join Red Bank?</h2>
    <p id="p-login">At Red Bank, we are delighted to extend a warm invitation to our customers to create an account at one of our delicious locations and experience the
      vibrant spirit of Red Bank. Just like a candy's burst of flavors, our services are designed to bring joy and
      excitement to your banking journey. With a dash of sweetness and a commitment to exceptional customer service, we
      offer a delightful and personalized experience. Set up an account with Red Bank today and indulge in a banking
      experience that's as enjoyable and satisfying as savoring your favorite Candy.</p>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from 'axios';
import VueJwtDecode from "vue-jwt-decode";
import Navigation from "@/views/generalViews/Navigation.vue";
import eventBus from "@/components/EventBus.vue";
export default {
  name: "Login",
  components: {
    Header
  },
  data() {
    return {
      email: '',
      password: '',
      token: '',
      message: '',
      isSuccess: false,
    };
  },
  computed: {
    isLoggedIn() {
      return this.email === '' || this.password === '';
    },
  },
  methods: {
    login() {
      const url = 'http://localhost:8080/login';

      axios
          .post(url, {
            email: this.email,
            password: this.password,
          })
          .then(response => {
            const token = response.data.token;
            eventBus.emit('LoggedIn');
            //console.log('Login successful:', token);
            this.message = 'Logged in successfully';
            this.isSuccess = true;
            // Store the token in the session storage
            sessionStorage.setItem('token', token);
            try {
              const decodedToken = VueJwtDecode.decode(token);
              const userID = decodedToken.sub;
              // Emit the "login" event
              eventBus.emit('login');              
              this.$router.push(`/accounts/user/${userID}/accounts`);
              sessionStorage.setItem('userID', userID);
            } catch (err) {
              console.log('Token is null: ', err);
            }
            this.loggedIn = true;
          })
          .catch(error => {
            console.error('Error logging in:', error);
            this.message = 'An error occurred. Please try again later.';
            this.isSuccess = false;
            // Handle the login error, such as displaying an error message
          });

    },
  },
};
</script>

<style scoped>
.creating-account {
  text-align: center;
  width: 40%;
  margin-left: 30%;
  margin-top: 5%;
  border: #fff solid 2px;
  border-radius: 20px;
}

#h2-create {
  color: white;
  font-weight: 800;
}

#p-login {
  margin: 2%;
  color: white;
  font-weight: 300;
}
#forgotpassword{
  color: white;
    font-weight: bold;
    text-decoration: none;
}
#register{
  color: white;
    font-weight: bold;
    text-decoration: none;
    margin-left: 1%;
}

.h2-login {
  color: white;
  font-weight: 800;
}

.login {
  max-width: 100%;
  text-align: center;
}
#login-div {
  width: 50%;
  margin-left: 25%;
  margin-top: 5%;

}

#login-form {
  display: flex;
  flex-direction: column;
}

#login-input {
  margin-bottom: 10px;
  width: 50%;
  text-align: center;
  margin-left: 25%;
  border: 1px solid #fff;
  border-radius: 10px;
}

#login-button {
  
  background-color: #6f00ff;
  color: #fff;
  text-align: center;
  width: 50%;
  margin-left: 25%;
  border: 1px solid #6f00ff;
  border-radius: 10px;
  cursor: pointer;
}
.success {
    color: green;
    font-weight: bold;
  }
  
  .error {
    color: white;
    font-weight: bold;
  }
</style>
