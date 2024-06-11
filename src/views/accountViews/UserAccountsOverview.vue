<template>
  <div>
    <Header title="Your Accounts"></Header>
    <div class="account-overview">
      <div class="top-of-user-account-overview">
        <div class="pagination-and-amount">
          <div class="amount-info">Amount of items to list:</div>
          <div class="dropdown">
            <select
              v-model="itemsPerPage"
              @change="updateDisplayedAccounts"
              class="items-per-page-dropdown"
            >
              <option
                v-for="option in availableItemsPerPage"
                :value="option"
                :key="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
          <div class="pagination">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="pagination-button"
            >
              Previous Page
            </button>
            <div class="pagination-info">Current Page: {{ currentPage }}</div>
            <button
              @click="nextPage"
              :disabled="hasMoreAccounts"
              class="pagination-button"
            >
              Next Page
            </button>
          </div>
        </div>
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            @input="search"
            placeholder="Search by Account Name"
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
            <th class="account-table-head">
              <h2>Minimum Balance needed to perform transactions</h2>
            </th>
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
        <p id="total-balance">Total balance for the displayed accounts: {{totalBalance}}</p>
      </table>
    </div>
  </div>
</template>

<script>
import AccountListItem from "@/components/accounts/AccountListItem.vue";
import axios from "axios";
import Header from "@/views/generalViews/Header.vue";

export default {
  name: "UserAccountsOverview",
  components: {
    Header,
    AccountListItem,
  },
  data() {
    return {
      accounts: [],
      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20, 30],
      searchQuery: "",
      hasAccounts: true,
      totalBalance: 0,
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
      if (this.displayedAccounts.length > 0) {
        this.currentPage++;
        this.fetchAccounts();
      }
    },
    updateDisplayedAccounts() {
      this.currentPage = 1;
      this.fetchAccounts();
    },
    fetchAccounts() {
      const userId = this.$route.params.userId;
      const limit = this.itemsPerPage;
      const offset = this.currentPage - 1;
      const searchstrings = this.searchQuery || undefined;

      const url = `http://localhost:8080/accounts/user/${userId}/accounts`;
      const params = { limit, offset, searchstrings };

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
          this.accounts.forEach(this.calculateTotalBalance);
        })
        .catch((error) => {
          console.error("Error retrieving accounts:", error);
        });
    },
    search() {
      this.currentPage = 1;
      this.fetchAccounts();
    },
    calculateTotalBalance(account) {
      this.totalBalance += account.Balance;
    }
  },
  computed: {
    displayedAccounts() {
      return this.accounts.slice(0, this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchAccounts();
  },
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

.top-of-user-account-overview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination {
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
  background-color: transparent;
  color: white;
  border: none; /* Add this line to remove the button border */
  cursor: pointer; /* Add this line to set cursor to pointer */
  transition: none; /* Add this line to remove any transition effects */
  box-shadow: none; /* Add this line to remove any box shadow */
  outline: none; /* Add this line to remove the outline */
  margin-left: 10px;
  margin-right: 10px;
}

.pagination-button:hover,
.pagination-button:active {
  background-color: transparent; /* Add this line to remove any background color on hover and active states */
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
</style>
