<template>
  <div>
    <Header :title="`Edit Account: ${account.IBAN}`" />
    <div class="container">
      <div class="content">
        <div class="account-info">
          <div id="bank-logo-account-put">
            <img src="/src/assets/images/logo-redbank.png" alt="Red Bank Logo" />
          </div>
          <div class="account-details">
            <div class="form-group">
              <label for="Name">Name:</label>
              <input
                  v-model="account.Name"
                  type="text"
                  id="Name"
                  class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="Balance">Balance:</label>
              <input
                  v-model="account.Balance"
                  type="number"
                  id="Balance"
                  class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="MinBal">MinBal:</label>
              <input v-model="account.MinBal" type="number" id="MinBal" class="form-control" />
            </div>
            <div class="form-group">
              <label for="Active">Active:</label>
              <input type="checkbox" id="Active" v-model="account.Active" class="custom-checkbox" />
            </div>
          </div>
          <button @click="closeAccount" class="update-btn" id="accounts-cancel-button" type="submit">Close account</button>

          <div class="accounts-put-buttons">
            <button @click="updateAccount" class="update-btn" id="accounts-update-button" type="submit">Update Account</button>
            <button @click="cancelUpdate" class="update-btn" id="accounts-cancel-button" type="submit">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";

export default {
  name: "EditAccount",
  components: {
    Header,
  },
  data() {
    return {
      accountID: this.$route.params.accountId,
      account: {},
    };
  },
  methods: {
    fetchAccount() {
      const url = `http://localhost:8080/accounts/${this.accountID}`;

      const token = sessionStorage.getItem('token');

      axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.account = response.data;
            this.fetchTransactions();
          })
          .catch(error => {
            console.error("Error retrieving account:", error);
          });
    },
    updateAccount() {
      const accountID = this.accountID;
      const url = `http://localhost:8080/accounts/${accountID}`;

      const updateAccountDTO = {
        Name: this.account.Name,
        Balance: this.account.Balance,
        MinBal: this.account.MinBal,
        Active: this.account.Active
      };

      const token = sessionStorage.getItem('token');

      axios
          .put(url, updateAccountDTO, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((response) => {
            console.log("User updated successfully:", response.data);
            this.$router.push(`/accounts/${this.account.AccountID}`);
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
    },
    cancelUpdate() {
      this.$router.push(`/accounts/${this.account.AccountID}`);
    },
    closeAccount() {
        const url = `http://localhost:8080/accounts/${this.accountID}`; // replace with your actual server URL
        const token = sessionStorage.getItem('token');
        axios.delete(url, {
          headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Account closed successfully');
        })
        .catch(error => {
            console.error(`Error closing account: ${error}`);
        });
    }

  },
  mounted() {
    this.fetchAccount();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.account-info {
  display: grid;
  align-items: center;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

#bank-logo-account-put {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

#bank-logo-account-put img {
  margin-left: 200px;
  margin-right: 200px;
  width: 200px;
  height: 200px;
}

.account-details {
  display: grid;
  grid-template-columns: 1fr;
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

.custom-checkbox {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-top: 3px;
}

.accounts-put-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.update-btn {
  display: inline-block;
  position: relative;
  background-color: #6f00ff;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  width: 70%;
  padding: 5px;
}

.update-btn:hover,
.update-btn:active {
  background-color: #6f00ffbb;
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

#accounts-cancel-button {
  margin-left: 5%;
  background-color: #ff0000;
}

#accounts-cancel-button:hover {
  background-color: #ff000094;
}
</style>