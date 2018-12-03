<template>
    <v-container text-xs-center mt-5 pt-5>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Welcome back</h1>
            </v-flex>
        </v-layout>

        <!-- Error alert -->
        <v-layout v-if="error" row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <form-alert :message="error.message"></form-alert>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-container>
                        <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSigninUser">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="usernameRules" v-model="username" label="Username" type="text" prepend-icon="face" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field :rules="passwordRules" v-model="password" label="Password" type="password" prepend-icon="extension" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn :loading="loading" :disabled="!isFormValid" type="submit" color="accent">
                                        <span slot="loader" class="custom-loader">
                                            <v-icon light>cached</v-icon>
                                        </span>
                                        Signin</v-btn>
                                    <h3>
                                        Don't have an account?
                                        <router-link to="/signup">Signup</router-link>
                                    </h3>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Signin",
    data() {
        return {
            isFormValid: true,
            username: '',
            password: '',
            usernameRules: [
                //checks if textfield has value
                username => !!username || 'Username is required',
                //make sure that the characters are les than 10
                username => username.length < 10 || 'Username must be less than 10 characters'
            ],
            passwordRules: [
                password => !!password || 'Password is required',
                password => password.length >= 4 || 'Password must be at least  4 characters long'
            ]
        }
    },
    computed: {
        ...mapGetters(['user', 'error', 'loading'])
    },
    watch: {
        user(value) {
            if (value)
                this.$router.push('/')
        }
    },
    methods: {
        handleSigninUser() {
            if (this.$refs.form.validate())
                this.$store.dispatch('signinUser', {
                    username: this.username,
                    password: this.password
                })
        }
    },
}
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>


