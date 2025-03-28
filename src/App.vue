<template>
  <div class="app-container">
    <header v-if="$route.path !== '/calendar'" class="app-header">
      <div class="calendar-btn-container">
        <router-link to="/calendar" class="calendar-btn">📅 Voir le Calendrier</router-link>
      </div>
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
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: #2c3e50;
  color: white;
  width: 100%;
  max-width: 650px;
  border-radius: 10px;
  height: 100px;
  margin-bottom: 20px;
}

.calendar-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.calendar-btn {
  background: #2c974b;
  color: white;
  padding: 10px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.calendar-btn:hover {
  background: #247f3d;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 650px;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .app-header {
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    height: auto;
  }
  .calendar-btn {
    font-size: 0.85rem;
    padding: 8px 12px;
  }
  .content {
    width: 90%;
    padding: 20px;
  }
}
</style>
