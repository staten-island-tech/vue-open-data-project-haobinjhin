<template>
  <br>
  <div class="container"><canvas ref="percentageofincidents"></canvas></div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'


Chart.register(ArcElement, Tooltip, Legend)

async function getincident() {
  try {
    let res = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json/')
    const data = await res.json()
    return data

  } catch (error) {
    console.log('error')
  }
}


const percentageofincidents = ref(null)

onMounted(async () => {
  const allIncidents = await getincident()

  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']

  let boroughCount = 0

  const percentage = ref([])

  boroughs.forEach((singleborough) => {
    allIncidents.forEach((incident) => {
      if (incident.borough == singleborough) {
        boroughCount++
      }
    })
    let boroughpercent = Math.round((boroughCount / allIncidents.length) * 1000)/10
    percentage.value.push(boroughpercent)
    boroughCount = 0
  })

  if (percentageofincidents.value){
    new Chart(
      percentageofincidents.value,
      {
        type:'pie',
        data:{
          labels: boroughs,
          datasets: [
            {
              label: "Percentage of Incidents",
              data: percentage.value,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#17f6fa", "#fa17d8"]
            }
          ]
        },
        options: {
          responsive: true,
          
    }
  }
    )
  }
})
</script>

<style scoped>




</style>
