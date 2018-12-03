<template>
    <div>
        <v-alert transition="scale-transition" type="error" color="error" :value="true" dismissible>
            <h3>{{message}}</h3>
        </v-alert>
    </div>
</template>

<script>
export default {
    props: ['message'],
}
</script>

<style scoped>
</style>