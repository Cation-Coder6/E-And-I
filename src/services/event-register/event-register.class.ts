// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type {
  EventRegister,
  EventRegisterData,
  EventRegisterPatch,
  EventRegisterQuery
} from './event-register.schema'

export type { EventRegister, EventRegisterData, EventRegisterPatch, EventRegisterQuery }

export interface EventRegisterParams extends MongoDBAdapterParams<EventRegisterQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class EventRegisterService<ServiceParams extends Params = EventRegisterParams> extends MongoDBService<
  EventRegister,
  EventRegisterData,
  EventRegisterParams,
  EventRegisterPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('event-register'))
  }
}
