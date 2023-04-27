// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  eventRegisterDataValidator,
  eventRegisterPatchValidator,
  eventRegisterQueryValidator,
  eventRegisterResolver,
  eventRegisterExternalResolver,
  eventRegisterDataResolver,
  eventRegisterPatchResolver,
  eventRegisterQueryResolver
} from './event-register.schema'

import type { Application } from '../../declarations'
import { EventRegisterService, getOptions } from './event-register.class'
import { eventRegisterPath, eventRegisterMethods } from './event-register.shared'

export * from './event-register.class'
export * from './event-register.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const eventRegister = (app: Application) => {
  // Register our service on the Feathers application
  app.use(eventRegisterPath, new EventRegisterService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: eventRegisterMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(eventRegisterPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(eventRegisterExternalResolver),
        schemaHooks.resolveResult(eventRegisterResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(eventRegisterQueryValidator),
        schemaHooks.resolveQuery(eventRegisterQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(eventRegisterDataValidator),
        schemaHooks.resolveData(eventRegisterDataResolver)
      ],
      patch: [
        schemaHooks.validateData(eventRegisterPatchValidator),
        schemaHooks.resolveData(eventRegisterPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [eventRegisterPath]: EventRegisterService
  }
}
