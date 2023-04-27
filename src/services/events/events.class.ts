// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Events, EventsData, EventsPatch, EventsQuery } from './events.schema'

export type { Events, EventsData, EventsPatch, EventsQuery }

export interface EventsParams extends MongoDBAdapterParams<EventsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class EventsService<ServiceParams extends Params = EventsParams> extends MongoDBService<
  Events,
  EventsData,
  EventsParams,
  EventsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('events'))
  }
}
