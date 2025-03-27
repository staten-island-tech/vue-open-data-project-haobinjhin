<template>
  <br>

  <div class="dropdown" @click="opendropdown">
    <button class="dropdownbtn" >{{selectedchart || "Select a Chart"}}</button>
    <div v-if="open" class="stuffindropdown">
    <a v-for="chart in piecharts" href="#" @click="selectChart(chart)">{{ chart }}</a>
  </div> 

  </div>

  <br>

  <div class="chartcontainer">
    <canvas ref="percentageofincidents"></canvas>
  </div>
  
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {Chart, ArcElement, Tooltip, Legend} from 'chart.js/auto'


Chart.register(ArcElement, Tooltip, Legend)

const open = ref(false)
const selectedchart = ref("")
let storedchart = null

async function getincident() {
  try {
    let res = await fetch('https://data.cityofnewyork.us/resource/ii3r-svjz.json/')
    const data = await res.json()
    return data

  } catch (error) {
    console.log('error')
  }
}

function opendropdown(){
  open.value = !open.value
}

function selectChart(chart){
    selectedchart.value = chart
    console.log(selectedchart.value)
  }

const piecharts = ["Borough", "Community District", "Fire Catergory"]


const percentageofincidents = ref(null)

onMounted(async () => {
  const allIncidents = await getincident()

  const boroughs = ['Brooklyn', 'Queens', 'Manhattan', 'Bronx', 'Staten Island']

  const district = ['8', '2', '5', '12', '4', '10', '7', '11', '3', '1', '6', '9', '18', '13', '16', '14', '17', 'Out of NYC', '15']

  const causesoffire = ["Smoking", "Incendiary", "Other", "Open Flame", "No Fire", "Electrical Devices", "Cooking Carelessness", 
  "Electrical", "Motors", "Hot Objects", "Heaters", "Appliances", "Natural Sources", "Ignitable"]

   function filteringpie(types){
    let count = 0 
    let templist = []
    types.forEach((type) => {
      allIncidents.forEach((incident) => {
        if (Object.values(incident).includes(type)){
          count++
        }
      })
      let percent = Math.round((count / allIncidents.length) * 1000)/10
      count = 0
      templist.push(percent)
      
    }
  )
  return templist
}


  const boroughpercentage = filteringpie(boroughs)
  const districtpercentage = filteringpie(district)
  const causesoffirepercentage = filteringpie(causesoffire)

  
  function createspecificchart(types, typesdata){
    if (percentageofincidents.value){

      if (storedchart){
        storedchart.destroy()
      }

    storedchart = new Chart(
      percentageofincidents.value,
      {
        type:'pie',
        data:{
          labels: types,
          datasets: [
            {
              label: "Percentage of Incidents",
              data: typesdata,
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
  }

  watch(selectedchart, (newvalue) => {
    if (newvalue === piecharts[0]) {
      createspecificchart(boroughs, boroughpercentage)
    } else if (newvalue === piecharts[1]) {
      createspecificchart(district, districtpercentage)
    } else if (newvalue === piecharts[2]) {
      createspecificchart(causesoffire, causesoffirepercentage)
    }
  })


})
</script>

<style scoped>

.dropdown {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
}

.dropdownbtn {
  background-color: #f9f9f9;
  color: black;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 300px;
}

.stuffindropdown {
  position: absolute;
  background-color: #f9f9f9;
  width: 300px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.stuffindropdown a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.stuffindropdown a:hover {
  background-color: #ececec;
}

canvas{
  height: 500px;
  width: 500px;
}

.chartcontainer{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

</style>
