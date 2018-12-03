<template>
	<v-container text-xs-center mt-5 pt-5>
		<v-layout row wrap>
			<v-flex xs12 sm6 offset-sm3>
				<h1>Get Started Here</h1>
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
				<v-card color="accent" dark>
					<v-container>
						<v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignupUser">
							<v-layout row>
								<v-flex xs12>
									<v-text-field :rules="usernameRules" v-model="username" label="Username" type="text" prepend-icon="face" required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout row>
								<v-flex xs12>
									<v-text-field :rules="emailRules" v-model="email" label="Email" type="email" prepend-icon="face" required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout row>
								<v-flex xs12>
									<v-text-field :rules="passwordRules" v-model="password" label="Password" type="password" prepend-icon="extension" required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout row>
								<v-flex xs12>
									<v-text-field :rules="passwordRules" v-model="passwordConfirmation" label="Confirm Password" type="password" prepend-icon="gavel" required></v-text-field>
								</v-flex>
							</v-layout>

							<v-layout row>
								<v-flex xs12>
									<v-btn :loading="loading" :disabled="!isFormValid || loading" type="submit" color="primary">
										<span slot="loader" class="custom-loader">
											<v-icon light>cached</v-icon>
										</span>
										Signup
									</v-btn>
									<h3>
										Already have an account?
										<router-link to="/signin">Signin</router-link>
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
	name: "Signup",
	data() {
		return {
			isFormValid: true,
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			usernameRules: [
				//checks if textfield has value
				username => !!username || 'Username is required',
				//make sure that the characters are les than 10
				username => username.length < 10 || 'Username cannot be more than 10 characters'
			],
			emailRules: [
				//checks if textfield has value
				email => !!email || 'email is required',
				email => /.@+./.test(email) || 'email must be valid'
			],
			passwordRules: [
				password => !!password || 'Password is required',
				password => password.length >= 4 || 'Password must be at least  4 characters long',
				confirmation => confirmation === this.password || 'Password mismatch.'
			]
		}
	},
	computed: {
		...mapGetters(['error', 'loading', 'user'])
	},
	watch: {
		user(value) {
			if (value) this.$router.push('/')
		}
	},
	methods: {
		handleSignupUser() {
			//signup user
			if (this.$refs.form.validate()) {
				this.$store.dispatch('signupUser', {
					username: this.username,
					email: this.email,
					password: this.password
				})
			}
		}
	},
}
</script>

<style scoped>
</style>