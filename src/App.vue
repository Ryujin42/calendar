// src/App.vue
<template>
  <div>
    <header class="app-header">
      <h1>Agenda d’événements sobres</h1>
      <router-link to="/calendar" class="calendar-btn">📅 Voir le Calendrier</router-link>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #2c3e50;
  color: white;
}

.calendar-btn {
  background: #2c974b;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
}
.calendar-btn:hover {
  background: #247f3d;
}
</style>
