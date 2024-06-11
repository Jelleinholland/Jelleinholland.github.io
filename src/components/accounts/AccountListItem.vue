<template>
  <tr class="account-item" @click="navigateToAccount">
    <td class="account-cell">{{ account.IBAN }}</td>
    <td class="account-cell">{{ account.Name }}</td>
    <td class="account-cell">{{ account.user }}</td>
    <td class="account-cell">{{ account.Type }}</td>
    <td class="account-cell">{{ account.Balance }}</td>
    <td class="account-cell">{{ account.MinBal }}</td>
    <td class="account-cell">{{ account.Active ? 'Active' : 'Inactive' }}</td>
  </tr>
</template>


<script>
export default {
  name: "AccountListItem",
  props: {
    account: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToAccount() {
      // Assuming you're using Vue Router
      this.$router.push(`/accounts/${this.account.AccountID}`);
    }
  }
}
</script>

<style scoped>
.account-item {
  font-size: 20px;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.account-cell {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 8px;
}
</style>