<template>
  <div class="Borough">
    <h1></h1>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const nycincident = ref([])
async function boroughincidents(){
  try{
    


  } catch(error){

  }

}

onMounted(() => {boroughincidents();})


</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
