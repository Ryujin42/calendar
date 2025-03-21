<template>
  <article>
    <h2>{{ event.title }}</h2>
    <p>{{ formatDate(event.date) }} - {{ event.location }}</p>
  </article>
</template>

<script setup lang="ts">
import type { Event } from '@/models/Event'
import { formatDate } from '@/utils/dateUtils'

defineProps<{ event: Event }>()
</script>
