<template>
	<v-app style="background: #e3e3ee">
		<v-navigation-drawer app temporary fixed v-model="sideNav">
			<v-toolbar color="accent" dark flat>
				<v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
				<router-link to="/" tag="span" style="cursor:pointer">
					<h1 class="title pl-3">VueShare</h1>
				</router-link>
			</v-toolbar>

			<v-divider></v-divider>

			<!-- side navbar links -->
			<v-list>
				<v-list-tile ripple v-for="item in sideNavItems" :key="item.title" :to="item.link">
					<v-list-tile-action>
						<v-icon>{{item.icon}}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						{{item.title}}
					</v-list-tile-content>
				</v-list-tile>
				<!-- Sign out button -->
				<v-list-tile v-if="user" @click="handleUserSignOut">
					<v-list-tile-action>
						<v-icon>exit_to_app</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						Signout
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-navigation-drawer>

		<!-- horizontal navbar -->
		<v-toolbar fixed color="primary" dark>
			<!-- app title -->
			<v-toolbar-side-icon @click="sideNav = !sideNav"></v-toolbar-side-icon>
			<v-toolbar-title class="hidden-xs-only">
				<router-link to="/" tag="span" style="cursor:pointer">
					VueShare
				</router-link>
			</v-toolbar-title>

			<v-spacer></v-spacer>

			<!-- search input -->
			<v-text-field flex prepend-icon="search" placeholder="Search posts" color="accent" single-line hide details>
			</v-text-field>

			<v-spacer></v-spacer>

			<v-toolbar-items class="hidden-xs-only">
				<v-btn flat v-for="item in horizontalNavItems" :key="item.title" :to="item.link">
					<v-icon class="hidden-sm-only" left>{{item.icon}}</v-icon>
					{{item.title}}
				</v-btn>

				<!-- Profile button -->
				<v-btn flat to="/profile" v-if="user">
					<v-icon class="hidden-sm-only" left>account_box</v-icon>
					<v-badge right color="accent">
						<!-- <span slot="badge">1</span> -->
						Profile
					</v-badge>
				</v-btn>

				<!-- Signout button -->
				<v-btn flat v-if="user" @click="handleUserSignOut">
					<v-icon class="hidden-sm-only">exit_to_app</v-icon>
					Signout
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<!-- app content -->
		<main>
			<v-container class="mt-4">
				<transition name="fade">
					<router-view />
				</transition>

				<!-- Auth snack bar -->
				<v-snackbar color="success" v-model="authSnackBar" :timeout="5000" bottom left>
					<v-icon class="mr-3">check_circle</v-icon>
					<h3>You are now signed in!</h3>
					<v-btn dark flat @click="authSnackBar = false">Close</v-btn>
				</v-snackbar>

				<!-- Auth Error snack bar -->
				<v-snackbar v-if="authError" color="info" v-model="authErrorSnackBar" :timeout="5000" bottom left>
					<v-icon class="mr-3">cancel</v-icon>
					<h3>{{authError.message}}</h3>
					<v-btn dark flat to="/signin">Signin</v-btn>
				</v-snackbar>
			</v-container>
		</main>
	</v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "app",
	data() {
		return {
			sideNav: false,
			authSnackBar: false,
			authErrorSnackBar: false
		}
	},
	computed: {
		...mapGetters(['authError', 'user']),
		horizontalNavItems() {
			// change the navbar state if the user is authenticated
			let items = [
				{ icon: "chat", title: "Posts", link: "/posts" },
				{ icon: "lock_open", title: "Sign in", link: "/signin" },
				{ icon: "create", title: "Sign Up", link: "/signup" },
			]
			if (this.user)
				items = [{ icon: "chat", title: "Posts", link: "/posts" }]

			return items;
		},
		sideNavItems() {
			// change the side navbar state if the user is authenticated
			let items = [
				{ icon: "chat", title: "Posts", link: "/posts" },
				{ icon: "lock_open", title: "Sign in", link: "/signin" },
				{ icon: "create", title: "Sign Up", link: "/signup" },
			]
			if (this.user)
				items = [
					{ icon: "chat", title: "Posts", link: "/posts" },
					{ icon: "stars", title: "Create Posts", link: "/posts/add" },
					{ icon: "account_box", title: "Profile", link: "/profile" },
				]

			return items
		}
	},
	methods: {
		handleUserSignOut() {
			this.$store.dispatch('signoutUser')
		}
	},
	watch: {
		user(newValue, oldValue) {
			//if we had no value for the user before, show snackbar
			if (oldValue === null) this.authSnackBar = true
		},
		authError(value) {
			//if auth error is not null, show auth error message
			if (value !== null) this.authErrorSnackBar = true;
		}
	}
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

