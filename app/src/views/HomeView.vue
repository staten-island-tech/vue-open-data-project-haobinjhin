<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue'
import { ref, onMounted } from 'vue'

let boroughCount = 0

async function getincident() {
  try {
    let res = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json/').then(
      (respon) => {
        respon.json()
      },
    )
    return res
  } catch (error) {
    console.log('error')
  }
}

onMounted(() => {
  const allIncidents = getincident()

  console.log(allIncidents)

  allIncidents.value.forEach((things) => {
    things.forEach((item) => {
      if (item.borough == 'Brooklyn') {
        console.log(item)
      }
    })
    console.log(things)
  })

  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']

  let percentage = []

  boroughs.forEach((singleborough) => {
    allIncidents.value.filter((innerlist) => {
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
  })

  console.log(percentage)
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
