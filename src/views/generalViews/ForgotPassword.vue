<template>
  <div class="forgot-password-container">
    <Header :title="`Forgot Password`" />
    <div class="content">
      <p class="resetp">Below you can enter the email of the account you want to reset the password</p>
      <p class="resetp">An email will be sent to the email address if there is an account</p>
      <form @submit.prevent="forgotpasswordform" class="forgot-password-form">
        <label class="loginlabel"  for="email">Email:</label>
        <input class="emailinput" type="email"  v-model="email" required>
        <button  class="submitbutton" type="submit">Submit</button>
      </form>
      <div v-if="message" :class="['message', isSuccess ? 'success' : 'error']">
        {{ message }}
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import Header from "@/views/generalViews/Header.vue";
export default {
  components: {
    Header,
    },
  data() {
    return {
      email: '',
      message: '',
      isSuccess: false,
    }
  },
  methods: {
    forgotpasswordform() {
      const requestBody = {
        email: this.email
      };
      let storageEmail = this.email;
      localStorage.setItem('email', storageEmail);
      axios.post('http://localhost:8080/forgot-password', requestBody)
        .then(response => {
          // Handle the response if needed
          this.message = 'Password reset Mail send successfully';
          this.isSuccess = true;
        })
        .catch(error => {
          // Handle the error if needed
          this.message = 'An error occurred. Please try again later.';
          this.isSuccess = false;
        });
    }
  }
}
</script>
<style scoped>
.forgot-password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
}

.content {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
}

.resetp {
  color: #ffffff;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
}

.forgot-password-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loginlabel {
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 5px;
}

.emailinput {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submitbutton {
  background-color: #6f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submitbutton:hover {
  background-color: #000000;
}

.message {
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  width: 100%;
}

.success {
  background-color: #d4edda;
  color: #155724;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>