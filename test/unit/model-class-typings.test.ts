import { expect } from "../test-helper"
import { SpraypaintBase, Model, Scope, attr } from "../../src/index"
import { KeyCase } from "../../src/model"
import {
  WhereClause,
  SortScope,
  FieldScope,
  FieldArg,
  IncludeScope,
  StatsScope
} from "../../src/scope"
import { NullProxy, CollectionProxy, RecordProxy } from '../../src/proxies';

/*
 *
 * This test file isn't going to assert anything. Instead,
 * it is going to be assigning strict typescript expectations
 * in order to verify that both typescript classes and
 * the `SpraypaintBase.extend()` apis expose the same static
 * class methods on their type definitions.  This will not
 * cause the tests to fail, but it will prevent the type
 * checks from succeeding.
 *
 */
@Model()
class ClassBasedRoot extends SpraypaintBase {}

const ExtendBasedRoot = SpraypaintBase.extend({
  attrs: {
    stringProp: attr({ type: String })
  }
})

describe("Model Class static attributes typings", () => {
  ;[
    { RootClass: ClassBasedRoot, name: "Class-Based" },
    { RootClass: ExtendBasedRoot, name: "extend()-Based" }
  ].forEach(({ RootClass, name }) => {
    describe(name, () => {
      describe("configuration options", () => {
        it("has the correct types", () => {
          const baseUrl: string = RootClass.baseUrl
          const apiNamespace: string = RootClass.apiNamespace
          const jsonapiType: string | undefined = RootClass.jsonapiType
          const endpoint: string = RootClass.endpoint
          const jwt: string | undefined = RootClass.jwt
          const keyCase: KeyCase = RootClass.keyCase
          const strictAttributes: boolean = RootClass.strictAttributes
        })
      })

      const strEnum = <T extends string>(o: T[]): { [K in T]: K } => {
        return o.reduce((res, key) => {
          res[key] = key
          return res
        }, Object.create(null))
      }

      describe("Scope delegators", () => {
        it("understands all of the scope delegator methods", () => {
          const page: (num: number) => Scope<typeof RootClass> = RootClass.page
          const per: (num: number) => Scope<typeof RootClass> = RootClass.per
          const where: (opts: WhereClause) => Scope<typeof RootClass> =
            RootClass.where
          const order: (opts: SortScope) => Scope<typeof RootClass> =
            RootClass.order
          const select: (opts: FieldArg) => Scope<typeof RootClass> =
            RootClass.select
          const selectExtra: (opts: FieldArg) => Scope<typeof RootClass> =
            RootClass.selectExtra
          const includes: (opts: IncludeScope) => Scope<typeof RootClass> =
            RootClass.includes
          const merge: (
            opts: Record<string, Scope>
          ) => Scope<typeof RootClass> =
            RootClass.merge
          const stats: (opts: StatsScope) => Scope<typeof RootClass> =
            RootClass.stats
        })

        it("understands the scope finder methods", () => {
          const first: () => Promise<RecordProxy<SpraypaintBase> | NullProxy> = RootClass.first
          const find: (id: string | number) => Promise<RecordProxy<SpraypaintBase>> =
            RootClass.find
          const all: () => Promise<CollectionProxy<SpraypaintBase>> = RootClass.all

          const result = new ExtendBasedRoot()

          result.stringProp = "foo"
        })
      })
    })
  })
})
