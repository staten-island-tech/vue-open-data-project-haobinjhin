<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import { compileScript } from 'vue/compiler-sfc'

let boroughCount = 0

async function getincident() {
  try {
    let res = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json/')
    const data = await res.json()
    filterincident(data)
    return data
  } catch (error) {
    console.log('error')
  }
}

function filterincident(incidents) {
  incidents.forEach((incident) => {
    if (incident.borough == 'Brooklyn') {
      console.log(incident)
    }
  })
}

onBeforeMount(() => {})

onMounted(() => {
  getincident()
  /* allIncidents.forEach((incident) => {
     things.forEach((item) => {
      if (item.borough == 'Brooklyn') {
        console.log(item)
      }
    })
    console.log(things) 
    if (incident.borough == 'Brooklyn') {
      console.log(incident)
    }
  }) */

  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']

  let percentage = []

  /* boroughs.forEach((singleborough) => {
    allIncidents.filter((innerlist) => {
      innerlist.forEach((maybeborough) => {
        if (maybeborough == singleborough) {
          boroughCount++
        } else {
          boroughCount = 1
        }
      })
    })

    let boroughpercent = (boroughCount / allIncidents.length) * 100
    percentage.push(boroughpercent)
    boroughCount = 0
  }) */

  /* console.log(percentage) */
})
</script>

<template>
  <div class="container">
    <IncidentsCard
      v-for="(incident, index) in allIncidents"
      :key="incident.case_number"
      :id="index + 1"
      :incidents="incident"
    />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex: 20%;
  flex-wrap: wrap;
}
</style>
