import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
//import { createProvider } from './vue-apollo'
import FormAlert from './components/Shared/FormAlert';

Vue.component('form-alert', FormAlert);

Vue.use(VueApollo);

export const defaultClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    //include auth token with request made to backend
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        //if no token with key of 'token' in localstorage, add it
        if (!localStorage.token) localStorage.setItem('token', '')
            //operation adds the token to an authorization header, which is sent to the backend
        operation.setContext({
            headers: {
                authorization: localStorage.getItem('token')
            }
        })
    },
    onError: ({ graphQLErrors, networkError }) => {
        const errors = graphQLErrors;
        console.log('graphQlErrors', graphQLErrors);
        if (networkError) console.log('[networkError]', networkError);
        if (errors) {
            for (const err of errors) {
                console.dir(err.name);
                if (err.name === 'AuthenticationError') {
                    //set auth error in state (to show in snackbar)
                    store.commit('setAuthError', err);
                    //signout user (to clear token)
                    store.dispatch('signoutUser')
                }
            }
        }
    }
});

const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false

new Vue({
    router,
    store,
    apolloProvider, //: createProvider(),
    created() {
        this.$store.dispatch('getCurrentUser');
    },
    render: h => h(App)
}).$mount('#app')