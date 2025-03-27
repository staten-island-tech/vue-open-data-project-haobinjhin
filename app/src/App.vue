<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

  <h1>Fire Incidents In NYC</h1>
  <br>
  <header>

      <nav>
        <RouterLink to="/">Percentage</RouterLink>
        <RouterLink to="/Borough">Borough</RouterLink>
      </nav>
    
  </header>

  <RouterView />
</template>

<style scoped>

h1{
  text-align: center;
  margin: 0;
}

header {
  max-height: 100vh;
  max-width: 100vw;
}



nav {
  width: 100%;
  font-size: 20px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (max-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
