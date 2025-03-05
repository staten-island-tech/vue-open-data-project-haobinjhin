<template>
    <div class="card">
        
        <h2>{{ incidents.case_number }}</h2>
        <h2>{{ id }}</h2>
        <h3>{{ incidents.borough }}</h3>
        <h3>{{ incidents.cause_fire_description }}</h3>
        <h3>{{ incidents.incident_datetime }}</h3>


    </div> 
</template>

<script setup>


const props = defineProps({
    incidents:Object,
    id: Number,
})

    
</script>

<style scoped>

</style>