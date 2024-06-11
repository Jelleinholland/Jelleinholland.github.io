<template>
  <Header title="Logged out of your account"></Header>
  <button @click="logout">Logout</button>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
export default {
  name: "Logout",
  components: {
    Header
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('LoggedIn');
      sessionStorage.removeItem('UserID');
      this.userRole = '';
      this.userID = '';
      this.LoggedIn = false;
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
</style>
  