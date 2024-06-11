<template>
  <Header :title="`Account: ${account.IBAN}`"></Header>
  <div class="container">
    <div class="content">
      <button @click="goToUserAccounts" id="go-to-user-accounts">Go Back</button>
      <div class="account-info">
        <div class="account-details">
          <div class="label">
            <h2>Account Name:</h2>
          </div>
          <div class="value">
            <h2>{{ account.Name }}</h2>
          </div>
          <div class="label">
            <h2>Balance:</h2>
          </div>
          <div class="value">
            <h2>{{ account.Balance }}</h2>
          </div>
          <div class="label">
            <h2>Account Type:</h2>
          </div>
          <div class="value">
            <h2>{{ account.Type }}</h2>
          </div>
          <div class="label">
            <h2>Minimum Balance:</h2>
          </div>
          <div class="value">
            <h2>{{ account.MinBal }}</h2>
          </div>
        </div>
        <div id="account-logo">
          <img src="/src/assets/images/logo-redbank.png" alt="Logo" />
        </div>
      </div>
      <div class="account-info-buttons">
        <button class="account-info-button-createTransaction"
          v-if="userRole === 'ROLE_USER' || userRole === 'ROLE_EMPLOYEE'" @click="createTransaction">Create a new
          Transaction</button>
        <button class="account-info-button-editAccount" v-if="userRole === 'ROLE_EMPLOYEE'" @click="editAccount">Edit this
          Account</button>
      </div>
      <div class="transaction-overview">
        <div class="pagination-and-amount-and-search">
          <div class="pagination-and-amount">
            <div class="amount-info">Amount of items to list: </div>
            <div class="dropdown">
              <select v-model="itemsPerPage" @change="updateDisplayedTransactions" class="items-per-page-dropdown">
                <option v-for="option in availableItemsPerPage" :value="option" :key="option">{{ option }}</option>
              </select>
            </div>
            <div class="pagination">
              <button @click="previousPage" :disabled="currentPage === 1" class="pagination-button">Previous Page</button>
              <div class="pagination-info">
                Current Page: {{ currentPage }}
              </div>
              <button @click="nextPage" class="pagination-button">Next Page</button>
            </div>
          </div>
          <div class="form-group">
            <select id="amount" v-model="IBANSearch" @change="setIBANFilter">
              <option value="Null">Null</option>
              <option value="To">To</option>
              <option value="From">From</option>
            </select>
          </div>
          <div class="searchIBAN">
            <input v-model="IBANFilter" @input="setIBANFilter" @change="setIBANFilter"
              placeholder="IBAN" />
          </div>
          <div class="searchAmount">
            <input type="number" min="0" v-model="filterAmount" @input="setAmountFilter" @change="setAmountFilter"
              placeholder="amount" />
          </div>
          <div class="form-group">
            <select id="amount" v-model="amountSearch" @change="setAmountFilter">
              <option value="equal">equal</option>
              <option value="lower">lower</option>
              <option value="higher">higher</option>
            </select>
          </div>
        </div>
        <table class="transaction-table">
          <thead>
            <tr>
              <th class="transaction-table-head">
                <h2>From IBAN</h2>
              </th>
              <th class="transaction-table-head">
                <h2>To IBAN</h2>
              </th>
              <th class="transaction-table-head">
                <h2>Description</h2>
              </th>
              <th class="transaction-table-head">
                <h2>Type</h2>
              </th>
              <th class="transaction-table-head">
                <h2>amount</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <transaction-list-item v-for="transaction in displayedTransactions" :key="transaction.transactionID"
              :transaction="transaction"></transaction-list-item>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";
import TransactionListItem from "@/components/accounts/TransactionListItem.vue";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "SingleAccount",
  components: {
    Header,
    TransactionListItem
  },
  data() {
    return {
      accountID: this.$route.params.accountId,
      account: {},
      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20, 30],
      searchQuery: "",
      transactions: [],
      displayedTransactions: [],
      filterAmount: null,
      IBANFilter: null,
      higher: null,
      lower: null,
      equal: null,
      toIBAN: null,
      fromIBAN: null,

      userRole: 'ROLE_USER'
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
        })
        .catch(error => {
          console.error("Error retrieving account:", error);
        });
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTransactions();
      }
    },
    nextPage() {
      if (this.displayedTransactions.length > 0) {
        this.currentPage++;
        this.fetchTransactions();
      }
    },
    updateDisplayedTransactions() {
      this.currentPage = 1;
      this.fetchTransactions();
    },
    fetchTransactions() {
      const limit = this.itemsPerPage;
      const offset = this.currentPage - 1;
      const accountID = this.accountID;
      const equal = this.equal;
      const higher = this.higher;
      const lower = this.lower;
      const toIBAN = this.toIBAN;
      const fromIBAN = this.fromIBAN;

      const url = `http://localhost:8080/transactions`;
      const params = { limit, offset, accountID, fromIBAN, toIBAN ,equal, higher, lower };

      const token = sessionStorage.getItem('token');

      axios
        .get(url, {
          params: params,
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.transactions = response.data;
        })
        .catch(error => {
          console.error("Error retrieving transactions:", error);
        });
    },
    search() {
      // Perform a search when the search query changes
      this.currentPage = 1;
      this.updateDisplayedTransactions();
    },
    createTransaction() {
      // Perform any necessary checks or actions before navigating to the create transaction page
      // Navigate to the create transaction page
      this.$router.push(`/transactions/${this.account.AccountID}/createTransaction`);
      },
    editAccount() {ßß
      this.$router.push(`/transactions/${this.account.AccountID}/createTransaction`);
    },
    editAccount() {
      this.$router.push(`/users/${this.account.AccountID}/editAccount`);
    },
    goToUserAccounts() {
      const token = sessionStorage.getItem('token');
      const decodedToken = VueJwtDecode.decode(token);
      this.userId = decodedToken.sub;
      this.$router.push(`/accounts/user/${this.userId}/accounts`);
    },
    setAmountFilter() {
      if (this.amountSearch === 'equal') {
        this.equal = this.filterAmount
        this.lower = null
        this.higher = null
      } else if (this.amountSearch === 'lower') {
        this.lower = this.filterAmount
        this.equal = null
        this.higher = null
      } else if (this.amountSearch === 'higher') {
        this.higher = this.filterAmount
        this.equal = null
        this.lower = null
      }
      this.fetchTransactions();
    },
    setIBANFilter(){
      if (this.IBANSearch === 'To') {
        this.toIBAN = this.IBANFilter
        this.fromIBAN = null
      } else if (this.IBANSearch === 'From') {
        this.fromIBAN = this.IBANFilter
        this.toIBAN = null
      } else {
        this.toIBAN = null
        this.fromIBAN = null
      }
      this.fetchTransactions();
    }
  },
  mounted() {
    this.fetchAccount();
    this.fetchTransactions();

    let token = sessionStorage.getItem('token');
    try {
      const decodedToken = VueJwtDecode.decode(token);
      const hasEmployeeRole = decodedToken.auth.some(auth => auth.role === 'ROLE_EMPLOYEE');

      if (hasEmployeeRole) {
        this.userRole = 'ROLE_EMPLOYEE';
      } else {
        this.userRole = 'ROLE_USER';
      }
    } catch (err) {
      console.log('Token is null: ', err);
    }
  },
  computed: {
    displayedTransactions() {
      return this.transactions.slice(0, this.itemsPerPage);
    },
  },
};
</script>

<style>

.container {
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.searchIBAN{
  margin-right: 2%;
  input{
    border: none;
    padding: 2%;
  }
}
.form-group, .searchAmount{
  margin-right: 2%;
}
.content {
  flex: 1;
}

.account-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 20px;
  border: #ffffff solid 3px;
  border-radius: 5%;
}

.account-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.label {
  font-weight: bold;
}

#account-logo img {
  margin-left: 150px;
  width: 200px;
  height: 200px;
}

.account-info-buttons {
  margin-top: 20px;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.account-info-button-createTransaction {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  margin-left: 10px;
  margin-right: 10px;
}

.account-info-button-createTransaction:hover,
.account-info-button-createTransaction:active {
  background-color: transparent;
}

.account-info-button-createTransaction::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.account-info-button-createTransaction:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.account-info-button-editAccount {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  margin-left: 10px;
  margin-right: 10px;
}

.account-info-button-editAccount:hover,
.account-info-button-editAccount:active {
  background-color: transparent;
}

.account-info-button-editAccount::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.account-info-button-editAccount:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.transaction-table {
  color: white;
  width: 100%;
  border-collapse: collapse;
}

.transaction-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination-and-amount-and-search {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-and-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
  color: white;
}

.dropdown {
  position: relative;
}

.items-per-page-dropdown {
  color: white;
  background-color: transparent;
  border: none;
  padding: 5px 10px;
}

.items-per-page-dropdown option {
  color: black;
  background-color: white;
}

.pagination {
  margin-left: 40px;
}

#go-to-user-accounts {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-right: 10px;
}

#go-to-user-accounts:hover,
#go-to-user-accounts:active {
  background-color: transparent;
}

#go-to-user-accounts::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

#go-to-user-accounts:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.pagination-button {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  margin-left: 10px;
  margin-right: 10px;
}

.pagination-button:hover,
.pagination-button:active {
  background-color: transparent;
}

.pagination-button::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: white;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.pagination-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.search-bar {
  display: flex;
  width: 20%;
  margin-left: 40px;
  border-bottom: 1px solid #ddd;
}

.search-input {
  flex: 1;
  /* Take up remaining space */
  border: none;
  margin-right: 10px;
  background-color: transparent;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: white;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.transaction-table-head {
  padding-left: 48px;
  padding-top: 10px;
  background-color: #f2f2f2;
  color: black;
}

td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}</style>