// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  EventRegister,
  EventRegisterData,
  EventRegisterPatch,
  EventRegisterQuery,
  EventRegisterService
} from './event-register.class'

export type { EventRegister, EventRegisterData, EventRegisterPatch, EventRegisterQuery }

export type EventRegisterClientService = Pick<
  EventRegisterService<Params<EventRegisterQuery>>,
  (typeof eventRegisterMethods)[number]
>

export const eventRegisterPath = 'event-register'

export const eventRegisterMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const eventRegisterClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(eventRegisterPath, connection.service(eventRegisterPath), {
    methods: eventRegisterMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [eventRegisterPath]: EventRegisterClientService
  }
}
