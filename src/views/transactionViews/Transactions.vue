<template>
  <div>
    <Header title="Transactions"></Header>
    <div class="account-overview">
      <div class="top-of-user-overview">
        <div class="pagination-and-amount">
          <div class="amount-info">Amount of items to list:</div>
          <div class="dropdown">
            <select
              v-model="itemsPerPage"
              @change="updateDisplayedTransactions"
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
            <button @click="nextPage" class="pagination-button">Next Page</button>
          </div>
        </div>
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            @input="search"
            placeholder="Search by user performing"
            class="search-input"
          />
        </div>
      </div>
      <div class="table-container">
        <table class="transaction-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>From IBAN</th>
              <th>To IBAN</th>
              <th>Amount</th>
              <th>Type</th>
              <th>User Performing</th>
              <th>TimeStamp</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in displayedTransactions" :key="transaction.transactionID">
              <td>{{ transaction.transactionID }}</td>
              <td>{{ transaction.fromIBAN }}</td>
              <td>{{ transaction.toIBAN }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.transactionType }}</td>
              <td>{{ transaction.userPerforming }}</td>
              <td>{{ transaction.timeStamp }}</td>
              <td>{{ transaction.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from "@/views/generalViews/Header.vue";

export default {
  name: 'Transactions',
  components: {
    Header,
  },
  data() {
    return {
      transactions: [],
      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20],
      searchQuery: "",
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      const token = sessionStorage.getItem('token');
      const url = `http://localhost:8080/transactions`;
      const limit = this.itemsPerPage;
      const offset = this.currentPage - 1;
      const transactionType = undefined; // Adjust this as needed
      const filters = { searchQuery: this.searchQuery }; // Assuming filters can be passed as a query param

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: { limit, offset, transactionType, ...filters }
        });

        await Promise.all(response.data.map(transaction => {
          return this.fetchUser(transaction.userPerforming)
            .then(userName => {
              transaction.userPerforming = userName;
            });
        }));

        this.transactions = response.data;
        console.log('Transactions:', this.transactions);

      } catch (error) {
        console.error('Error retrieving transactions:', error);
      }
    },
    async fetchUser(userID) {
      try {
        const url = `http://localhost:8080/users/${userID}`;
        const token = sessionStorage.getItem('token');
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data.Email;
      } catch (error) {
        console.error("Error retrieving user:", error);
        return ''; 
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.fetchTransactions();
      }
    },
    nextPage() {
      if (this.displayedTransactions.length === this.itemsPerPage) {
        this.currentPage++;
        this.fetchTransactions();
      }
    },
    updateDisplayedTransactions() {
      this.currentPage = 1;
      this.fetchTransactions();
    },
    search() {
      this.currentPage = 1;
      this.fetchTransactions();
    },
  },
  computed: {
    displayedTransactions() {
      return this.transactions.slice(0, this.itemsPerPage);
    }
  }
};
</script>
<style scoped>
.account-overview {
  margin: 0 auto;
  padding: 20px;
  color: white;
}

.table-container {
  overflow-x: auto;
}

.transaction-table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

.transaction-table th,
.transaction-table td {
  padding: 10px;
  border: 1px solid #ddd;
}

.transaction-table th {
  padding-left: 8px;
  padding-top: 10px;
  background-color: #f2f2f2;
  color: black;
}

.top-of-user-overview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-and-amount {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 11px;
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
  content: "";
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
  margin-left: 10px;
  width: 15%;
  border-bottom: 1px solid #ddd;
  padding-right: 5%;
}

.search-input {
  flex: 1; 
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
