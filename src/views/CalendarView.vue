<template>
  <section>
    <h2 class="text-xl font-bold mb-4">Calendrier des événements</h2>
    <FullCalendar :options="calendarOptions" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchEvents } from '@/services/eventServices';

const events = ref<{ title: string; start: string }[]>([]);

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: events,
});

onMounted(async () => {
  const eventList = await fetchEvents();
  events.value = eventList.map(e => ({ title: e.title, start: e.date }));
});
</script>

<style scoped>
section {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>
