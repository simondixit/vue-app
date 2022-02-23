import { createApp, h, provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './apollo-client'
import App from './App.vue'
import './index.css'

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.mount('#app')
