import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from "./main";
import { GET_POST, SIGNIN_USER, GET_CURRENT_USER } from './queries/queries'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        posts: [],
        loading: false
    },
    mutations: {
        setPosts: (state, payload) => {
            state.posts = payload;
        },
        setLoading: (state, payload) => {
            state.loading = payload
        },

    },
    actions: {
        getCurrentUser: async({ commit }) => {
            commit('setLoading', true);
            try {
                const { data } = await apolloClient.query({ query: GET_CURRENT_USER })
                console.log(res);
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
            try {
                const { data } = await apolloClient.mutate({
                    mutation: SIGNIN_USER,
                    variables: payload
                });
                localStorage.setItem('token', data.signinUser.token)
            } catch (error) {
                console.log(error);
            }
        }
    },
    getters: {
        posts: state => state.posts,
        loading: state => state.loading
    }
})