<template>
  <section>
    <h2 class="title">Liste des événements</h2>

    <form @submit.prevent="addEvent" class="event-form">
      <input v-model="form.title" type="text" placeholder="Titre" required />
      <input v-model="form.date" type="date" required />
      <input v-model="form.location" type="text" placeholder="Lieu" required />
      <button type="submit">Ajouter</button>
    </form>

    <ul class="event-list">
      <li v-for="event in sortedEvents" :key="event.id">
        <EventItem :event="event" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { fetchEvents, postEvent } from '@/services/eventServices';
import EventItem from '@/components/EventItem.vue';
import type { Event } from '@/models/Event';

const events = ref<Event[]>([]);
const form = ref({ title: '', date: '', location: '' });

const sortedEvents = computed(() =>
  [...events.value].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
);

const addEvent = async () => {
  const newEvent = await postEvent(form.value);
  events.value.push(newEvent);
  form.value = { title: '', date: '', location: '' };
};

onMounted(async () => {
  events.value = await fetchEvents();
});
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.event-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

input, button {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button {
  background: #2c974b;
  color: white;
  cursor: pointer;
}
button:hover {
  background: #247f3d;
}

.event-list {
  list-style: none;
  padding: 0;
}

@media (max-width: 768px) {
  .event-form {
    width: 100%;
  }
  input, button {
    width: 100%;
  }
  .title {
    font-size: 1.2rem;
  }
}
</style>
