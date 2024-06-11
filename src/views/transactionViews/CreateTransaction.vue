<template>
  <div>
    <Header :title="`Make a transfer`" />
    <div class="create-transaction">
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="createTransaction">
        <div class="form-group">
          <label for="transaction-type">Transaction Type:</label>
          <select id="transaction-type" v-model="type" @change="updateFieldsVisibility">
            <option value="Transfer">Transfer</option>
          </select>
        </div>
        <div class="form-group" v-if="showFromIBANField">
          <label for="fromIBAN">From account:</label>
          <input type="string" id="fromIBAN" v-model="transaction.fromIBAN" required />
        </div>
        <div class="form-group" v-if="showToIBANField">
          <label for="toIBAN">To account:</label>
          <input type="text" id="toIBAN" :disabled="!showFromIBANField" v-model="transaction.toIBAN" required />
        </div>
        <div class="form-group">
          <label for="amount">Amount:</label>
          <input type="number" min="0.00" vue-number-format id="amount" v-model="transaction.amount"
            required />
        </div>
        <div class="form-group">
          <label for="description">Description:</label>
          <input type="string" id="description" v-model="transaction.description" required />
        </div>
        <button id="create-button" type="submit">Transfer</button>
        <button class="account-info-button-createTransaction" @click="goToATM">Or go to ATM</button>
      </form>
      </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";
import router from "@/router";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "CreateTransaction",
  components: {
    Header,
  },
  data() {
    return {
      errorMessage: null,
      account: {},
      accountID: this.$route.params.accountId,
      showToIBANField: true,
      showFromIBANField: true,
      type: "Transfer",
      transaction: {
        fromIBAN: "",
        toIBAN: "",
        amount: null,
        description: "",
      },
      isAdmin: false,
    };
  },
  methods: {
    fetchAccount() {
      const url = `http://localhost:8080/accounts/${this.accountID}`;

      const token = sessionStorage.getItem("token");

      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.account = response.data;
          //this.transaction.fromIBAN = response.data.IBAN;
          this.account.isActive = response.data.Active;
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          console.error("Error retrieving account:", error);
        });
    },
    createTransaction() {
      if (!this.account.isActive) {
      this.errorMessage = 'Cannot create transaction: account is inactive';
      return;
      }
      const url = `http://localhost:8080/transactions`;

      const token = sessionStorage.getItem("token");

      const createTransactionDTO = {
        fromIBAN: this.transaction.fromIBAN,
        toIBAN: this.transaction.toIBAN,
        amount: this.transaction.amount,
        transactionType: this.type,
        description: this.transaction.description,
      };

      axios
        .post(url, createTransactionDTO, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Transaction created:", response.data);
          router.push(`/accounts/${this.accountID}`);
        })
        .catch((error) => {
          this.errorMessage = error.response.data.message;
          console.error("Error retrieving account:", error);
        });
    },
    goToATM() {
      router.push(`/atm/${this.accountID}`);
    },
  },
  mounted() {
    this.fetchAccount();

    let token = sessionStorage.getItem("token");
    try {
      const decodedToken = VueJwtDecode.decode(token);
      const hasEmployeeRole = decodedToken.auth.some(
        (auth) => auth.role === "ROLE_EMPLOYEE"
      );

      if (hasEmployeeRole) {
        this.isAdmin = true;
      }
    } catch (err) {
      this.errorMessage = "Something went wrong. Please try again later.";
      console.log("Token is null: ", err);
    }
  },
};
</script>
<style scoped>
.create-transaction {
  max-width: 400px;
  margin: 0 auto;
}

.error-message {
  background-color: red;
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-group button {
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}
</style>
