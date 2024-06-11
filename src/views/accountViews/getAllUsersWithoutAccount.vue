<template>
    <div>
        <h1>Users Without Account</h1>
        <table>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Active</th>
                    <th>Transaction Limit</th>
                    <th>Daily Limit</th>
                    <th>Left Over Daily Limit</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Loop through users without account and display them in table rows -->
                <tr v-for="user in usersWithoutAccount" :key="user.userID">
                    <td>{{ user.userID }}</td>
                    <td>{{ user.firstName }}</td>
                    <td>{{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.roles.join(', ') }}</td>
                    <td>{{ user.active }}</td>
                    <td>{{ user.transactionLimit }}</td>
                    <td>{{ user.dailyLimit }}</td>
                    <td>{{ user.leftOverDailyLimit }}</td>
                    <td>
                        <!-- Add actions here, such as button to create account for user -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
import Header from "@/views/generalViews/Header.vue";

export default {
    name: 'GetAllUsersWithoutAccount',
    data() {
        return {
            usersWithoutAccount: [] // Placeholder for users without account
        };
    },
    mounted() {
        // Fetch users without account from API and update the data property
        this.fetchUsersWithoutAccount();
    },
    methods: {
        fetchUsersWithoutAccount() {
            const url = `http://localhost:8080/users/without-account`; // replace with your actual server URL
            const token = sessionStorage.getItem('token');

            axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                this.usersWithoutAccount = response.data;
            })
            .catch(error => {
                console.error('Error fetching users without account:', error);
            });
        }
    }
};
</script>

<style>
/* Add custom styles for the view here */
</style>