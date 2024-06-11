<template>
  <tr class="transaction-item" @click="navigateToAccount">
    <td class="transaction-cell">{{ transaction.fromIBAN }}</td>
    <td class="transaction-cell">{{ transaction.toIBAN }}</td>
    <td class="transaction-cell">{{ transaction.description }}</td>
    <td class="transaction-cell">{{ transaction.transactionType }}</td>
    <td class="transaction-cell">{{ transaction.amount }}</td>
  </tr>
</template>

<script>
export default {
  name: "TransactionListItem",
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToAccount() {
      // Assuming you're using Vue Router
      this.$router.push(`/accounts/${this.transaction.transactionID}`);
    },
    }
}
</script>

<style scoped>
.transaction-item {
  font-size: 20px;
  text-align: left;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.transaction-cell {
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 5px;
}
</style>