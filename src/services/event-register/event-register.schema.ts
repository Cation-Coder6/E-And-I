// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const eventRegisterSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    userEmail: Type.String(),
  },
  { $id: 'EventRegister', additionalProperties: true }
)
export type EventRegister = Static<typeof eventRegisterSchema>
export const eventRegisterValidator = getValidator(eventRegisterSchema, dataValidator)
export const eventRegisterResolver = resolve<EventRegister, HookContext>({})

export const eventRegisterExternalResolver = resolve<EventRegister, HookContext>({})

// Schema for creating new entries
export const eventRegisterDataSchema = Type.Pick(eventRegisterSchema, ['userEmail'], {
  $id: 'EventRegisterData'
})
export type EventRegisterData = Static<typeof eventRegisterDataSchema>
export const eventRegisterDataValidator = getValidator(eventRegisterDataSchema, dataValidator)
export const eventRegisterDataResolver = resolve<EventRegister, HookContext>({})

// Schema for updating existing entries
export const eventRegisterPatchSchema = Type.Partial(eventRegisterSchema, {
  $id: 'EventRegisterPatch'
})
export type EventRegisterPatch = Static<typeof eventRegisterPatchSchema>
export const eventRegisterPatchValidator = getValidator(eventRegisterPatchSchema, dataValidator)
export const eventRegisterPatchResolver = resolve<EventRegister, HookContext>({})

// Schema for allowed query properties
export const eventRegisterQueryProperties = Type.Pick(eventRegisterSchema, ['_id', 'userEmail'])
export const eventRegisterQuerySchema = Type.Intersect(
  [
    querySyntax(eventRegisterQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export type EventRegisterQuery = Static<typeof eventRegisterQuerySchema>
export const eventRegisterQueryValidator = getValidator(eventRegisterQuerySchema, queryValidator)
export const eventRegisterQueryResolver = resolve<EventRegisterQuery, HookContext>({})
