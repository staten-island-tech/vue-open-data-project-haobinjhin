<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue';
import {ref, onMounted} from 'vue'


const boroughCount = ref({})

async function getincident(){
  try {
    let response = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json')
    let data = await response.json();
    return data
    
  } catch (error){
    console.log("error")
  }
}

onMounted(() => {
  const boroughs = ["Brooklyn", "Queens", "Manhattan", "Bronx", "Staten Island"]

  let allIncidents = getincident();

  console.log(allIncidents)

  let percentage = []



  boroughs.forEach((borough) => { 
    
    allIncidents.forEach((incident) => {
    if (incident.borough == borough) {
      boroughCount[element] += 1
    } else {
      boroughCount[element] = 1
  };

  let boroughpercent = (allIncidents.length/boroughCount)*100
  percentage.push(boroughpercent)
})})

console.log(percentage)




}
)



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