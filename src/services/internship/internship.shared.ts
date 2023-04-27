// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Internship,
  InternshipData,
  InternshipPatch,
  InternshipQuery,
  InternshipService
} from './internship.class'

export type { Internship, InternshipData, InternshipPatch, InternshipQuery }

export type InternshipClientService = Pick<
  InternshipService<Params<InternshipQuery>>,
  (typeof internshipMethods)[number]
>

export const internshipPath = 'internship'

export const internshipMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const internshipClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(internshipPath, connection.service(internshipPath), {
    methods: internshipMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [internshipPath]: InternshipClientService
  }
}
