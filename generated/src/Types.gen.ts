/* TypeScript file generated from Types.res by genType. */

/* eslint-disable */
/* tslint:disable */

import type {Contribution_t as Entities_Contribution_t} from '../src/db/Entities.gen';

import type {Contributor_t as Entities_Contributor_t} from '../src/db/Entities.gen';

import type {HandlerContext as $$handlerContext} from './Types.ts';

import type {HandlerWithOptions as $$fnWithEventConfig} from './bindings/OpaqueTypes.ts';

import type {LoaderContext as $$loaderContext} from './Types.ts';

import type {PayrollFunding_t as Entities_PayrollFunding_t} from '../src/db/Entities.gen';

import type {Project_t as Entities_Project_t} from '../src/db/Entities.gen';

import type {SingleOrMultiple as $$SingleOrMultiple_t} from './bindings/OpaqueTypes';

import type {SystemStat_t as Entities_SystemStat_t} from '../src/db/Entities.gen';

import type {UnitConversion_t as Entities_UnitConversion_t} from '../src/db/Entities.gen';

import type {UnitDistribution_t as Entities_UnitDistribution_t} from '../src/db/Entities.gen';

import type {genericContractRegisterArgs as Internal_genericContractRegisterArgs} from 'envio/src/Internal.gen';

import type {genericContractRegister as Internal_genericContractRegister} from 'envio/src/Internal.gen';

import type {genericEvent as Internal_genericEvent} from 'envio/src/Internal.gen';

import type {genericHandlerArgs as Internal_genericHandlerArgs} from 'envio/src/Internal.gen';

import type {genericHandlerWithLoader as Internal_genericHandlerWithLoader} from 'envio/src/Internal.gen';

import type {genericHandler as Internal_genericHandler} from 'envio/src/Internal.gen';

import type {genericLoaderArgs as Internal_genericLoaderArgs} from 'envio/src/Internal.gen';

import type {genericLoader as Internal_genericLoader} from 'envio/src/Internal.gen';

import type {logger as Envio_logger} from 'envio/src/Envio.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

export type id = string;
export type Id = id;

export type contractRegistrations = { readonly log: Envio_logger; readonly addPiePay: (_1:Address_t) => void };

export type entityLoaderContext<entity,indexedFieldOperations> = {
  readonly get: (_1:id) => Promise<(undefined | entity)>; 
  readonly getOrThrow: (_1:id, message:(undefined | string)) => Promise<entity>; 
  readonly getWhere: indexedFieldOperations; 
  readonly getOrCreate: (_1:entity) => Promise<entity>; 
  readonly set: (_1:entity) => void; 
  readonly deleteUnsafe: (_1:id) => void
};

export type loaderContext = $$loaderContext;

export type entityHandlerContext<entity> = {
  readonly get: (_1:id) => Promise<(undefined | entity)>; 
  readonly getOrThrow: (_1:id, message:(undefined | string)) => Promise<entity>; 
  readonly getOrCreate: (_1:entity) => Promise<entity>; 
  readonly set: (_1:entity) => void; 
  readonly deleteUnsafe: (_1:id) => void
};

export type handlerContext = $$handlerContext;

export type contribution = Entities_Contribution_t;
export type Contribution = contribution;

export type contributor = Entities_Contributor_t;
export type Contributor = contributor;

export type payrollFunding = Entities_PayrollFunding_t;
export type PayrollFunding = payrollFunding;

export type project = Entities_Project_t;
export type Project = project;

export type systemStat = Entities_SystemStat_t;
export type SystemStat = systemStat;

export type unitConversion = Entities_UnitConversion_t;
export type UnitConversion = unitConversion;

export type unitDistribution = Entities_UnitDistribution_t;
export type UnitDistribution = unitDistribution;

export type eventIdentifier = {
  readonly chainId: number; 
  readonly blockTimestamp: number; 
  readonly blockNumber: number; 
  readonly logIndex: number
};

export type entityUpdateAction<entityType> = "Delete" | { TAG: "Set"; _0: entityType };

export type entityUpdate<entityType> = {
  readonly eventIdentifier: eventIdentifier; 
  readonly entityId: id; 
  readonly entityUpdateAction: entityUpdateAction<entityType>
};

export type entityValueAtStartOfBatch<entityType> = 
    "NotSet"
  | { TAG: "AlreadySet"; _0: entityType };

export type updatedValue<entityType> = {
  readonly latest: entityUpdate<entityType>; 
  readonly history: entityUpdate<entityType>[]; 
  readonly containsRollbackDiffChange: boolean
};

export type inMemoryStoreRowEntity<entityType> = 
    { TAG: "Updated"; _0: updatedValue<entityType> }
  | { TAG: "InitialReadFromDb"; _0: entityValueAtStartOfBatch<entityType> };

export type Transaction_t = {
  readonly from: (undefined | Address_t); 
  readonly to: (undefined | Address_t); 
  readonly hash: string; 
  readonly transactionIndex: number
};

export type Block_t = {
  readonly number: number; 
  readonly timestamp: number; 
  readonly hash: string
};

export type AggregatedBlock_t = {
  readonly hash: string; 
  readonly number: number; 
  readonly timestamp: number
};

export type AggregatedTransaction_t = {
  readonly from: (undefined | Address_t); 
  readonly hash: string; 
  readonly to: (undefined | Address_t); 
  readonly transactionIndex: number
};

export type eventLog<params> = Internal_genericEvent<params,Block_t,Transaction_t>;
export type EventLog<params> = eventLog<params>;

export type SingleOrMultiple_t<a> = $$SingleOrMultiple_t<a>;

export type HandlerTypes_args<eventArgs,context> = { readonly event: eventLog<eventArgs>; readonly context: context };

export type HandlerTypes_contractRegisterArgs<eventArgs> = Internal_genericContractRegisterArgs<eventLog<eventArgs>,contractRegistrations>;

export type HandlerTypes_contractRegister<eventArgs> = Internal_genericContractRegister<HandlerTypes_contractRegisterArgs<eventArgs>>;

export type HandlerTypes_loaderArgs<eventArgs> = Internal_genericLoaderArgs<eventLog<eventArgs>,loaderContext>;

export type HandlerTypes_loader<eventArgs,loaderReturn> = Internal_genericLoader<HandlerTypes_loaderArgs<eventArgs>,loaderReturn>;

export type HandlerTypes_handlerArgs<eventArgs,loaderReturn> = Internal_genericHandlerArgs<eventLog<eventArgs>,handlerContext,loaderReturn>;

export type HandlerTypes_handler<eventArgs,loaderReturn> = Internal_genericHandler<HandlerTypes_handlerArgs<eventArgs,loaderReturn>>;

export type HandlerTypes_loaderHandler<eventArgs,loaderReturn,eventFilters> = Internal_genericHandlerWithLoader<HandlerTypes_loader<eventArgs,loaderReturn>,HandlerTypes_handler<eventArgs,loaderReturn>,eventFilters>;

export type HandlerTypes_eventConfig<eventFilters> = {
  readonly wildcard?: boolean; 
  readonly eventFilters?: eventFilters; 
  /** @deprecated The option is removed starting from v2.19 since we made the default mode even faster than pre-registration. */
  readonly preRegisterDynamicContracts?: boolean
};

export type fnWithEventConfig<fn,eventConfig> = $$fnWithEventConfig<fn,eventConfig>;

export type handlerWithOptions<eventArgs,loaderReturn,eventFilters> = fnWithEventConfig<HandlerTypes_handler<eventArgs,loaderReturn>,HandlerTypes_eventConfig<eventFilters>>;

export type contractRegisterWithOptions<eventArgs,eventFilters> = fnWithEventConfig<HandlerTypes_contractRegister<eventArgs>,HandlerTypes_eventConfig<eventFilters>>;

export type PiePay_chainId = 421614;

export type PiePay_ProjectInitialized_eventArgs = {
  readonly name: string; 
  readonly description: string; 
  readonly executor: Address_t
};

export type PiePay_ProjectInitialized_block = Block_t;

export type PiePay_ProjectInitialized_transaction = Transaction_t;

export type PiePay_ProjectInitialized_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ProjectInitialized_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ProjectInitialized_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ProjectInitialized_block
};

export type PiePay_ProjectInitialized_loaderArgs = Internal_genericLoaderArgs<PiePay_ProjectInitialized_event,loaderContext>;

export type PiePay_ProjectInitialized_loader<loaderReturn> = Internal_genericLoader<PiePay_ProjectInitialized_loaderArgs,loaderReturn>;

export type PiePay_ProjectInitialized_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ProjectInitialized_event,handlerContext,loaderReturn>;

export type PiePay_ProjectInitialized_handler<loaderReturn> = Internal_genericHandler<PiePay_ProjectInitialized_handlerArgs<loaderReturn>>;

export type PiePay_ProjectInitialized_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ProjectInitialized_event,contractRegistrations>>;

export type PiePay_ProjectInitialized_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t> };

export type PiePay_ProjectInitialized_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ProjectInitialized_eventFiltersDefinition = 
    PiePay_ProjectInitialized_eventFilter
  | PiePay_ProjectInitialized_eventFilter[];

export type PiePay_ProjectInitialized_eventFilters = 
    PiePay_ProjectInitialized_eventFilter
  | PiePay_ProjectInitialized_eventFilter[]
  | ((_1:PiePay_ProjectInitialized_eventFiltersArgs) => PiePay_ProjectInitialized_eventFiltersDefinition);

export type PiePay_ContributionSubmitted_eventArgs = {
  readonly executor: Address_t; 
  readonly contributionId: bigint; 
  readonly unitType: bigint; 
  readonly unitsRequested: bigint; 
  readonly description: string
};

export type PiePay_ContributionSubmitted_block = Block_t;

export type PiePay_ContributionSubmitted_transaction = Transaction_t;

export type PiePay_ContributionSubmitted_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ContributionSubmitted_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ContributionSubmitted_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ContributionSubmitted_block
};

export type PiePay_ContributionSubmitted_loaderArgs = Internal_genericLoaderArgs<PiePay_ContributionSubmitted_event,loaderContext>;

export type PiePay_ContributionSubmitted_loader<loaderReturn> = Internal_genericLoader<PiePay_ContributionSubmitted_loaderArgs,loaderReturn>;

export type PiePay_ContributionSubmitted_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ContributionSubmitted_event,handlerContext,loaderReturn>;

export type PiePay_ContributionSubmitted_handler<loaderReturn> = Internal_genericHandler<PiePay_ContributionSubmitted_handlerArgs<loaderReturn>>;

export type PiePay_ContributionSubmitted_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ContributionSubmitted_event,contractRegistrations>>;

export type PiePay_ContributionSubmitted_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly contributionId?: SingleOrMultiple_t<bigint> };

export type PiePay_ContributionSubmitted_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ContributionSubmitted_eventFiltersDefinition = 
    PiePay_ContributionSubmitted_eventFilter
  | PiePay_ContributionSubmitted_eventFilter[];

export type PiePay_ContributionSubmitted_eventFilters = 
    PiePay_ContributionSubmitted_eventFilter
  | PiePay_ContributionSubmitted_eventFilter[]
  | ((_1:PiePay_ContributionSubmitted_eventFiltersArgs) => PiePay_ContributionSubmitted_eventFiltersDefinition);

export type PiePay_ContributionApproved_eventArgs = {
  readonly executor: Address_t; 
  readonly contributionId: bigint; 
  readonly contributor: Address_t; 
  readonly unitType: bigint; 
  readonly unitsAwarded: bigint
};

export type PiePay_ContributionApproved_block = Block_t;

export type PiePay_ContributionApproved_transaction = Transaction_t;

export type PiePay_ContributionApproved_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ContributionApproved_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ContributionApproved_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ContributionApproved_block
};

export type PiePay_ContributionApproved_loaderArgs = Internal_genericLoaderArgs<PiePay_ContributionApproved_event,loaderContext>;

export type PiePay_ContributionApproved_loader<loaderReturn> = Internal_genericLoader<PiePay_ContributionApproved_loaderArgs,loaderReturn>;

export type PiePay_ContributionApproved_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ContributionApproved_event,handlerContext,loaderReturn>;

export type PiePay_ContributionApproved_handler<loaderReturn> = Internal_genericHandler<PiePay_ContributionApproved_handlerArgs<loaderReturn>>;

export type PiePay_ContributionApproved_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ContributionApproved_event,contractRegistrations>>;

export type PiePay_ContributionApproved_eventFilter = {
  readonly executor?: SingleOrMultiple_t<Address_t>; 
  readonly contributionId?: SingleOrMultiple_t<bigint>; 
  readonly contributor?: SingleOrMultiple_t<Address_t>
};

export type PiePay_ContributionApproved_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ContributionApproved_eventFiltersDefinition = 
    PiePay_ContributionApproved_eventFilter
  | PiePay_ContributionApproved_eventFilter[];

export type PiePay_ContributionApproved_eventFilters = 
    PiePay_ContributionApproved_eventFilter
  | PiePay_ContributionApproved_eventFilter[]
  | ((_1:PiePay_ContributionApproved_eventFiltersArgs) => PiePay_ContributionApproved_eventFiltersDefinition);

export type PiePay_ContributionRejected_eventArgs = {
  readonly executor: Address_t; 
  readonly contributionId: bigint; 
  readonly contributor: Address_t
};

export type PiePay_ContributionRejected_block = Block_t;

export type PiePay_ContributionRejected_transaction = Transaction_t;

export type PiePay_ContributionRejected_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ContributionRejected_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ContributionRejected_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ContributionRejected_block
};

export type PiePay_ContributionRejected_loaderArgs = Internal_genericLoaderArgs<PiePay_ContributionRejected_event,loaderContext>;

export type PiePay_ContributionRejected_loader<loaderReturn> = Internal_genericLoader<PiePay_ContributionRejected_loaderArgs,loaderReturn>;

export type PiePay_ContributionRejected_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ContributionRejected_event,handlerContext,loaderReturn>;

export type PiePay_ContributionRejected_handler<loaderReturn> = Internal_genericHandler<PiePay_ContributionRejected_handlerArgs<loaderReturn>>;

export type PiePay_ContributionRejected_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ContributionRejected_event,contractRegistrations>>;

export type PiePay_ContributionRejected_eventFilter = {
  readonly executor?: SingleOrMultiple_t<Address_t>; 
  readonly contributionId?: SingleOrMultiple_t<bigint>; 
  readonly contributor?: SingleOrMultiple_t<Address_t>
};

export type PiePay_ContributionRejected_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ContributionRejected_eventFiltersDefinition = 
    PiePay_ContributionRejected_eventFilter
  | PiePay_ContributionRejected_eventFilter[];

export type PiePay_ContributionRejected_eventFilters = 
    PiePay_ContributionRejected_eventFilter
  | PiePay_ContributionRejected_eventFilter[]
  | ((_1:PiePay_ContributionRejected_eventFiltersArgs) => PiePay_ContributionRejected_eventFiltersDefinition);

export type PiePay_UnitsDistributed_eventArgs = {
  readonly executor: Address_t; 
  readonly unitType: bigint; 
  readonly totalDistributed: bigint; 
  readonly recipientCount: bigint
};

export type PiePay_UnitsDistributed_block = Block_t;

export type PiePay_UnitsDistributed_transaction = Transaction_t;

export type PiePay_UnitsDistributed_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_UnitsDistributed_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_UnitsDistributed_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_UnitsDistributed_block
};

export type PiePay_UnitsDistributed_loaderArgs = Internal_genericLoaderArgs<PiePay_UnitsDistributed_event,loaderContext>;

export type PiePay_UnitsDistributed_loader<loaderReturn> = Internal_genericLoader<PiePay_UnitsDistributed_loaderArgs,loaderReturn>;

export type PiePay_UnitsDistributed_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_UnitsDistributed_event,handlerContext,loaderReturn>;

export type PiePay_UnitsDistributed_handler<loaderReturn> = Internal_genericHandler<PiePay_UnitsDistributed_handlerArgs<loaderReturn>>;

export type PiePay_UnitsDistributed_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_UnitsDistributed_event,contractRegistrations>>;

export type PiePay_UnitsDistributed_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly unitType?: SingleOrMultiple_t<bigint> };

export type PiePay_UnitsDistributed_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_UnitsDistributed_eventFiltersDefinition = 
    PiePay_UnitsDistributed_eventFilter
  | PiePay_UnitsDistributed_eventFilter[];

export type PiePay_UnitsDistributed_eventFilters = 
    PiePay_UnitsDistributed_eventFilter
  | PiePay_UnitsDistributed_eventFilter[]
  | ((_1:PiePay_UnitsDistributed_eventFiltersArgs) => PiePay_UnitsDistributed_eventFiltersDefinition);

export type PiePay_PayrollFunded_eventArgs = { readonly executor: Address_t; readonly amount: bigint };

export type PiePay_PayrollFunded_block = Block_t;

export type PiePay_PayrollFunded_transaction = Transaction_t;

export type PiePay_PayrollFunded_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_PayrollFunded_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_PayrollFunded_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_PayrollFunded_block
};

export type PiePay_PayrollFunded_loaderArgs = Internal_genericLoaderArgs<PiePay_PayrollFunded_event,loaderContext>;

export type PiePay_PayrollFunded_loader<loaderReturn> = Internal_genericLoader<PiePay_PayrollFunded_loaderArgs,loaderReturn>;

export type PiePay_PayrollFunded_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_PayrollFunded_event,handlerContext,loaderReturn>;

export type PiePay_PayrollFunded_handler<loaderReturn> = Internal_genericHandler<PiePay_PayrollFunded_handlerArgs<loaderReturn>>;

export type PiePay_PayrollFunded_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_PayrollFunded_event,contractRegistrations>>;

export type PiePay_PayrollFunded_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t> };

export type PiePay_PayrollFunded_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_PayrollFunded_eventFiltersDefinition = 
    PiePay_PayrollFunded_eventFilter
  | PiePay_PayrollFunded_eventFilter[];

export type PiePay_PayrollFunded_eventFilters = 
    PiePay_PayrollFunded_eventFilter
  | PiePay_PayrollFunded_eventFilter[]
  | ((_1:PiePay_PayrollFunded_eventFiltersArgs) => PiePay_PayrollFunded_eventFiltersDefinition);

export type PiePay_ContributorWhitelisted_eventArgs = { readonly executor: Address_t; readonly contributor: Address_t };

export type PiePay_ContributorWhitelisted_block = Block_t;

export type PiePay_ContributorWhitelisted_transaction = Transaction_t;

export type PiePay_ContributorWhitelisted_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ContributorWhitelisted_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ContributorWhitelisted_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ContributorWhitelisted_block
};

export type PiePay_ContributorWhitelisted_loaderArgs = Internal_genericLoaderArgs<PiePay_ContributorWhitelisted_event,loaderContext>;

export type PiePay_ContributorWhitelisted_loader<loaderReturn> = Internal_genericLoader<PiePay_ContributorWhitelisted_loaderArgs,loaderReturn>;

export type PiePay_ContributorWhitelisted_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ContributorWhitelisted_event,handlerContext,loaderReturn>;

export type PiePay_ContributorWhitelisted_handler<loaderReturn> = Internal_genericHandler<PiePay_ContributorWhitelisted_handlerArgs<loaderReturn>>;

export type PiePay_ContributorWhitelisted_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ContributorWhitelisted_event,contractRegistrations>>;

export type PiePay_ContributorWhitelisted_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly contributor?: SingleOrMultiple_t<Address_t> };

export type PiePay_ContributorWhitelisted_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ContributorWhitelisted_eventFiltersDefinition = 
    PiePay_ContributorWhitelisted_eventFilter
  | PiePay_ContributorWhitelisted_eventFilter[];

export type PiePay_ContributorWhitelisted_eventFilters = 
    PiePay_ContributorWhitelisted_eventFilter
  | PiePay_ContributorWhitelisted_eventFilter[]
  | ((_1:PiePay_ContributorWhitelisted_eventFiltersArgs) => PiePay_ContributorWhitelisted_eventFiltersDefinition);

export type PiePay_ContributorRemoved_eventArgs = { readonly executor: Address_t; readonly contributor: Address_t };

export type PiePay_ContributorRemoved_block = Block_t;

export type PiePay_ContributorRemoved_transaction = Transaction_t;

export type PiePay_ContributorRemoved_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ContributorRemoved_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ContributorRemoved_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ContributorRemoved_block
};

export type PiePay_ContributorRemoved_loaderArgs = Internal_genericLoaderArgs<PiePay_ContributorRemoved_event,loaderContext>;

export type PiePay_ContributorRemoved_loader<loaderReturn> = Internal_genericLoader<PiePay_ContributorRemoved_loaderArgs,loaderReturn>;

export type PiePay_ContributorRemoved_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ContributorRemoved_event,handlerContext,loaderReturn>;

export type PiePay_ContributorRemoved_handler<loaderReturn> = Internal_genericHandler<PiePay_ContributorRemoved_handlerArgs<loaderReturn>>;

export type PiePay_ContributorRemoved_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ContributorRemoved_event,contractRegistrations>>;

export type PiePay_ContributorRemoved_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly contributor?: SingleOrMultiple_t<Address_t> };

export type PiePay_ContributorRemoved_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ContributorRemoved_eventFiltersDefinition = 
    PiePay_ContributorRemoved_eventFilter
  | PiePay_ContributorRemoved_eventFilter[];

export type PiePay_ContributorRemoved_eventFilters = 
    PiePay_ContributorRemoved_eventFilter
  | PiePay_ContributorRemoved_eventFilter[]
  | ((_1:PiePay_ContributorRemoved_eventFiltersArgs) => PiePay_ContributorRemoved_eventFiltersDefinition);

export type PiePay_ProjectLeadUpdated_eventArgs = { readonly executor: Address_t; readonly newLead: Address_t };

export type PiePay_ProjectLeadUpdated_block = Block_t;

export type PiePay_ProjectLeadUpdated_transaction = Transaction_t;

export type PiePay_ProjectLeadUpdated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ProjectLeadUpdated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ProjectLeadUpdated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ProjectLeadUpdated_block
};

export type PiePay_ProjectLeadUpdated_loaderArgs = Internal_genericLoaderArgs<PiePay_ProjectLeadUpdated_event,loaderContext>;

export type PiePay_ProjectLeadUpdated_loader<loaderReturn> = Internal_genericLoader<PiePay_ProjectLeadUpdated_loaderArgs,loaderReturn>;

export type PiePay_ProjectLeadUpdated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ProjectLeadUpdated_event,handlerContext,loaderReturn>;

export type PiePay_ProjectLeadUpdated_handler<loaderReturn> = Internal_genericHandler<PiePay_ProjectLeadUpdated_handlerArgs<loaderReturn>>;

export type PiePay_ProjectLeadUpdated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ProjectLeadUpdated_event,contractRegistrations>>;

export type PiePay_ProjectLeadUpdated_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly newLead?: SingleOrMultiple_t<Address_t> };

export type PiePay_ProjectLeadUpdated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ProjectLeadUpdated_eventFiltersDefinition = 
    PiePay_ProjectLeadUpdated_eventFilter
  | PiePay_ProjectLeadUpdated_eventFilter[];

export type PiePay_ProjectLeadUpdated_eventFilters = 
    PiePay_ProjectLeadUpdated_eventFilter
  | PiePay_ProjectLeadUpdated_eventFilter[]
  | ((_1:PiePay_ProjectLeadUpdated_eventFiltersArgs) => PiePay_ProjectLeadUpdated_eventFiltersDefinition);

export type PiePay_PayrollManagerUpdated_eventArgs = { readonly executor: Address_t; readonly newManager: Address_t };

export type PiePay_PayrollManagerUpdated_block = Block_t;

export type PiePay_PayrollManagerUpdated_transaction = Transaction_t;

export type PiePay_PayrollManagerUpdated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_PayrollManagerUpdated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_PayrollManagerUpdated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_PayrollManagerUpdated_block
};

export type PiePay_PayrollManagerUpdated_loaderArgs = Internal_genericLoaderArgs<PiePay_PayrollManagerUpdated_event,loaderContext>;

export type PiePay_PayrollManagerUpdated_loader<loaderReturn> = Internal_genericLoader<PiePay_PayrollManagerUpdated_loaderArgs,loaderReturn>;

export type PiePay_PayrollManagerUpdated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_PayrollManagerUpdated_event,handlerContext,loaderReturn>;

export type PiePay_PayrollManagerUpdated_handler<loaderReturn> = Internal_genericHandler<PiePay_PayrollManagerUpdated_handlerArgs<loaderReturn>>;

export type PiePay_PayrollManagerUpdated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_PayrollManagerUpdated_event,contractRegistrations>>;

export type PiePay_PayrollManagerUpdated_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly newManager?: SingleOrMultiple_t<Address_t> };

export type PiePay_PayrollManagerUpdated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_PayrollManagerUpdated_eventFiltersDefinition = 
    PiePay_PayrollManagerUpdated_eventFilter
  | PiePay_PayrollManagerUpdated_eventFilter[];

export type PiePay_PayrollManagerUpdated_eventFilters = 
    PiePay_PayrollManagerUpdated_eventFilter
  | PiePay_PayrollManagerUpdated_eventFilter[]
  | ((_1:PiePay_PayrollManagerUpdated_eventFiltersArgs) => PiePay_PayrollManagerUpdated_eventFiltersDefinition);

export type PiePay_UnitsConverted_eventArgs = {
  readonly executor: Address_t; 
  readonly fromType: bigint; 
  readonly toType: bigint; 
  readonly fromAmount: bigint; 
  readonly toAmount: bigint
};

export type PiePay_UnitsConverted_block = Block_t;

export type PiePay_UnitsConverted_transaction = Transaction_t;

export type PiePay_UnitsConverted_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_UnitsConverted_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_UnitsConverted_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_UnitsConverted_block
};

export type PiePay_UnitsConverted_loaderArgs = Internal_genericLoaderArgs<PiePay_UnitsConverted_event,loaderContext>;

export type PiePay_UnitsConverted_loader<loaderReturn> = Internal_genericLoader<PiePay_UnitsConverted_loaderArgs,loaderReturn>;

export type PiePay_UnitsConverted_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_UnitsConverted_event,handlerContext,loaderReturn>;

export type PiePay_UnitsConverted_handler<loaderReturn> = Internal_genericHandler<PiePay_UnitsConverted_handlerArgs<loaderReturn>>;

export type PiePay_UnitsConverted_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_UnitsConverted_event,contractRegistrations>>;

export type PiePay_UnitsConverted_eventFilter = {
  readonly executor?: SingleOrMultiple_t<Address_t>; 
  readonly fromType?: SingleOrMultiple_t<bigint>; 
  readonly toType?: SingleOrMultiple_t<bigint>
};

export type PiePay_UnitsConverted_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_UnitsConverted_eventFiltersDefinition = 
    PiePay_UnitsConverted_eventFilter
  | PiePay_UnitsConverted_eventFilter[];

export type PiePay_UnitsConverted_eventFilters = 
    PiePay_UnitsConverted_eventFilter
  | PiePay_UnitsConverted_eventFilter[]
  | ((_1:PiePay_UnitsConverted_eventFiltersArgs) => PiePay_UnitsConverted_eventFiltersDefinition);

export type PiePay_TotalUnitsUpdated_eventArgs = { readonly unitType: bigint; readonly newTotal: bigint };

export type PiePay_TotalUnitsUpdated_block = Block_t;

export type PiePay_TotalUnitsUpdated_transaction = Transaction_t;

export type PiePay_TotalUnitsUpdated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_TotalUnitsUpdated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_TotalUnitsUpdated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_TotalUnitsUpdated_block
};

export type PiePay_TotalUnitsUpdated_loaderArgs = Internal_genericLoaderArgs<PiePay_TotalUnitsUpdated_event,loaderContext>;

export type PiePay_TotalUnitsUpdated_loader<loaderReturn> = Internal_genericLoader<PiePay_TotalUnitsUpdated_loaderArgs,loaderReturn>;

export type PiePay_TotalUnitsUpdated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_TotalUnitsUpdated_event,handlerContext,loaderReturn>;

export type PiePay_TotalUnitsUpdated_handler<loaderReturn> = Internal_genericHandler<PiePay_TotalUnitsUpdated_handlerArgs<loaderReturn>>;

export type PiePay_TotalUnitsUpdated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_TotalUnitsUpdated_event,contractRegistrations>>;

export type PiePay_TotalUnitsUpdated_eventFilter = { readonly unitType?: SingleOrMultiple_t<bigint> };

export type PiePay_TotalUnitsUpdated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_TotalUnitsUpdated_eventFiltersDefinition = 
    PiePay_TotalUnitsUpdated_eventFilter
  | PiePay_TotalUnitsUpdated_eventFilter[];

export type PiePay_TotalUnitsUpdated_eventFilters = 
    PiePay_TotalUnitsUpdated_eventFilter
  | PiePay_TotalUnitsUpdated_eventFilter[]
  | ((_1:PiePay_TotalUnitsUpdated_eventFiltersArgs) => PiePay_TotalUnitsUpdated_eventFiltersDefinition);

export type PiePay_ConversionMultipliersUpdated_eventArgs = {
  readonly executor: Address_t; 
  readonly pToDMultiplier: bigint; 
  readonly pToCMultiplier: bigint; 
  readonly dToCMultiplier: bigint
};

export type PiePay_ConversionMultipliersUpdated_block = Block_t;

export type PiePay_ConversionMultipliersUpdated_transaction = Transaction_t;

export type PiePay_ConversionMultipliersUpdated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_ConversionMultipliersUpdated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_ConversionMultipliersUpdated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_ConversionMultipliersUpdated_block
};

export type PiePay_ConversionMultipliersUpdated_loaderArgs = Internal_genericLoaderArgs<PiePay_ConversionMultipliersUpdated_event,loaderContext>;

export type PiePay_ConversionMultipliersUpdated_loader<loaderReturn> = Internal_genericLoader<PiePay_ConversionMultipliersUpdated_loaderArgs,loaderReturn>;

export type PiePay_ConversionMultipliersUpdated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_ConversionMultipliersUpdated_event,handlerContext,loaderReturn>;

export type PiePay_ConversionMultipliersUpdated_handler<loaderReturn> = Internal_genericHandler<PiePay_ConversionMultipliersUpdated_handlerArgs<loaderReturn>>;

export type PiePay_ConversionMultipliersUpdated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_ConversionMultipliersUpdated_event,contractRegistrations>>;

export type PiePay_ConversionMultipliersUpdated_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t> };

export type PiePay_ConversionMultipliersUpdated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_ConversionMultipliersUpdated_eventFiltersDefinition = 
    PiePay_ConversionMultipliersUpdated_eventFilter
  | PiePay_ConversionMultipliersUpdated_eventFilter[];

export type PiePay_ConversionMultipliersUpdated_eventFilters = 
    PiePay_ConversionMultipliersUpdated_eventFilter
  | PiePay_ConversionMultipliersUpdated_eventFilter[]
  | ((_1:PiePay_ConversionMultipliersUpdated_eventFiltersArgs) => PiePay_ConversionMultipliersUpdated_eventFiltersDefinition);

export type PiePay_UnitCapacityUpdated_eventArgs = {
  readonly executor: Address_t; 
  readonly unitType: bigint; 
  readonly newCapacity: bigint
};

export type PiePay_UnitCapacityUpdated_block = Block_t;

export type PiePay_UnitCapacityUpdated_transaction = Transaction_t;

export type PiePay_UnitCapacityUpdated_event = {
  /** The parameters or arguments associated with this event. */
  readonly params: PiePay_UnitCapacityUpdated_eventArgs; 
  /** The unique identifier of the blockchain network where this event occurred. */
  readonly chainId: PiePay_chainId; 
  /** The address of the contract that emitted this event. */
  readonly srcAddress: Address_t; 
  /** The index of this event's log within the block. */
  readonly logIndex: number; 
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  readonly transaction: PiePay_UnitCapacityUpdated_transaction; 
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  readonly block: PiePay_UnitCapacityUpdated_block
};

export type PiePay_UnitCapacityUpdated_loaderArgs = Internal_genericLoaderArgs<PiePay_UnitCapacityUpdated_event,loaderContext>;

export type PiePay_UnitCapacityUpdated_loader<loaderReturn> = Internal_genericLoader<PiePay_UnitCapacityUpdated_loaderArgs,loaderReturn>;

export type PiePay_UnitCapacityUpdated_handlerArgs<loaderReturn> = Internal_genericHandlerArgs<PiePay_UnitCapacityUpdated_event,handlerContext,loaderReturn>;

export type PiePay_UnitCapacityUpdated_handler<loaderReturn> = Internal_genericHandler<PiePay_UnitCapacityUpdated_handlerArgs<loaderReturn>>;

export type PiePay_UnitCapacityUpdated_contractRegister = Internal_genericContractRegister<Internal_genericContractRegisterArgs<PiePay_UnitCapacityUpdated_event,contractRegistrations>>;

export type PiePay_UnitCapacityUpdated_eventFilter = { readonly executor?: SingleOrMultiple_t<Address_t>; readonly unitType?: SingleOrMultiple_t<bigint> };

export type PiePay_UnitCapacityUpdated_eventFiltersArgs = { 
/** The unique identifier of the blockchain network where this event occurred. */
readonly chainId: PiePay_chainId; 
/** Addresses of the contracts indexing the event. */
readonly addresses: Address_t[] };

export type PiePay_UnitCapacityUpdated_eventFiltersDefinition = 
    PiePay_UnitCapacityUpdated_eventFilter
  | PiePay_UnitCapacityUpdated_eventFilter[];

export type PiePay_UnitCapacityUpdated_eventFilters = 
    PiePay_UnitCapacityUpdated_eventFilter
  | PiePay_UnitCapacityUpdated_eventFilter[]
  | ((_1:PiePay_UnitCapacityUpdated_eventFiltersArgs) => PiePay_UnitCapacityUpdated_eventFiltersDefinition);

export type chainId = number;
