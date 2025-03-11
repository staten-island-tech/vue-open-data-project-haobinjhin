<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue';
import { elements } from 'chart.js';
import {ref, onMounted} from 'vue'


const boroughCount = ref({})

const allIncidents = ref([])

async function getincident(){
  try {
    let response = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json')
    let data = await response.json();
    allIncidents.value = data.results
    
  } catch (error){
    console.log("error")
  }
}

onMounted(() => {

  getincident();

  console.log(allIncidents)

  const boroughs = ["Brooklyn", "Queens", "Manhattan", "Bronx", "Staten Island"]



  let percentage = []

  

  boroughs.forEach((singborough) => { 
    
    allIncidents.value.filter((maybeborough) => {
      if(maybeborough.borough == singborough){
        boroughCount[element] += 1 
    } else { 
      boroughCount[element] = 1
    }
  })

  let boroughpercent = (boroughCount/allIncidents.length)*100
  percentage.push(boroughpercent)

  console.log(percentage)
})})









</script>

<template>

  <div class="container">

    <IncidentsCard
    v-for="(incident, index) in allIncidents"
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