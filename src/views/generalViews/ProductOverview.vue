<template>
  <Header title="What Red Bank has to offer"></Header>
    <!-- Two containers side by side -->
    <div class="containers">
      <!-- Container 1 -->
      <div class="container">
        <product-container
            image-source="/src/assets/images/currentProductPhoto.jpg"
            title="Debit Accounts"
            description="Pay with your own debit card, fast, secure and simple"
        ></product-container>
      </div>

      <div class="container">
        <product-container
            image-source="/src/assets/images/atm.png"
            title="ATM"
            description="Use our ATM to deposit or withdraw money"
        ></product-container>
        <router-link to="/atm" class="nav-link" active-class="active">ATM</router-link>
    }
      </div>

      <!-- Container 2 -->
      <div class="container">
        <product-container
            image-source="/src/assets/images/savingsProductPhoto.jpg"
            title="Savings Accounts"
            description="Save money with our record braking interest rates"
        ></product-container>
      </div>
    </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import ProductContainer from "@/components/products/ProductContainer.vue";

export default {
  name: "ProductOverview",
  components: {
    ProductContainer,
    Header
  },
}
</script>

<style scoped>
.containers {
  display: flex;
  justify-content: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
}

</style>