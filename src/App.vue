<template>
  <div class="app-container">
    <header v-if="$route.path !== '/calendar'" class="app-header">
      <h1 class="title">Agenda d’événements sobres</h1>
      <router-link to="/calendar" class="calendar-btn">📅 Voir le Calendrier</router-link>
    </header>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink, useRoute } from 'vue-router';
const $route = useRoute();
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: #f8f9fa;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #2c3e50;
  color: white;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  position: relative;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  flex: 1;
  text-align: center;
}

.calendar-btn {
  background: #2c974b;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.calendar-btn:hover {
  background: #247f3d;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    text-align: center;
    gap: 10px;
    padding: 15px;
  }
  .title {
    font-size: 1.2rem;
  }
  .calendar-btn {
    width: auto;
    font-size: 0.8rem;
    padding: 6px 10px;
  }
}
</style>
