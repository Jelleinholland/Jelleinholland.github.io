<template>
  <tr class="user-item" @click="navigateToUser">
    <td class="user-cell">{{ user.UserID }}</td>
    <td class="user-cell">{{ user.FirstName }}</td>
    <td class="user-cell">{{ user.LastName }}</td>
    <td class="user-cell">{{ user.Email }}</td>
    <td class="user-cell">{{ getRoleLabel(user.roles) }}</td>
    <td class="user-cell">{{ user.Active ? "Active" : "Inactive" }}</td>
    <td class="user-cell">{{ user.TransactionLimit }}</td>
    <td class="user-cell">{{ user.DailyLimit }}</td>
    <td class="user-cell">{{ user.LeftOverDailyLimit }}</td>
  </tr>
</template>

<script>

export default {
  name: "UsersListItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    navigateToUser() {
      this.$router.push(`users/${this.user.UserID}`);
    },
    getRoleLabel(roles) {
      if (Array.isArray(roles)) {
        const combined = roles.join(", "); // Combines the roles into a string separated by commas

        if (roles.includes("ROLE_EMPLOYEE")) {
          return "Employee";
        }
        else if (roles.includes("ROLE_USER")) {
          return "User";
        }
      }
      else {
        return "Unspecified";
      }
    },
  },
};
</script>

<style scoped>
.user-item {
  font-size: 20px;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.user-cell {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 8px;
}
</style>
