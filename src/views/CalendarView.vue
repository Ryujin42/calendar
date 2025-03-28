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
    <FullCalendar ref="calendarRef" :options="calendarOptions" class="calendar" @datesSet="updateCurrentMonthYear" />

    <div v-if="selectedEvent" class="modal-overlay" @click.self="selectedEvent = null">
      <div class="modal">
        <h3>{{ selectedEvent.title }}</h3>
        <p><strong>Date :</strong> {{ formatDate(selectedEvent.start) }}</p>
        <p><strong>Lieu :</strong> {{ selectedEvent.location || 'Non précisé' }}</p>
        <button class="close-btn" @click="selectedEvent = null">Fermer</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { EventClickArg } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchEvents } from '@/services/eventServices';

const events = ref<{ title: string; start: string; location?: string }[]>([]);
const calendarRef = ref();
const selectedEvent = ref<{ title: string; start: string; location?: string } | null>(null);

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: events,
  headerToolbar: {
    left: '',
    center: '',
    right: '',
  },
  eventClick: (info: EventClickArg) => {
    const clicked = events.value.find(e => e.title === info.event.title && e.start === info.event.startStr);
    selectedEvent.value = clicked || null;
  }
});

const currentMonthYear = ref('');

const updateCurrentMonthYear = () => {
  if (!calendarRef.value) return;
  const calendarApi = calendarRef.value.getApi();
  const date = calendarApi.getDate();
  currentMonthYear.value = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(date);
};

const prevMonth = () => {
  calendarRef.value.getApi().prev();
  updateCurrentMonthYear();
};
const nextMonth = () => {
  calendarRef.value.getApi().next();
  updateCurrentMonthYear();
};
const goToday = () => {
  calendarRef.value.getApi().today();
  updateCurrentMonthYear();
};

const formatDate = (dateStr: string) => {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr));
};

onMounted(async () => {
  const eventList = await fetchEvents();
  events.value = eventList.map(e => ({ title: e.title, start: e.date, location: e.location }));
  updateCurrentMonthYear();
});
</script>

<style scoped>
.calendar-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 15px;
}

.create-event-btn {
  display: block;
  width: 90%;
  max-width: 250px;
  margin-bottom: 20px;
  background: #007bff;
  color: white;
  padding: 12px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.3s;
}
.create-event-btn:hover {
  background: #0056b3;
}

.calendar-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}

.calendar-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.calendar-controls {
  display: flex;
  gap: 8px;
}

.nav-btn, .today-btn {
  padding: 8px 12px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background: #2c3e50;
  color: white;
  cursor: pointer;
}

.today-btn {
  background: #007bff;
}

.nav-btn:hover, .today-btn:hover {
  opacity: 0.8;
}

.calendar {
  width: 100%;
  max-width: 400px;
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
  z-index: 1000;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
}

.modal p {
  margin: 6px 0;
  font-size: 1rem;
}

.close-btn {
  margin-top: 15px;
  padding: 8px 14px;
  font-size: 0.9rem;
  background: #2c974b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.close-btn:hover {
  background: #247f3d;
}

@media (max-width: 768px) {
  .calendar-container {
    width: 90%;
    padding: 15px;
  }
  .title {
    font-size: 1.4rem;
  }
  .create-event-btn {
    width: 100%;
  }
  .calendar-header {
    width: 100%;
    text-align: center;
  }
  .calendar-controls {
    flex-direction: row;
    justify-content: center;
    gap: 5px;
  }
  .nav-btn, .today-btn {
    font-size: 0.9rem;
    padding: 6px 10px;
  }
  .fc-header-toolbar {
    display: none;
  }
}
</style>
