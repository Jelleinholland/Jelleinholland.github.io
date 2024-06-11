<template>
  <div class="homepage">
    <Header title="Welcome to the Red Bank"></Header>
    <div class="grid">
      <div class="text-block block1">
        <h2>About Red Bank</h2>
        <p>Welcome to Red Bank, the banking application inspired by the delightful flavors of Red Band candy! At Red Bank, we bring a unique blend of sweetness and reliability to your financial journey. Just like the iconic candy brand, we strive to create an experience that is enjoyable and satisfying. With a team of dedicated professionals, we are committed to providing exceptional banking services tailored to your needs. Join us and discover the perfect harmony of confectionery delight and financial expertise.</p>
        <button class="centered-button" @click="this.$router.push('/login')">Get Started Now</button>
      </div>
      <div class="text-block block2">
        <h2>Our Competitive rates</h2>
        <p>At Red Bank, we understand the importance of making your money work for you. That's why we offer competitive rates that are as tempting as Red Band's mouthwatering candies. We believe that your hard-earned savings deserve to grow and flourish. Whether you're looking for a high-yield savings account, a rewarding credit card, or a competitive loan, we have you covered. With Red Bank, you can enjoy the sweet taste of financial success while savoring the satisfaction of getting the best rates in town.</p>
      </div>
      <div class="text-block block3">
        <h2>Simplicity of Red Bank</h2>
        <p>Banking doesn't have to be complicated, just like the simplicity of enjoying a pack of Red Band candies. At Red Bank, we prioritize simplicity and convenience in every aspect of our services. With our user-friendly mobile app and intuitive online banking platform, managing your finances has never been easier. From transferring funds to paying bills, we offer streamlined solutions that save you time and effort. Say goodbye to the hassle and embrace the simplicity of Red Bank, where banking becomes a delightful treat.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
export default {
  name: "Home",
  components:{
    Header
  },
};
</script>

<style>
h1 {
  font-size: 80px;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  background: linear-gradient(45deg, #ca0426 0%, #b0328b 100%);
}

.homepage {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  margin-top: 100px;
  padding: 0 150px;
}

.text-block {
  background-color: transparent;
  border: 2px solid white;
  color: white;
  padding: 20px;
  border-radius: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text-block h2{
  font-size: 30px;
}

.text-block p{
  font-size: 20px;
}

.block1 {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.centered-button {
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

.block2 {
  grid-column: 2 / span 2;
  grid-row: 1;
}

.block3 {
  grid-column: 2 / span 2;
  grid-row: 2;
}
</style>