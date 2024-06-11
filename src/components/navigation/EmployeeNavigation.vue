<template>
    <MyComponent key="navKey"/>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <!-- Add a router link to the homepage (don't use the a tag!) -->
            <router-link to="/" class="nav-link" active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <!-- add a router link to the products page (don't use the a tag!) -->
            <router-link to="/products" class="nav-link" active-class="active">Products</router-link>
          </li>
          <li class="nav-item">
            <!-- Add a router link to the user's accounts page (don't use the a tag!) -->
            <router-link :to="`/accounts/user/${userID}/accounts`" class="nav-link" active-class="active" @click="updateComponent">My Accounts</router-link>
          </li>
          <li class="nav-item">
            <!-- Add a router link to the user's accounts page (don't use the a tag!) -->
            <router-link :to="`/users/${userID}/personal`" class="nav-link" active-class="active" @click="updateComponent">My Profile</router-link>
          </li>
          <li class="nav-item">
            <!-- add a router link to the all users page (don't use the a tag!) -->
            <router-link to="/users" class="nav-link" active-class="active">All Users</router-link>
          </li>
          <li class="nav-item">
            <!-- add a router link to the all accounts page (don't use the a tag!) -->
            <router-link to="/accounts" class="nav-link" active-class="active">All Accounts</router-link>
          </li>
          <li class="nav-item">
            <!-- add a router link to the all accounts page (don't use the a tag!) -->
            <router-link to="/transactions" class="nav-link" active-class="active">All Transactions</router-link>
          </li>
          <li class="nav-item" v-if="sessionStorage.getItem('LoggedIn') === true">
            <router-link to="/logout" class="nav-link" active-class="active">logout</router-link>
          </li>
          <li class="nav-item" v-else>
            <!-- add a router link to the login page (don't use the a tag!) -->
            <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </template>