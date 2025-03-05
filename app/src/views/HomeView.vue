<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue';
import {ref, onMounted} from 'vue'

const incidents = ref([])
async function getincident(){
  try {
    let response = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json')
    let data = await response.json();
    incidents.value = data;
    console.log(incidents.value)
  } catch (error){
    console.log("error")
  }
}


onMounted(() => {
  getincident();
})



</script>

<template>

  <div class="container">

    <IncidentsCard
    v-for="(incident, index) in incidents"
    :key="incident.case_number"
    :id="index + 1"
    :incidents = "incident"
    />  

  </div>
  
</template>

<style scoped>

.container{
  display: flex;
  flex: 20%;
  flex-wrap: wrap;
}


</style>