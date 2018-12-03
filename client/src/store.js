import Vue from 'vue'
import Vuex from 'vuex'
import router from './router';

import { defaultClient as apolloClient } from "./main";
import {
    GET_POST,
    SIGNIN_USER,
    GET_CURRENT_USER,
    SIGNUP_USER
} from './queries/queries';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        loading: false,
        user: null,
        error: null,
        authError: null
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload
        },
        setUser: (state, payload) => {
            state.user = payload;
        },
        setError: (state, payload) => {
            state.error = payload;
        },
        setAuthError: (state, payload) => {
            state.authError = payload;
        },
        clearUser: state => (state.user = null),
        clearError: state => (state.error = null)
    },
    actions: {
        getCurrentUser: async({ commit }) => {
            commit('setLoading', true);
            try {
                const { data } = await apolloClient.query({ query: GET_CURRENT_USER })
                console.log(data);
                commit('setUser', data.getCurrentUser)
                commit('setLoading', false);
            } catch (error) {
                console.log(error);
                commit('setLoading', true);
            }
        },
        getPost: async({ commit }) => {
            commit('setLoading', true);
            try {
                const { data } = await apolloClient.query({
                    query: GET_POST
                });
                commit('setPosts', data.getPosts)
                commit('setLoading', false);
            } catch (error) {
                commit('setLoading', false);
                console.log(error);
            }
        },
        signinUser: async({ commit }, payload) => {
            commit('clearError')
            commit('setLoading', true);
            //refresh the error state
            commit('clearError', null)
            try {
                const { data } = await apolloClient.mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                });
                localStorage.setItem('token', data.signinUser.token)
                commit('setLoading', false);
                router.go();
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error)
                console.log(error);
            }
        },
        signoutUser: async({ commit }) => {
            // clear user in state
            commit('clearUser')
                //remove token in localstorage
            localStorage.setItem('token', '')
                //end session
            await apolloClient.resetStore();
            //redirect home, kick users out of private pages
            router.push("/");
        },
        signupUser: async({ commit }, payload) => {
            commit('clearError');
            commit('setLoading', true);
            //refresh the error state
            commit('clearError', null)
            try {
                const { data } = await apolloClient.mutate({
                    mutation: SIGNUP_USER,
                    variables: payload
                });
                localStorage.setItem('token', data.signupUser.token)
                commit('setLoading', false);
                router.go();
            } catch (error) {
                commit('setLoading', false);
                commit('setError', error)
                console.log(error);
            }
        }
    },
    getters: {
        posts: state => state.posts,
        loading: state => state.loading,
        user: state => state.user,
        error: state => state.error,
        authError: state => state.authError
    }
})