import type { Event } from '@/models/Event'

let id = 1
const mockDb: Event[] = []

export async function fetchEvents(): Promise<Event[]> {
  return Promise.resolve([...mockDb])
}

export async function postEvent(data: Omit<Event, 'id'>): Promise<Event> {
  const newEvent: Event = { id: id++, ...data }
  mockDb.push(newEvent)
  return Promise.resolve(newEvent)
}
