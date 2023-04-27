// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  internshipDataValidator,
  internshipPatchValidator,
  internshipQueryValidator,
  internshipResolver,
  internshipExternalResolver,
  internshipDataResolver,
  internshipPatchResolver,
  internshipQueryResolver
} from './internship.schema'

import type { Application } from '../../declarations'
import { InternshipService, getOptions } from './internship.class'
import { internshipPath, internshipMethods } from './internship.shared'

export * from './internship.class'
export * from './internship.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const internship = (app: Application) => {
  // Register our service on the Feathers application
  app.use(internshipPath, new InternshipService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: internshipMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(internshipPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(internshipExternalResolver),
        schemaHooks.resolveResult(internshipResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(internshipQueryValidator),
        schemaHooks.resolveQuery(internshipQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(internshipDataValidator),
        schemaHooks.resolveData(internshipDataResolver)
      ],
      patch: [
        schemaHooks.validateData(internshipPatchValidator),
        schemaHooks.resolveData(internshipPatchResolver)
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
    [internshipPath]: InternshipService
  }
}
