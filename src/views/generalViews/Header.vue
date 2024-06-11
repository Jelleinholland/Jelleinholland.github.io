<template>
  <div class="header">
    <div class="logo">
      <img src="/src/assets/images/logo-redbank.png" alt="Logo" />
      <div class="header-text">
        <h1>{{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String
  }
}
</script>

<style scoped>
.logo {
  align-content: center;
  padding: 20px;
  display: flex;
  margin-bottom: 20px;
}

.logo img {
  width: 150px;
  height: 150px;
}

.header-text {
  display: flex;
  align-items: center;
  margin-left: 100px;
  color: white;
  text-align: center;
}
</style>