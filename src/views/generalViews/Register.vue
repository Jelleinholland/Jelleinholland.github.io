
<template>
    <div>
        <div>
    <Header :title="`Reset Password`" />
    <form @submit.prevent="register">
      <div class="formItem">
        <label class="label" for="email">Email:</label>
        <input type="text" id="email" v-model="email" required>
      </div>
      <div class="formItem">
        <label class="label" for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <div class="formItem">
        <label class="label" for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
      </div>
      <div class="formItem">
        <label class="label" for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="firstName" required>
      </div>
      <div class="formItem">
        <label class="label" for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="lastName" required>
      </div>
      <div class="formItem">
        <button class="button" type="submit">Register</button>
      </div>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from 'axios';
export default {
    name: "Register",
    components: {
    Header,
  },
    data() {
        return {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        errorMessage: ''
    };
    },
    methods: {
        async register() {
            if (this.password !== this.confirmPassword) {
                this.errorMessage = "Passwords do not match";
                return;
            }

            try {
                const response = await axios.post('http://localhost:8080/register', {
                    email: this.email,
                    newPassword: this.password,
                    confirmPassword: this.confirmPassword,
                    firstname: this.firstName,
                    lastname: this.lastName
                });

                if (response.status === 200) { 
                    this.errorMessage = 'Registration successful';
                    console.log('Registration successful');
                } else {
                    // Registration failed, handle the error as needed
                    this.errorMessage = 'Registration failed';
                    console.log('Registration failed');
                }
            } catch (error) {
                // Handle any network or server errors
                this.errorMessage = 'An error occurred';
                console.error('An error occurred:', error);
            }
        }
    }
};
</script>

<style scoped>
/* Add your custom styles here */
/* .formItem {
    padding: 1rem;
 
} */
.button{
background-color: #6f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.title{
    display: flex;
            align-items: center;
            margin-bottom: 15px;
            justify-content: center;
}
.formItem {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }

        .formItem label {
            flex: 0 0 150px; /* Adjust this width as needed */
            margin-right: 10px;
            text-align: right;
        }

        .formItem input {
            flex: 1;
            padding: 8px;
            border-radius: 4px;
        }

        .formItem input:focus {
            border-color: #66afe9;
            outline: none;
            box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
        }

        form {
            max-width: 500px;
            margin: auto;
            padding: 20px;
            border-radius: 8px;
        }
</style>