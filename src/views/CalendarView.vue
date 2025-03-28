<template>
  <section class="calendar-container">
    <h2 class="title">Calendrier des événements</h2>
    <router-link to="/" class="create-event-btn">➕ Ajouter un événement</router-link>

    <div class="calendar-header">
      <span class="calendar-title">{{ currentMonthYear }}</span>
      <div class="calendar-controls">
        <button @click="prevMonth" class="nav-btn">◀</button>
        <button @click="nextMonth" class="nav-btn">▶</button>
        <button @click="goToday" class="today-btn">Aujourd’hui</button>
      </div>
    </div>

    <FullCalendar
      ref="calendarRef"
      class="calendar"
      :options="calendarOptions"
      @datesSet="updateCurrentMonthYear"
    />

    <div v-if="selectedEvent" class="modal-overlay" @click.self="selectedEvent = null">
      <div class="modal">
        <h3>{{ selectedEvent.title }}</h3>
        <p><strong>Date :</strong> {{ formatDate(selectedEvent.date) }}</p>
        <p><strong>Lieu :</strong> {{ selectedEvent.location || 'Non précisé' }}</p>
        <button class="close-btn" @click="selectedEvent = null">Fermer</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg } from '@fullcalendar/core'
import { fetchEvents, fetchEventById } from '@/services/eventServices'

const events = ref<{ id: string; title: string; start: string }[]>([])
const calendarRef = ref()
interface Event {
  id: string;
  title: string;
  date: string;
  location?: string;
}

const selectedEvent = ref<Event | null>(null)
const currentMonthYear = ref('')

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  headerToolbar: false as const,
  events: events,
  eventClick: async (info: EventClickArg) => {
    try {
      const id = info.event.id
      const fullEvent = await fetchEventById(id)
      selectedEvent.value = { ...fullEvent, id: fullEvent.id.toString() }
    } catch (err) {
      console.error('Erreur lors de la récupération de l’événement', err)
    }
  },
})

const updateCurrentMonthYear = () => {
  const date = calendarRef.value.getApi().getDate()
  currentMonthYear.value = new Intl.DateTimeFormat('fr-FR', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

const prevMonth = () => {
  calendarRef.value.getApi().prev()
  updateCurrentMonthYear()
}
const nextMonth = () => {
  calendarRef.value.getApi().next()
  updateCurrentMonthYear()
}
const goToday = () => {
  calendarRef.value.getApi().today()
  updateCurrentMonthYear()
}

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateStr))
}

onMounted(async () => {
  const res = await fetchEvents()
  events.value = res.map(e => ({
    id: e.id.toString(),
    title: e.title,
    start: e.date,
  }))
  updateCurrentMonthYear()
})
</script>

<style scoped>
.calendar-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 20px;
}

.create-event-btn {
  display: block;
  margin: 0 auto 20px;
  max-width: 300px;
  background: #007bff;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  text-align: center;
  font-size: 1rem;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.create-event-btn:hover {
  background: #0056b3;
}

.calendar-header {
  text-align: center;
  margin-bottom: 15px;
}

.calendar-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.calendar-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.nav-btn, .today-btn {
  padding: 8px 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  background: #2c3e50;
  color: white;
  cursor: pointer;
}

.today-btn {
  background: #007bff;
}

.nav-btn:hover, .today-btn:hover {
  opacity: 0.9;
}

.calendar {
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal {
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal h3 {
  font-size: 1.4rem;
  margin-bottom: 12px;
}

.modal p {
  margin: 6px 0;
}

.close-btn {
  margin-top: 15px;
  padding: 10px 16px;
  font-size: 0.95rem;
  background: #2c974b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.close-btn:hover {
  background: #247f3d;
}

@media (max-width: 768px) {
  .calendar-container {
    width: 90%;
    padding: 16px;
  }
  .title {
    font-size: 1.4rem;
  }
  .calendar-controls {
    flex-direction: row;
    gap: 6px;
  }
  .nav-btn, .today-btn {
    font-size: 0.85rem;
    padding: 6px 10px;
  }
}
</style>
