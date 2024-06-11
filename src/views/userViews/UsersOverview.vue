<template>
  <div>
    <Header title="Your Users"></Header>
    <div class="account-overview">
      <div class="top-of-user-overview">
        <div class="pagination-and-amount">
          <div class="amount-info">Amount of items to list:</div>
          <div class="dropdown">
            <select
              v-model="itemsPerPage"
              @change="updateDisplayedUsers"
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
            placeholder="Search by email"
            class="search-input"
          />
        </div>
      </div>
      <table class="user-table">
        <thead>
          <tr>
            <th class="user-table-head"><h2>User ID</h2></th>
            <th class="user-table-head"><h2>First Name</h2></th>
            <th class="user-table-head"><h2>Last Name</h2></th>
            <th class="user-table-head"><h2>Email</h2></th>
            <th class="user-table-head"><h2>Roles</h2></th>
            <th class="user-table-head"><h2>Active</h2></th>
            <th class="user-table-head"><h2>Transaction Limit</h2></th>
            <th class="user-table-head"><h2>Daily Limit</h2></th>
          </tr>
        </thead>

        <tbody>
          <UsersListItem
            v-for="user in displayedUsers"
            :key="user.UserID"
            :user="user"
          ></UsersListItem>
        </tbody>
      </table>
      <div class="createUser">
        <button class="#create-user-button" id="create-user-button" @click=createUser>
          Click here to create a new user
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import UsersListItem from "@/components/users/UsersListItem.vue";
import axios from "axios";
import Header from "@/views/generalViews/Header.vue";

export default {
  name: "UsersOverview",
  components: {
    Header,
    UsersListItem,
  },
  data() {
    return {
      users: [],
      currentPage: 1,
      itemsPerPage: 10,
      availableItemsPerPage: [10, 20],
      searchQuery: "",
      hasUsers: true,

    };
  },
  methods: {
    createUser() {
      this.$router.push("/users/create");
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.updateDisplayedUsers();
      }
    },
    nextPage() {
      if (this.displayedUsers.length>0) {
        this.currentPage++;
        this.fetchUsers();
      }
    },
    updateDisplayedUsers() {
      this.currentPage = 1;
      this.fetchUsers();
    },
    fetchUsers() {
      const limit = this.itemsPerPage;
      const offset = this.currentPage - 1;
      const searchstrings = this.searchQuery || undefined;

      const url = `http://localhost:8080/users`;
      const params = { limit, offset, searchstrings };

      const token = sessionStorage.getItem("token");

      axios
          .get(url, {
            params,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            this.users = response.data;
          })
          .catch((error) => {
            console.error("Error retrieving users:", error);
          });
    },
    search() {
      this.currentPage = 1;
      this.fetchUsers();
    },
  },
  computed: {
    displayedUsers(){
      return this.users.slice(0, this.itemsPerPage);
    }
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.createUser {
  display: grid;
  align-items: center;
  font-size: large;
  margin-top: 20px;
}

.create-user-button{
  margin-top: 20px;
  align-self: stretch;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#create-user-button {
  display: inline-block;
  position: relative;
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  transition: none;
  box-shadow: none;
  margin-bottom: 2px;
  margin-left: 10px;
  margin-right: 10px;
}

#create-user-button:hover,
#create-user-button:active {
  background-color: transparent;
}

#create-user-button::after {
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

#create-user-button:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
.user-table {
  width: calc(100% - 300px); /* Adjust the value based on your requirements */
  margin: 0 auto;
  color: white;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

.user-table-head {
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
