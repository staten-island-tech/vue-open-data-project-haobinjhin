<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import {ref, onMounted} from 'vue'

const fireincident = ref("")
async function getincident(){

  try {
    let response = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json')
    let data = await response.json();
    fireincident.value = data;
    console.log(fireincident.value)
  } catch (error){
    console.log("error")
  }

}

getincident()






</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
