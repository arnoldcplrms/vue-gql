<template>
    <v-container text-xs-center mt-5 pt-5>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <h1>Welcome back</h1>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card color="secondary" dark>
                    <v-container>
                        <v-form @submit.prevent="handleSigninUser">
                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="username" label="Username" type="text" prepend-icon="face" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-text-field v-model="password" label="Password" type="password" prepend-icon="extension" required></v-text-field>
                                </v-flex>
                            </v-layout>

                            <v-layout row>
                                <v-flex xs12>
                                    <v-btn type="submit" color="accent">Submit</v-btn>
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
export default {
    name: "Signin",
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        handleSigninUser() {
            this.$store.dispatch('signinUser', {
                username: this.username,
                password: this.password
            })
        }
    },
}
</script>

<style scoped>
</style>