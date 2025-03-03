<template>
    <RouterLink :to="incidentPath" class="card">
        
        <h2>{{ incidents.case_number }}</h2>
        <h2>{{ id }}</h2>


    </RouterLink> 
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    incidents:Object,
    id: Number,
})

const incidentPath = computed(() =>{
    return `/incident/${props.incidents.case_number}`
})
    
</script>

<style scoped>

</style>