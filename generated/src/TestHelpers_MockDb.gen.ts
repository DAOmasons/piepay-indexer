/* TypeScript file generated from TestHelpers_MockDb.res by genType. */

/* eslint-disable */
/* tslint:disable */

const TestHelpers_MockDbJS = require('./TestHelpers_MockDb.res.js');

import type {Contribution_t as Entities_Contribution_t} from '../src/db/Entities.gen';

import type {Contributor_t as Entities_Contributor_t} from '../src/db/Entities.gen';

import type {DynamicContractRegistry_t as TablesStatic_DynamicContractRegistry_t} from '../src/db/TablesStatic.gen';

import type {EventSyncState_t as TablesStatic_EventSyncState_t} from '../src/db/TablesStatic.gen';

import type {PayrollFunding_t as Entities_PayrollFunding_t} from '../src/db/Entities.gen';

import type {Project_t as Entities_Project_t} from '../src/db/Entities.gen';

import type {RawEvents_t as TablesStatic_RawEvents_t} from '../src/db/TablesStatic.gen';

import type {SystemStat_t as Entities_SystemStat_t} from '../src/db/Entities.gen';

import type {UnitConversion_t as Entities_UnitConversion_t} from '../src/db/Entities.gen';

import type {UnitDistribution_t as Entities_UnitDistribution_t} from '../src/db/Entities.gen';

import type {chainId as Types_chainId} from './Types.gen';

import type {eventLog as Types_eventLog} from './Types.gen';

import type {rawEventsKey as InMemoryStore_rawEventsKey} from './InMemoryStore.gen';

/** The mockDb type is simply an InMemoryStore internally. __dbInternal__ holds a reference
to an inMemoryStore and all the the accessor methods point to the reference of that inMemory
store */
export abstract class inMemoryStore { protected opaque!: any }; /* simulate opaque types */

export type t = {
  readonly __dbInternal__: inMemoryStore; 
  readonly entities: entities; 
  readonly rawEvents: storeOperations<InMemoryStore_rawEventsKey,TablesStatic_RawEvents_t>; 
  readonly eventSyncState: storeOperations<Types_chainId,TablesStatic_EventSyncState_t>; 
  readonly dynamicContractRegistry: entityStoreOperations<TablesStatic_DynamicContractRegistry_t>; 
  readonly processEvents: (_1:Types_eventLog<unknown>[]) => Promise<t>
};

export type entities = {
  readonly Contribution: entityStoreOperations<Entities_Contribution_t>; 
  readonly Contributor: entityStoreOperations<Entities_Contributor_t>; 
  readonly PayrollFunding: entityStoreOperations<Entities_PayrollFunding_t>; 
  readonly Project: entityStoreOperations<Entities_Project_t>; 
  readonly SystemStat: entityStoreOperations<Entities_SystemStat_t>; 
  readonly UnitConversion: entityStoreOperations<Entities_UnitConversion_t>; 
  readonly UnitDistribution: entityStoreOperations<Entities_UnitDistribution_t>
};

export type entityStoreOperations<entity> = storeOperations<string,entity>;

export type storeOperations<entityKey,entity> = {
  readonly getAll: () => entity[]; 
  readonly get: (_1:entityKey) => (undefined | entity); 
  readonly set: (_1:entity) => t; 
  readonly delete: (_1:entityKey) => t
};

/** The constructor function for a mockDb. Call it and then set up the inital state by calling
any of the set functions it provides access to. A mockDb will be passed into a processEvent 
helper. Note, process event helpers will not mutate the mockDb but return a new mockDb with
new state so you can compare states before and after. */
export const createMockDb: () => t = TestHelpers_MockDbJS.createMockDb as any;
