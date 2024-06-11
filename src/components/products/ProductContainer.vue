<template>
  <div class="container">
    <div class="container-image" :style="{ backgroundImage: 'url(' + imageSource + ')' }"></div>
    <div class="container-text">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <p>Go to one of our locations to get started!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductContainer",
  props: {
    imageSource: String,
    title: String,
    description: String
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.container-image {
  width: 80%;
  height: 400px;
  background-size: cover;
  background-position: center;
}

.container-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: white;
}

.container-text h2{
  font-size: 30px;
}

.container-text p{
  font-size: 20px;
}

button {
  background: #6f00ff;
  color: white;
  padding: 20px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  font-size: 20px;
}
</style>