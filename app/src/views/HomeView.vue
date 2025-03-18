<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue';
import {ref, onMounted} from 'vue'


let boroughCount = 0

const allIncidents = ref([])

async function getincident(){
  try {
    let res = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json')

    if (res.ok){
      const data = await res.json();

    }
    
  } catch (error){
    console.log("error")
  }
}


onMounted(() => {

  allIncidents.value.push(getincident())

  allIncidents.value.forEach((things) => {
    if (things.borough === "Brooklyn"){
      console.log(things)
    }
  }) 

   const boroughs = ["Brooklyn", "Queens", "Manhattan", "Bronx", "Staten Island"]

  let percentage = []

  boroughs.forEach((singleborough) => { 
    
    allIncidents.value.filter((maybeborough) => {
      if(maybeborough.borough === singleborough){
        boroughCount += 1 
    } else { 
      boroughCount = 1
    }
  })

  let boroughpercent = (boroughCount/allIncidents.length)*100
  percentage.push(boroughpercent)
  boroughCount = 0
  
})

console.log(...percentage)
 


})


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