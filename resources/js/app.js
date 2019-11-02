// Pull in bootstrap.js
require('./bootstrap');

// Vue import
import Vue from 'vue'

// Vuetify settings
import Vuetify from 'vuetify'
Vue.use(Vuetify)
const vuetifyOpts = {
    theme: {
        dark: true
    },
}

//Primary components
import App from './components/App'

// App declaration
const app = new Vue({
    el: '#app',
    components: {
        App
    },
    vuetify: new Vuetify(vuetifyOpts),
});
