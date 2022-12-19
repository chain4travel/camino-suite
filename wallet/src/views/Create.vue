<template>
    <div class="access_view">
        <create-wallet :navigate="navigate" :setLogged="setLogged"></create-wallet>
    </div>
</template>
<script lang="ts">
import 'reflect-metadata'
import { Vue, Component, Prop } from 'vue-property-decorator'

import CreateWallet from '@/components/CreateWalletWorkflow/CreateWallet.vue'

@Component({
    components: {
        CreateWallet,
    },
    metaInfo: () => {
        const description =
            "Here at Avalanche, we've made storing digital assets easy. Create an Avalanche wallet today is see what the buzz is all about!"
        return {
            meta: [
                {
                    vmid: 'description',
                    name: 'description',
                    content: description,
                },
                {
                    vmid: 'og:description',
                    name: 'description',
                    content: description,
                },
                {
                    vmid: 'og:title',
                    name: 'og:title',
                    content: 'Create | Avalanche Wallet',
                },
            ],
            title: 'Create',
        }
    },
})
export default class Create extends Vue {
    @Prop() navigate: any
    @Prop() setLogged: any
}
</script>

<style scoped lang="scss">
@use '../styles/main';

.access_view {
    /*display: grid;*/
    /*grid-template-columns: 1fr 1fr;*/
    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    text-align: center;
}

a {
    color: #1d82bb !important;
}
</style>
