<script setup>
import IncidentsCard from '@/components/IncidentsCard.vue'
import { ref, onMounted, onBeforeMount } from 'vue'



async function getincident() {
  try {
    let res = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json/')

    const data = await res.json()
    return data

    return res.json()
  } catch (error) {
    console.log('error')
  }
}

const allIncidents = ref([])


onBeforeMount(() => {})

onMounted(async () => {
  try {
    allIncidents.value = await getincident()
    let boroughCount = 0
    let percentage = ref([])
    const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']

    boroughs.forEach((borough) => {
      allIncidents.value.forEach((incident) => {
        if(incident.borough == borough){
          boroughCount ++
        }
      })
      percentage.value.push(Math.round((boroughCount/allIncidents.value.length)*1000)/10)
      boroughCount = 0


      /* Math.round(num*10)/10 */
    })
    console.log(allIncidents.value.length)
    console.log(percentage.value)


  } catch (error){
    console.log('error')
  }
})
onBeforeMount(async () => {
  const allIncidents = await getincident()
})

onMounted(async () => {
  const allIncidents = await getincident()

  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']

  let percentage = ref([])

  boroughs.forEach((singleborough) => {
    allIncidents.forEach((incident) => {
      if (incident.borough == singleborough) {
        boroughCount++
      }
    })
    let boroughpercent = (boroughCount / allIncidents.length) * 100
    percentage.value.push(boroughpercent)
    boroughCount = 0
  })
  console.log(percentage.value)

  data = {
    datasets: [
      {
        data: percentage.value,
      },
    ],
    labels: ['Red', 'Yellow', 'Blue', 'Green', 'Orange'],
  }

  const config = {
    type: 'pie',
    data: data,
  }
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
