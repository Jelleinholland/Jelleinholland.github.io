<template>
  <div>
    <Header :title="`Edit User: ${user.FirstName} ${user.LastName}`" />
    <div class="container">
      <div class="content">
        <div class="user-info">
          <div class="update-button">
            <button @click="cancelBtn" class="update-btn" id="cancel-btn">
              Cancel
            </button>
          </div>
          <div id="user-avatar">
            <img src="/src/assets/images/logo-redbank.png" alt="Red Bank Logo" />
          </div>
          <div class="user-details">
            <div class="form-group" v-if="userRole === 'ROLE_EMPLOYEE'">
              <label for="first-name">First Name:</label>
              <input v-model="user.FirstName" type="text" id="first-name" class="form-control" />
            </div>
            <div class="form-group" v-if="userRole === 'ROLE_EMPLOYEE'">
              <label for="last-name">Last Name:</label>
              <input v-model="user.LastName" type="text" id="last-name" class="form-control" />
            </div>
            <div class="form-group" v-if="userRole === 'ROLE_EMPLOYEE'">
              <label for="email">Email:</label>
              <input v-model="user.Email" type="email" id="email" class="form-control" />
            </div>
            <div class="form-group" id="form-active" v-if="userRole === 'ROLE_EMPLOYEE'">
              <label for="active">Active:</label>
              <input v-model="user.Active" type="checkbox" id="active-check" class="form-box" />
            </div>
            <div class="form-group" v-if="userRole === 'ROLE_USER' || userRole === 'ROLE_EMPLOYEE'">
              <label for="transaction-limit">Transaction Limit:</label>
              <input v-model="user.TransactionLimit" min="0.00" type="number" id="transaction-limit" class="form-control" />
            </div>
            <div class="form-group" v-if="userRole === 'ROLE_USER' || userRole === 'ROLE_EMPLOYEE'">
              <label for="daily-limit">Daily Limit:</label>
              <input v-model="user.DailyLimit" min="0.00" type="number" id="daily-limit" class="form-control" />
            </div>
          </div>

          <div class="update-button">
            <button id="update-btn" @click="updateUser" class="update-btn">
              Update User
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import VueJwtDecode from 'vue-jwt-decode';
import axios from "axios";

const token = sessionStorage.getItem("token");

export default {
  name: "EditUser",
  components: {
    Header,
  },
  data() {
    return {
      userRole: '',
      
      user: {
        FirstName: "",
        LastName: "",
        Email: "",
        Active: false,
        TransactionLimit: 1000,
        DailyLimit: 250,
      },
    };
  },
  methods: {
    cancelBtn(){
      const userId = this.$route.params.userId;
      if (this.userRole === 'ROLE_USER') {
        this.$router.push(`/users/${this.userID}/personal`);
      } else {
        this.$router.push(`/users/${userId}`);
      }
    },     
    fetchUser() {
      const userId = this.$route.params.userId;
      const url = `http://localhost:8080/users/${userId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Error retrieving user:", error);
        });
    },
    updateUser() {
      const userID = this.$route.params.userId;
      const url = `http://localhost:8080/users/${userID}`;

      const updateUserDTO = {
        firstName: this.user.FirstName,
        lastName: this.user.LastName,
        email: this.user.Email,
        active: this.user.Active,
        transactionLimit: this.user.TransactionLimit,
        dailyLimit: this.user.DailyLimit,
      };

      console.log("Updating user:", updateUserDTO);
      axios
        .put(url, updateUserDTO, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((response) => {
          console.log("User updated successfully:", response.data);
          
        })
        .catch((error) => {
          console.error("Error updating user:", error);
          // Handle error
        });

        if (this.userRole === 'ROLE_USER') {
          this.$router.push(`/users/${userID}/personal`);
        } else {
          this.$router.push(`/users`);
        }
    },
  },
  mounted() {
    this.fetchUser();

    try {
      const decodedToken = VueJwtDecode.decode(token);
      const hasEmployeeRole = decodedToken.auth.some(auth => auth.role === 'ROLE_EMPLOYEE');
      this.userID = decodedToken.sub;

      if (hasEmployeeRole) {
        this.userRole = 'ROLE_EMPLOYEE';
      } else {
        this.userRole = 'ROLE_USER';
      }
    } catch (err) {
      console.log('Token is null: ', err);
    }
  }
};
</script>

<style>
#form-active {
  display: grid;

}

#active-check {
  width: 20px;

  appearance: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: background-color 0.3s, border-color 0.3s;
  background-color: white;
}

#active-check:checked {
  background-color: #6f00ff;
  border-color: #ffffff;
}

.container {
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  flex: 1;
}

.user-info {
  display: grid;
  align-items: center;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

#user-avatar img {
  margin-left: 30%;
  width: 150px;
  height: 150px;
}

.user-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.form-group {
  margin-bottom: 10px;
}

.form-control {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.update-button {
  display: flex;
  margin-top: 10px;

}

.update-btn {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  padding: 5px;
}

.update-btn:hover,
.update-btn:active {
  background-color: transparent;
}

.update-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.update-btn:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

#update-btn {
  margin-left: 35%;
}

#cancel-btn {
  justify-content: left;

  background-color: transparent;
}
</style>
