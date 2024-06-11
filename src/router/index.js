import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/generalViews/Home.vue';

import ProductOverview from "@/views/generalViews/ProductOverview.vue";
import Login from "@/views/generalViews/Login.vue";
import UsersOverview from "@/views/userViews/UsersOverview.vue";
import UserAccountsOverview from '@/views/accountViews/UserAccountsOverview.vue';
import GetAllAccounts from "@/views/accountViews/getAllAccounts.vue";
import SingleAccount from "@/views/accountViews/SingleAcountOverview.vue";
import CreateAccount from "@/views/accountViews/CreateAccount.vue";
import CreateUser from '@/views/userViews/CreateUser.vue';
import UserOverview from '@/views/userViews/UserOverview.vue';
import EditUser from '@/views/userViews/EditUser.vue';
import EditAccount from "@/views/accountViews/EditAccount.vue";
import PersonalUserOverview from "@/views/userViews/PersonalUserOverview.vue";
import CreateTransaction from "@/views/transactionViews/CreateTransaction.vue";
import ForgotPassword from "@/views/generalViews/ForgotPassword.vue";
import ResetPassword from "@/views/generalViews/ResetPassword.vue";
import ATM from '../views/transactionViews/Atm.vue';
import Register from "@/views/generalViews/Register.vue";
import Transactions from "@/views/transactionViews/Transactions.vue";
import logout from "@/views/generalViews/Logout.vue";
import GetAllUsersWithoutAccount from "@/views/accountViews/GetAllUsersWithoutAccount.vue";

const routes = [
    //General Routes
  { path: '/', component: Home },
  { path: '/products', component: ProductOverview },
  { path: '/login', component: Login },
  { path: '/logout', component: logout },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password', component: ResetPassword },
  { path: '/register', component: Register },

    //User Routes
  { path: '/users', component: UsersOverview },
  { path: '/users/create', component: CreateUser },
  { path: '/users/:userId', component: UserOverview },
  { path: '/users/:userId/edit', component: EditUser },
  { path: '/users/:userId/personal', component: PersonalUserOverview },

    //Account Routes
  { path: '/accounts', component: GetAllAccounts},
  { path: '/accounts/:accountId', component: SingleAccount},
  { path: '/accounts/user/:userId/accounts', component: UserAccountsOverview },
  { path: '/users/:userId/createAccount', component: CreateAccount },
  { path: '/users/:accountId/editAccount', component: EditAccount },
  { path: '/users/without-account', component: GetAllUsersWithoutAccount},

  //Transaction Routes
  { path: '/transactions/:accountId/createTransaction', component: CreateTransaction },
  { path: '/atm/:accountId', component: ATM },
  { path: '/transactions', component: Transactions },


  //Transactions routes
  //{ path: '/transactions/:accountId/createAccount', component: CreateTransaction },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Navigation guard for input sanitization
router.beforeEach((to, from, next) => {
  // Sanitize path parameters
  Object.keys(to.params).forEach(param => {
    to.params[param] = removeUnwantedChars(to.params[param]);
    to.params[param] = escSpecialChars(to.params[param]);
  });

  // Sanitize query parameters
  Object.keys(to.query).forEach(queryParam => {
    to.query[queryParam] = removeUnwantedChars(to.query[queryParam]);
    to.query[queryParam] = escSpecialChars(to.query[queryParam]);
  });

  next();
});

// Function to sanitize input values
function removeUnwantedChars(value) {
  const uuidPattern = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;
  if (uuidPattern.test(value)) {
    return value; // Skip sanitization for UUID values
  }
  // Remove leading/trailing spaces
  value = value.trim();
  // Remove specific special characters
  value = value.replace(/[^a-zA-Z0-9]/g, '');

  return value;
}

function escSpecialChars(value) {
  // Escape HTML entities
  value = value.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  return value;
}
export default router;