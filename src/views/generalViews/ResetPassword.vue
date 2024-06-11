<template>
    <div class="container">
      <Header :title="`Reset Password`" />
      <p class="resetp">Below you can enter the email of the account you want to reset the password</p>
      <p class="resetp">Then a new password and then you repeat the password</p>
      <form @submit.prevent="submitForm">
        <label class="label">New Password:</label>
        <input id="login-input" type="password" v-model="newPassword" required>
        <br>
        <label class="label">Confirm Password:</label>
        <input id="login-input" type="password" v-model="confirmPassword" required>
        <br>
        <button id="login-button" type="submit">Reset Password</button>
      </form>
      <div v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
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
        newPassword: '',
        confirmPassword: '',
        message: '',
        isSuccess: false,
      };
    },
    methods: {
      async submitForm() {
        let email = localStorage.getItem('email');
        const queryParams = new URLSearchParams(window.location.search);
        const request = {
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
          email: email,
          token : queryParams.get('token')
        };

        if (this.newPassword !== this.confirmPassword) {
         
         this.message = 'Passwords do not match';
         this.isSuccess = false;
         return;
       }
        
        try {
          const response = await axios.post('http://localhost:8080/reset-password', request);
          if (response.status === 200) {
            this.message = 'Password reset successfully';
            this.isSuccess = true;
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            this.message = 'Passwords do not match';
            this.isSuccess = false;
          } else {
            this.message = 'An error occurred. Please try again later.';
            this.isSuccess = false;
          }
        }
      },
    },
  };
  </script>
  
  <style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.reset-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
}

.label {
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
}

#login-input {
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
}

#login-button {
  background-color: #6f00ff;
  color: #fff;
  text-align: center;
  width: 100%;
  padding: 10px;
  border: 1px solid #6f00ff;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

#login-button:hover {
  background-color: #5e00d1;
}

.success {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}

.error {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}

.resetp {
  color: white;
  font-weight: 300;
  text-align: center;
  margin-bottom: 20px;
}
</style>
  