// This file is to dynamically generate TS types
// which we can't get using GenType
// Use @genType.import to link the types back to ReScript code

import type { Logger, EffectCaller } from "envio";
import type * as Entities from "./db/Entities.gen.ts";

export type LoaderContext = {
  /**
   * Access the logger instance with event as a context. The logs will be displayed in the console and Envio Hosted Service.
   */
  readonly log: Logger;
  /**
   * Call the provided Effect with the given input.
   * Effects are the best for external calls with automatic deduplication, error handling and caching.
   * Define a new Effect using createEffect outside of the handler.
   */
  readonly effect: EffectCaller;
  /**
   * True when the loaders run in parallel for the whole batch.
   * Loaders are run twice per batch of events, and the first time is the "preload" run
   * During preload entities aren't set, logs are ignored and exceptions are silently swallowed.
   * Preload mode is the best time to populate data to in-memory cache.
   * After preload the loader will run for the second time before its handler in sequentially order of events.
   */
  readonly isPreload: boolean;
  readonly Contribution: {
    /**
     * Load the entity Contribution from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Contribution_t | undefined>,
    /**
     * Load the entity Contribution from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Contribution_t>,
    readonly getWhere: Entities.Contribution_indexedFieldOperations,
    /**
     * Returns the entity Contribution from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Contribution_t) => Promise<Entities.Contribution_t>,
    /**
     * Set the entity Contribution in the storage.
     */
    readonly set: (entity: Entities.Contribution_t) => void,
    /**
     * Delete the entity Contribution from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Contributor: {
    /**
     * Load the entity Contributor from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Contributor_t | undefined>,
    /**
     * Load the entity Contributor from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Contributor_t>,
    readonly getWhere: Entities.Contributor_indexedFieldOperations,
    /**
     * Returns the entity Contributor from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Contributor_t) => Promise<Entities.Contributor_t>,
    /**
     * Set the entity Contributor in the storage.
     */
    readonly set: (entity: Entities.Contributor_t) => void,
    /**
     * Delete the entity Contributor from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly PayrollFunding: {
    /**
     * Load the entity PayrollFunding from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.PayrollFunding_t | undefined>,
    /**
     * Load the entity PayrollFunding from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.PayrollFunding_t>,
    readonly getWhere: Entities.PayrollFunding_indexedFieldOperations,
    /**
     * Returns the entity PayrollFunding from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.PayrollFunding_t) => Promise<Entities.PayrollFunding_t>,
    /**
     * Set the entity PayrollFunding in the storage.
     */
    readonly set: (entity: Entities.PayrollFunding_t) => void,
    /**
     * Delete the entity PayrollFunding from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Project: {
    /**
     * Load the entity Project from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Project_t | undefined>,
    /**
     * Load the entity Project from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Project_t>,
    readonly getWhere: Entities.Project_indexedFieldOperations,
    /**
     * Returns the entity Project from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Project_t) => Promise<Entities.Project_t>,
    /**
     * Set the entity Project in the storage.
     */
    readonly set: (entity: Entities.Project_t) => void,
    /**
     * Delete the entity Project from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly SystemStat: {
    /**
     * Load the entity SystemStat from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.SystemStat_t | undefined>,
    /**
     * Load the entity SystemStat from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.SystemStat_t>,
    readonly getWhere: Entities.SystemStat_indexedFieldOperations,
    /**
     * Returns the entity SystemStat from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.SystemStat_t) => Promise<Entities.SystemStat_t>,
    /**
     * Set the entity SystemStat in the storage.
     */
    readonly set: (entity: Entities.SystemStat_t) => void,
    /**
     * Delete the entity SystemStat from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly UnitConversion: {
    /**
     * Load the entity UnitConversion from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.UnitConversion_t | undefined>,
    /**
     * Load the entity UnitConversion from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.UnitConversion_t>,
    readonly getWhere: Entities.UnitConversion_indexedFieldOperations,
    /**
     * Returns the entity UnitConversion from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.UnitConversion_t) => Promise<Entities.UnitConversion_t>,
    /**
     * Set the entity UnitConversion in the storage.
     */
    readonly set: (entity: Entities.UnitConversion_t) => void,
    /**
     * Delete the entity UnitConversion from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly UnitDistribution: {
    /**
     * Load the entity UnitDistribution from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.UnitDistribution_t | undefined>,
    /**
     * Load the entity UnitDistribution from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.UnitDistribution_t>,
    readonly getWhere: Entities.UnitDistribution_indexedFieldOperations,
    /**
     * Returns the entity UnitDistribution from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.UnitDistribution_t) => Promise<Entities.UnitDistribution_t>,
    /**
     * Set the entity UnitDistribution in the storage.
     */
    readonly set: (entity: Entities.UnitDistribution_t) => void,
    /**
     * Delete the entity UnitDistribution from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
};

export type HandlerContext = {
  /**
   * Access the logger instance with event as a context. The logs will be displayed in the console and Envio Hosted Service.
   */
  readonly log: Logger;
  /**
   * Call the provided Effect with the given input.
   * Effects are the best for external calls with automatic deduplication, error handling and caching.
   * Define a new Effect using createEffect outside of the handler.
   */
  readonly effect: EffectCaller;
  readonly Contribution: {
    /**
     * Load the entity Contribution from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Contribution_t | undefined>,
    /**
     * Load the entity Contribution from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Contribution_t>,
    /**
     * Returns the entity Contribution from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Contribution_t) => Promise<Entities.Contribution_t>,
    /**
     * Set the entity Contribution in the storage.
     */
    readonly set: (entity: Entities.Contribution_t) => void,
    /**
     * Delete the entity Contribution from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Contributor: {
    /**
     * Load the entity Contributor from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Contributor_t | undefined>,
    /**
     * Load the entity Contributor from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Contributor_t>,
    /**
     * Returns the entity Contributor from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Contributor_t) => Promise<Entities.Contributor_t>,
    /**
     * Set the entity Contributor in the storage.
     */
    readonly set: (entity: Entities.Contributor_t) => void,
    /**
     * Delete the entity Contributor from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly PayrollFunding: {
    /**
     * Load the entity PayrollFunding from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.PayrollFunding_t | undefined>,
    /**
     * Load the entity PayrollFunding from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.PayrollFunding_t>,
    /**
     * Returns the entity PayrollFunding from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.PayrollFunding_t) => Promise<Entities.PayrollFunding_t>,
    /**
     * Set the entity PayrollFunding in the storage.
     */
    readonly set: (entity: Entities.PayrollFunding_t) => void,
    /**
     * Delete the entity PayrollFunding from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly Project: {
    /**
     * Load the entity Project from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.Project_t | undefined>,
    /**
     * Load the entity Project from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.Project_t>,
    /**
     * Returns the entity Project from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.Project_t) => Promise<Entities.Project_t>,
    /**
     * Set the entity Project in the storage.
     */
    readonly set: (entity: Entities.Project_t) => void,
    /**
     * Delete the entity Project from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly SystemStat: {
    /**
     * Load the entity SystemStat from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.SystemStat_t | undefined>,
    /**
     * Load the entity SystemStat from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.SystemStat_t>,
    /**
     * Returns the entity SystemStat from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.SystemStat_t) => Promise<Entities.SystemStat_t>,
    /**
     * Set the entity SystemStat in the storage.
     */
    readonly set: (entity: Entities.SystemStat_t) => void,
    /**
     * Delete the entity SystemStat from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly UnitConversion: {
    /**
     * Load the entity UnitConversion from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.UnitConversion_t | undefined>,
    /**
     * Load the entity UnitConversion from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.UnitConversion_t>,
    /**
     * Returns the entity UnitConversion from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.UnitConversion_t) => Promise<Entities.UnitConversion_t>,
    /**
     * Set the entity UnitConversion in the storage.
     */
    readonly set: (entity: Entities.UnitConversion_t) => void,
    /**
     * Delete the entity UnitConversion from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
  readonly UnitDistribution: {
    /**
     * Load the entity UnitDistribution from the storage by ID.
     * If the entity is not found, returns undefined.
     */
    readonly get: (id: string) => Promise<Entities.UnitDistribution_t | undefined>,
    /**
     * Load the entity UnitDistribution from the storage by ID.
     * If the entity is not found, throws an error.
     */
    readonly getOrThrow: (id: string, message?: string) => Promise<Entities.UnitDistribution_t>,
    /**
     * Returns the entity UnitDistribution from the storage by ID.
     * If the entity is not found, creates it using provided parameters and returns it.
     */
    readonly getOrCreate: (entity: Entities.UnitDistribution_t) => Promise<Entities.UnitDistribution_t>,
    /**
     * Set the entity UnitDistribution in the storage.
     */
    readonly set: (entity: Entities.UnitDistribution_t) => void,
    /**
     * Delete the entity UnitDistribution from the storage.
     *
     * The 'deleteUnsafe' method is experimental and unsafe. You should manually handle all entity references after deletion to maintain database consistency.
     */
    readonly deleteUnsafe: (id: string) => void,
  }
};
