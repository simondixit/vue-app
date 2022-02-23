<script lang="ts">
import { reactive } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

import Modal from './components/Modal.vue'

export default {
    setup() {
        const { result } = useQuery(gql `query { getAllPokemonSpecies(offset: 0, take: 24) }`),
        state = reactive({ displayModal: false, pokemon: '' })

        function showModal(pokemon: string): void {
          state.pokemon = pokemon.toLowerCase()
          state.displayModal = true
        }

        function hideModal(): void {
          state.displayModal = false
        }

        return {
            result,
            state,
            showModal,
            hideModal
        };
    },
    components: { Modal }
}

</script>

<template>
  <main class="bg-emerald-600 p-8 h-screen">
    <h1 class="text-3xl text-center font-bold text-slate-300">
      Select a pokemon to retrieve their pokedata!
    </h1>

    <ul class="grid text-slate-300 grid-cols-4 gap-4 pt-12 mt-4 border-t-2" v-if="result">
      <li
        class="border shadow-md rounded-md px-4 py-4 cursor-pointer hover:bg-emerald-900"
        :key="index"
        v-for="(pokemon, index) in result.getAllPokemonSpecies"
        @click="showModal(pokemon)"
      >
        {{ pokemon }}
      </li>
    </ul>
  </main>
  <Modal :pokemon="state.pokemon" v-if="state.displayModal" @close="hideModal" />
</template>