import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
    iconfont: 'md',
    theme: {
        primary: "#0097A7",
        secondary: "#00BCD4",
        accent: "#FFA000",
        error: colors.red.darken4,
        warning: colors.amber.base,
        info: colors.blue.base,
        success: colors.green.base
    }
})