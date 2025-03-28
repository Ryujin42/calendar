import type { Event } from '@/models/Event'

const API_URL = 'http://zepplinium.com:3000/event'

type ApiEvent = {
  id: string;
  name: string;
  date: string;
  lieu: string;
};

function transformToClient(e: ApiEvent): Event {
  return {
    id: Number(e.id),
    title: e.name,
    date: e.date,
    location: e.lieu,
  };
}

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error('Erreur lors de la récupération des événements');
  }

  const json: ApiEvent[] = await res.json();
  return json.map(transformToClient);
}

export async function fetchEventById(id: string): Promise<Event> {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error(`Impossible de récupérer l’événement ${id}`);
  }

  const json: ApiEvent = await res.json();
  return transformToClient(json);
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
  });

  const text = await res.text();
  console.log('Réponse brute:', text);

  if (!res.ok) {
    console.error('Status:', res.status);
    throw new Error('Erreur lors de la création de l’événement');
  }

  const json: ApiEvent = JSON.parse(text);
  return transformToClient(json);
}
