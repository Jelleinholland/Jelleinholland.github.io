<template>
    <div>
        <Header :title="`Your profile`"></Header>
        <div class="container">
            <div class="content">
                <div class="user-Info">
                    <div class="user-details">
                        <div class="label">
                            <h2>Name:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ user.FirstName + " " + user.LastName }}</h2>
                        </div>
                        <div class="label">
                            <h2>Email:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ user.Email }}</h2>
                        </div>
                        <div class="label">
                            <h2>Roles:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ getRoleLabel(user.roles) }}</h2>
                        </div>
                        <div class="label">
                            <h2>Active:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ user.Active }}</h2>
                        </div>
                        <div class="label">
                            <h2>Transaction Limit:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ user.TransactionLimit }}</h2>
                        </div>
                        <div class="label">
                            <h2>Daily Limit:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ user.DailyLimit }}</h2>
                        </div>
                        <div class="label">
                            <h2>Daily Limit Left:</h2>
                        </div>
                        <div class="value">
                            <h2>{{ user.LeftOverDailyLimit}}</h2>
                        </div>
                    </div>
                    <div id="user-logo">
                        <img src="/src/assets/images/logo-redbank.png" alt="Red Bank Logo" />
                    </div>
                </div>
                <div class="user-info-button">
                    <button class="style-user-button" @click="editUser">Edit my profile</button>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "@/views/generalViews/Header.vue";
import axios from "axios";
import AccountListItem from "@/components/accounts/AccountListItem.vue";

const token = sessionStorage.getItem("token");

export default {
    name: "SingleUser",
    components: {
        Header,
        AccountListItem,
    },
    data() {
        return {
            userID: this.$route.params.userId,
            user: {},  
            
        };
    },
    methods: {
        getRoleLabel(roles) {
            if (Array.isArray(roles)) {
                const combined = roles.join(", "); // Combines the roles into a string separated by commas

                if (roles.includes("ROLE_EMPLOYEE")) {
                    return "Employee";
                }
                else if (roles.includes("ROLE_USER")) {
                    return "User";
                }
            }
            else {
                return "Unspecified";
            }
        },
        editUser() {
            this.$router.push(`/users/${this.userID}/edit`);
        },
        fetchUser() {
            const url = `http://localhost:8080/users/${this.userID}`;
            axios
                .get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    this.user = response.data;
                    
                })
                .catch((error) => {
                    console.error("Error retrieving user:", error);
                });
        },
    },
    mounted() {
        this.fetchUser();
    },
    computed: {

    },
};
</script>

<style>
.container {
    width: calc(100% - 300px);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.content {
    flex: 1;
}

.user-Info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 20px;
    border: #ffffff solid 3px;
    border-radius: 5%;
}

.user-details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.label {
    font-weight: bold;
}

#user-logo img {
    width: 200px;
    height: 200px;
}

.user-info-button {
    margin-top: 20px;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-size: large;
}

.style-user-button {
    display: inline-block;
    position: relative;
    background-color: transparent;
    color: white;
    border: none;
    cursor: pointer;
    transition: none;
    box-shadow: none;
    margin-left: 10px;
    margin-right: 10px;
}

.style-user-button:hover,
.style-user-button:active {
    background-color: transparent;
}

.style-user-button::after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
}

.style-user-button:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}</style>