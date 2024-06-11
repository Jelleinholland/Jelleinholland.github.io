<template>
  <Header title="Creating a new Account" />
  <div class="create-account">
    <form id="account-form" @submit.prevent="createAccount">
      <h2 id="account-create-form-h2">Account Details</h2>
      <div class="form-group">
        <label class="custom-label" for="Name">Account Name:</label>
        <input type="text" id="Name" v-model="user.Name" class="custom-textbox" required />
      </div>
      <div class="form-group">
        <label class="custom-label" for="Type">This is a Savings Account:</label>
        <input type="checkbox" id="Type" v-model="user.Type" class="custom-checkbox" />
      </div>
      <div class="form-group">
        <label class="custom-label" for="MinBal">Minimum Balance Required:</label>
        <input type="number" id="MinBal" v-model="user.MinBal" class="custom-textbox" required />
      </div>
      <button id="create-button" type="submit">Create Account</button>
    </form>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from 'axios';
import router from '@/router'

export default {
  name: "CreateAccount",
  components: {
    Header
  },
  data() {
    return {
      user: {
        UserID: this.$route.params.userId,
        Name: "",
        Type: false,
        MinBal: 0
      }
    };
  },
  methods: {
    createAccount() {
      const createAccountDTO = {
        UserID: this.$route.params.userId,
        Name: this.user.Name,
        Type: this.user.Type ? "Savings" : "Current",
        MinBal: this.user.MinBal
      };

      const token = sessionStorage.getItem('token');

      axios
          .post('http://localhost:8080/accounts', createAccountDTO, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            console.log('Account created:', response.data);
            router.push(`/accounts/user/${this.$route.params.userId}/accounts`);
          })
          .catch(error => {
            console.error('Error creating account:', error.response.data);
          });
    }
  }
};
</script>


<style scoped>
.create-account {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

#account-create-form-h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #ffffff;
}

#account-form {
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

.form-group {
  margin-bottom: 20px; /* Increase the margin value to add more spacing */
}

.custom-label {
  font-weight: bold;
  font-family: "Your Custom Font", sans-serif; /* Replace "Your Custom Font" with your desired font */
}

.custom-textbox {
  width: 100%;
  padding: 12px; /* Increase the padding value to make the text larger */
  font-size: 18px; /* Increase the font-size value to make the text larger */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 8px; /* Add margin-top for spacing */
}

.custom-checkbox {
  transform: scale(1.5); /* Adjust the scale value as per your desired size */
  margin-left: 10px; /* Adjust the margin value as per your desired spacing */
}

#create-button {
  margin-top: 10px; /* Increase the margin-top value to add more spacing */
  background-color: #6f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#create-button:hover {
  background-color: #6f00ffb6;
}
</style>