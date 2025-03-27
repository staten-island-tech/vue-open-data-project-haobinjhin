<template>
  <br>

  <div class="container"><canvas ref="bargraphofincidents"></canvas></div>
 
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

const bargraphofincidents = ref(null)

onMounted(async() => {
  const allIncidents = await getincident()
  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']
  let tempborough = []
  const numofborough = ref([])

  boroughs.forEach((singleborough) => {
    allIncidents.filter((incident) => {
      if (incident.borough == singleborough) {
        tempborough.push(incident.borough)
      }
    })
    numofborough.value.push(tempborough.length)
    tempborough = []
  })  

    if (bargraphofincidents.value){
    new Chart(
      bargraphofincidents.value,
      {
        type:'bar',
        data:{
          labels: boroughs,
          datasets: [
            {
              label: "Number of Incidents",
              data: numofborough.value,
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

<style>

canvas{
  height: 500px;
  width: auto;
}





</style>
