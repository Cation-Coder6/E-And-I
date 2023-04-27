// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const internshipSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    name: Type.String(),
    content: Type.String(),
    image: Type.String(),
    duration: Type.String(),
  },
  { $id: 'Internship', additionalProperties: true }
)
export type Internship = Static<typeof internshipSchema>
export const internshipValidator = getValidator(internshipSchema, dataValidator)
export const internshipResolver = resolve<Internship, HookContext>({})

export const internshipExternalResolver = resolve<Internship, HookContext>({})

// Schema for creating new entries
export const internshipDataSchema = Type.Pick(internshipSchema, ['name'], {
  $id: 'InternshipData'
})
export type InternshipData = Static<typeof internshipDataSchema>
export const internshipDataValidator = getValidator(internshipDataSchema, dataValidator)
export const internshipDataResolver = resolve<Internship, HookContext>({})

// Schema for updating existing entries
export const internshipPatchSchema = Type.Partial(internshipSchema, {
  $id: 'InternshipPatch'
})
export type InternshipPatch = Static<typeof internshipPatchSchema>
export const internshipPatchValidator = getValidator(internshipPatchSchema, dataValidator)
export const internshipPatchResolver = resolve<Internship, HookContext>({})

// Schema for allowed query properties
export const internshipQueryProperties = Type.Pick(internshipSchema, ['_id', 'name'])
export const internshipQuerySchema = Type.Intersect(
  [
    querySyntax(internshipQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: true })
  ],
  { additionalProperties: true }
)
export type InternshipQuery = Static<typeof internshipQuerySchema>
export const internshipQueryValidator = getValidator(internshipQuerySchema, queryValidator)
export const internshipQueryResolver = resolve<InternshipQuery, HookContext>({})
