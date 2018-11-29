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
			</v-toolbar-items>
		</v-toolbar>

		<!-- app content -->
		<main>
			<v-container class="mt-4">
				<transition name="fade">
					<router-view />
				</transition>
			</v-container>
		</main>
	</v-app>
</template>

<script>
export default {
	name: "app",
	data() {
		return {
			sideNav: false
		}
	},
	computed: {
		horizontalNavItems() {
			return [
				{ icon: "chat", title: "Posts", link: "/posts" },
				{ icon: "lock_open", title: "Sign in", link: "/signin" },
				{ icon: "create", title: "Sign Up", link: "/signup" },
			]
		},
		sideNavItems() {
			return [
				{ icon: "chat", title: "Posts", link: "/posts" },
				{ icon: "lock_open", title: "Sign in", link: "/signin" },
				{ icon: "create", title: "Sign Up", link: "/signup" },
			]
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
