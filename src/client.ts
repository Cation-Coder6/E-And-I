// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { eventRegisterClient } from './services/event-register/event-register.shared'
export type {
  EventRegister,
  EventRegisterData,
  EventRegisterQuery,
  EventRegisterPatch
} from './services/event-register/event-register.shared'

import { internshipClient } from './services/internship/internship.shared'
export type {
  Internship,
  InternshipData,
  InternshipQuery,
  InternshipPatch
} from './services/internship/internship.shared'

import { eventsClient } from './services/events/events.shared'
export type { Events, EventsData, EventsQuery, EventsPatch } from './services/events/events.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the e-and-i-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(eventsClient)
  client.configure(internshipClient)
  client.configure(eventRegisterClient)
  return client
}
