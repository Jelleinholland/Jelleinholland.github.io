<template>
  <div>
    <Header title="All Accounts"></Header>
    <div class="account-overview">
      <div class="top-of-user-account-overview">
        <div class="pagination-and-amount">
          <div class="amount-info">Amount of items to list: </div>
          <div class="dropdown">
            <select v-model="itemsPerPage" @change="updateDisplayedAccounts" class="items-per-page-dropdown">
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
        <div class="search-bar">
          <input
              type="text"
              v-model="searchQuery"
              @input="search"
              placeholder="Search by Account Name or a full IBAN"
              class="search-input"
          />
        </div>
      </div>
      <table class="account-table">
        <thead>
        <tr>
          <th class="account-table-head"><h2>IBAN</h2></th>
          <th class="account-table-head"><h2>Account Name</h2></th>
          <th class="account-table-head"><h2>Type</h2></th>
          <th class="account-table-head"><h2>Balance</h2></th>
          <th class="account-table-head"><h2>Minimum Balance needed to perform transactions</h2></th>
          <th class="account-table-head"><h2>Status</h2></th>
        </tr>
        </thead>
        <tbody>
        <account-list-item
            v-for="account in displayedAccounts"
            :key="account.AccountID"
            :account="account"
        ></account-list-item>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AccountListItem from '@/components/accounts/AccountListItem.vue';
import axios from 'axios';
import Header from "@/views/generalViews/Header.vue";

export default {
  name: "GetAllAccounts",
  components: {
    Header,
    AccountListItem
  },
  data() {
    return {
      accounts: [],
      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20, 30],
      searchQuery: '',
      hasAccounts: true,
      showEmployeeButton: false,
    };
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchAccounts();
        
      }
    },
    nextPage() {
      if (this.displayedAccounts.length>0) {
        this.currentPage++;
        this.fetchAccounts();
      }
    },
    updateDisplayedAccounts() {
      this.currentPage = 1;
      this.fetchAccounts();
    },
    fetchAccounts() {
      const limit = this.itemsPerPage;
      const offset = this.currentPage - 1;
      let searchstrings = undefined;
      let IBAN = undefined;
      const ibanRegex = /^[A-Za-z]{2}\d{2}[A-Za-z]{4}\d{10}$/;

      // Check if the input contains a valid IBAN format
      if (this.searchQuery && ibanRegex.test(this.searchQuery)) {
        IBAN = this.searchQuery;
      } else {
        searchstrings = this.searchQuery;
      }
     
      const url = `http://localhost:8080/accounts`;
      const params = { limit, offset, searchstrings, IBAN };

      const token = sessionStorage.getItem('token');

      axios
          .get(url, {
            params,
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then(response => {
            this.accounts = response.data;
          })
          .catch(error => {
            console.error('Error retrieving accounts:', error);
          });
    },
    search() {
      this.currentPage = 1;
      this.fetchAccounts();
    }
  },
  computed: {
    displayedAccounts() {
      return this.accounts.slice(0, this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchAccounts();
  }
};
</script>

<style scoped>
.account-table {
  width: calc(100% - 300px); /* Adjust the value based on your requirements */
  margin: 0 auto;
  color: white;
  border-collapse: collapse;
}

.account-table-head {
  padding-left: 8px;
  padding-top: 10px;
  background-color: #f2f2f2;
  color: black;
}

.top-of-user-account-overview{
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination{
  margin-left: 40px;
}

.pagination-and-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3px;
  color: white;
}

.pagination-info {
  margin: 10px 10px 10px 0;
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

.search-bar {
  display: flex;
  width: 20%;
  margin-left: 40px;
  border-bottom: 1px solid #ddd;
}

.search-input {
  flex: 1; /* Take up remaining space */
  border: none;
  margin-right: 10px;
  background-color: transparent;
  color: white;
  outline: none;
}

.search-input::placeholder {
  color: white;
}

.employee-button{
  padding: 100px;
  background: yellow;
}
</style>