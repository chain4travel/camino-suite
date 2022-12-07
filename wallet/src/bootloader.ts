import Vue from 'vue'
import store from './store'
import VueMeta from 'vue-meta'
import router from './router'
import App from './App.vue'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import i18n from './plugins/i18n'
import BootstrapVue from 'bootstrap-vue'
import vuetify from '@/plugins/vuetify'

Vue.use(VueMeta)
Vue.use(BootstrapVue)
Vue.component('datetime', Datetime)

export const mount = (el) => {
    const app = new Vue({
        router,
        store,
        vuetify,
        i18n,
        render: (h) => h(App),
        created: () => {
            store.commit('Accounts/loadAccounts')
            if (store.getters['Accounts/hasAccounts'] > 0) router.replace('/wallet/access')
        },
        mounted() {
            // Reveal app version
            console.log(`App Version: ${process.env.VUE_APP_VERSION}`)
            // Hide loader once vue is initialized
            let loader = document.getElementById('app_loading')
            if (loader) {
                loader.style.display = 'none'
            }
        },
        data: {
            theme: 'night',
        },
    })
    app.$mount(el)
}

// mount("#app");
