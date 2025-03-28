import type { Event } from '@/models/Event'

const API_URL = 'http://localhost:3000/event'

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(API_URL)
  if (!res.ok) throw new Error('Erreur lors de la récupération des événements')
  const json = await res.json()

  type ApiEvent = {
    id: string;
    name: string;
    date: string;
    lieu: string;
  };

  return json.map((e: ApiEvent) => ({
    id: e.id,
    title: e.name,
    date: e.date,
    location: e.lieu,
  }))
}

export async function createEvent(data: Omit<Event, 'id'>): Promise<Event> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event: {
        name: data.title,
        date: data.date,
        lieu: data.location,
      },
    }),
  })

  if (!res.ok) throw new Error('Erreur lors de la création de l’événement')

  const json = await res.json()

  return {
    id: json.id,
    title: json.name,
    date: json.date,
    location: json.lieu,
  }
}
