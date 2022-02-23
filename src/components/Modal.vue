<script setup lang="ts">
import { useQuery, useResult } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const myProps = defineProps<{
  pokemon: string
}>()

const { result, loading } = useQuery(gql `query {
  getPokemon(pokemon: ${myProps.pokemon} reverseFlavorTexts: true takeFlavorTexts: 1) {
    num
    baseStats { hp attack defense specialattack specialdefense speed }
    sprite
  }
}`)

const data = useResult(result, null, data => data.getPokemon)

</script>

<template>
  <div class="absolute w-screen h-screen inset-0 bg-black flex justify-center items-center" @click="$emit('close')">
    <div class="bg-cyan-900 rounded-lg w-80 h-80">
      <div class="w-full bg-slate-100 h-28 p-8">
        <div class="w-24 mx-auto my-4 rounded-full bg-slate-100">
          <img :src="data.sprite" alt="pokemon sprite" v-if="!loading" />
          <img class="rounded-full" src="../assets/loader.gif" alt="loader" v-if="loading" />
        </div>
        <p class="text-xl text-center text-slate-300 capitalize">{{ pokemon }} <span class="text-sm px-2.5 bg-rose-700 rounded-full">#{{loading ? '' : data.num}}</span></p>
        <ul class="flex-col mt-2 px-16" v-if="!loading">
          <li class="flex justify-between text-slate-300">
            <p class="text-base text-center">HP: </p>
            <p>{{ data.baseStats.hp }}</p>
          </li>
          <li class="flex justify-between text-slate-300">
            <p class="text-base text-center">Attack: </p>
            <p>{{ data.baseStats.attack }}</p>
          </li>
          <li class="flex justify-between text-slate-300">
            <p class="text-base text-center">Defense: </p>
            <p>{{ data.baseStats.defense }}</p>
          </li>
          <li class="flex justify-between text-slate-300">
            <p class="text-base text-center">Speed: </p>
            <p>{{ data.baseStats.speed }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>