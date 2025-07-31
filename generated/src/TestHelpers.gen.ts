/* TypeScript file generated from TestHelpers.res by genType. */

/* eslint-disable */
/* tslint:disable */

const TestHelpersJS = require('./TestHelpers.res.js');

import type {PiePay_ContributionApproved_event as Types_PiePay_ContributionApproved_event} from './Types.gen';

import type {PiePay_ContributionRejected_event as Types_PiePay_ContributionRejected_event} from './Types.gen';

import type {PiePay_ContributionSubmitted_event as Types_PiePay_ContributionSubmitted_event} from './Types.gen';

import type {PiePay_ContributorRemoved_event as Types_PiePay_ContributorRemoved_event} from './Types.gen';

import type {PiePay_ContributorWhitelisted_event as Types_PiePay_ContributorWhitelisted_event} from './Types.gen';

import type {PiePay_ConversionMultipliersUpdated_event as Types_PiePay_ConversionMultipliersUpdated_event} from './Types.gen';

import type {PiePay_PayrollFunded_event as Types_PiePay_PayrollFunded_event} from './Types.gen';

import type {PiePay_PayrollManagerUpdated_event as Types_PiePay_PayrollManagerUpdated_event} from './Types.gen';

import type {PiePay_ProjectInitialized_event as Types_PiePay_ProjectInitialized_event} from './Types.gen';

import type {PiePay_ProjectLeadUpdated_event as Types_PiePay_ProjectLeadUpdated_event} from './Types.gen';

import type {PiePay_TotalUnitsUpdated_event as Types_PiePay_TotalUnitsUpdated_event} from './Types.gen';

import type {PiePay_UnitCapacityUpdated_event as Types_PiePay_UnitCapacityUpdated_event} from './Types.gen';

import type {PiePay_UnitsConverted_event as Types_PiePay_UnitsConverted_event} from './Types.gen';

import type {PiePay_UnitsDistributed_event as Types_PiePay_UnitsDistributed_event} from './Types.gen';

import type {t as Address_t} from 'envio/src/Address.gen';

import type {t as TestHelpers_MockDb_t} from './TestHelpers_MockDb.gen';

/** The arguements that get passed to a "processEvent" helper function */
export type EventFunctions_eventProcessorArgs<event> = {
  readonly event: event; 
  readonly mockDb: TestHelpers_MockDb_t; 
  readonly chainId?: number
};

export type EventFunctions_eventProcessor<event> = (_1:EventFunctions_eventProcessorArgs<event>) => Promise<TestHelpers_MockDb_t>;

export type EventFunctions_MockBlock_t = {
  readonly hash?: string; 
  readonly number?: number; 
  readonly timestamp?: number
};

export type EventFunctions_MockTransaction_t = {
  readonly from?: (undefined | Address_t); 
  readonly hash?: string; 
  readonly to?: (undefined | Address_t); 
  readonly transactionIndex?: number
};

export type EventFunctions_mockEventData = {
  readonly chainId?: number; 
  readonly srcAddress?: Address_t; 
  readonly logIndex?: number; 
  readonly block?: EventFunctions_MockBlock_t; 
  readonly transaction?: EventFunctions_MockTransaction_t
};

export type PiePay_ProjectInitialized_createMockArgs = {
  readonly name?: string; 
  readonly description?: string; 
  readonly executor?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ContributionSubmitted_createMockArgs = {
  readonly executor?: Address_t; 
  readonly contributionId?: bigint; 
  readonly unitType?: bigint; 
  readonly unitsRequested?: bigint; 
  readonly description?: string; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ContributionApproved_createMockArgs = {
  readonly executor?: Address_t; 
  readonly contributionId?: bigint; 
  readonly contributor?: Address_t; 
  readonly unitType?: bigint; 
  readonly unitsAwarded?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ContributionRejected_createMockArgs = {
  readonly executor?: Address_t; 
  readonly contributionId?: bigint; 
  readonly contributor?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_UnitsDistributed_createMockArgs = {
  readonly executor?: Address_t; 
  readonly unitType?: bigint; 
  readonly totalDistributed?: bigint; 
  readonly recipientCount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_PayrollFunded_createMockArgs = {
  readonly executor?: Address_t; 
  readonly amount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ContributorWhitelisted_createMockArgs = {
  readonly executor?: Address_t; 
  readonly contributor?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ContributorRemoved_createMockArgs = {
  readonly executor?: Address_t; 
  readonly contributor?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ProjectLeadUpdated_createMockArgs = {
  readonly executor?: Address_t; 
  readonly newLead?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_PayrollManagerUpdated_createMockArgs = {
  readonly executor?: Address_t; 
  readonly newManager?: Address_t; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_UnitsConverted_createMockArgs = {
  readonly executor?: Address_t; 
  readonly fromType?: bigint; 
  readonly toType?: bigint; 
  readonly fromAmount?: bigint; 
  readonly toAmount?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_TotalUnitsUpdated_createMockArgs = {
  readonly unitType?: bigint; 
  readonly newTotal?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_ConversionMultipliersUpdated_createMockArgs = {
  readonly executor?: Address_t; 
  readonly pToDMultiplier?: bigint; 
  readonly pToCMultiplier?: bigint; 
  readonly dToCMultiplier?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export type PiePay_UnitCapacityUpdated_createMockArgs = {
  readonly executor?: Address_t; 
  readonly unitType?: bigint; 
  readonly newCapacity?: bigint; 
  readonly mockEventData?: EventFunctions_mockEventData
};

export const MockDb_createMockDb: () => TestHelpers_MockDb_t = TestHelpersJS.MockDb.createMockDb as any;

export const Addresses_mockAddresses: Address_t[] = TestHelpersJS.Addresses.mockAddresses as any;

export const Addresses_defaultAddress: Address_t = TestHelpersJS.Addresses.defaultAddress as any;

export const PiePay_ProjectInitialized_processEvent: EventFunctions_eventProcessor<Types_PiePay_ProjectInitialized_event> = TestHelpersJS.PiePay.ProjectInitialized.processEvent as any;

export const PiePay_ProjectInitialized_createMockEvent: (args:PiePay_ProjectInitialized_createMockArgs) => Types_PiePay_ProjectInitialized_event = TestHelpersJS.PiePay.ProjectInitialized.createMockEvent as any;

export const PiePay_ContributionSubmitted_processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributionSubmitted_event> = TestHelpersJS.PiePay.ContributionSubmitted.processEvent as any;

export const PiePay_ContributionSubmitted_createMockEvent: (args:PiePay_ContributionSubmitted_createMockArgs) => Types_PiePay_ContributionSubmitted_event = TestHelpersJS.PiePay.ContributionSubmitted.createMockEvent as any;

export const PiePay_ContributionApproved_processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributionApproved_event> = TestHelpersJS.PiePay.ContributionApproved.processEvent as any;

export const PiePay_ContributionApproved_createMockEvent: (args:PiePay_ContributionApproved_createMockArgs) => Types_PiePay_ContributionApproved_event = TestHelpersJS.PiePay.ContributionApproved.createMockEvent as any;

export const PiePay_ContributionRejected_processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributionRejected_event> = TestHelpersJS.PiePay.ContributionRejected.processEvent as any;

export const PiePay_ContributionRejected_createMockEvent: (args:PiePay_ContributionRejected_createMockArgs) => Types_PiePay_ContributionRejected_event = TestHelpersJS.PiePay.ContributionRejected.createMockEvent as any;

export const PiePay_UnitsDistributed_processEvent: EventFunctions_eventProcessor<Types_PiePay_UnitsDistributed_event> = TestHelpersJS.PiePay.UnitsDistributed.processEvent as any;

export const PiePay_UnitsDistributed_createMockEvent: (args:PiePay_UnitsDistributed_createMockArgs) => Types_PiePay_UnitsDistributed_event = TestHelpersJS.PiePay.UnitsDistributed.createMockEvent as any;

export const PiePay_PayrollFunded_processEvent: EventFunctions_eventProcessor<Types_PiePay_PayrollFunded_event> = TestHelpersJS.PiePay.PayrollFunded.processEvent as any;

export const PiePay_PayrollFunded_createMockEvent: (args:PiePay_PayrollFunded_createMockArgs) => Types_PiePay_PayrollFunded_event = TestHelpersJS.PiePay.PayrollFunded.createMockEvent as any;

export const PiePay_ContributorWhitelisted_processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributorWhitelisted_event> = TestHelpersJS.PiePay.ContributorWhitelisted.processEvent as any;

export const PiePay_ContributorWhitelisted_createMockEvent: (args:PiePay_ContributorWhitelisted_createMockArgs) => Types_PiePay_ContributorWhitelisted_event = TestHelpersJS.PiePay.ContributorWhitelisted.createMockEvent as any;

export const PiePay_ContributorRemoved_processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributorRemoved_event> = TestHelpersJS.PiePay.ContributorRemoved.processEvent as any;

export const PiePay_ContributorRemoved_createMockEvent: (args:PiePay_ContributorRemoved_createMockArgs) => Types_PiePay_ContributorRemoved_event = TestHelpersJS.PiePay.ContributorRemoved.createMockEvent as any;

export const PiePay_ProjectLeadUpdated_processEvent: EventFunctions_eventProcessor<Types_PiePay_ProjectLeadUpdated_event> = TestHelpersJS.PiePay.ProjectLeadUpdated.processEvent as any;

export const PiePay_ProjectLeadUpdated_createMockEvent: (args:PiePay_ProjectLeadUpdated_createMockArgs) => Types_PiePay_ProjectLeadUpdated_event = TestHelpersJS.PiePay.ProjectLeadUpdated.createMockEvent as any;

export const PiePay_PayrollManagerUpdated_processEvent: EventFunctions_eventProcessor<Types_PiePay_PayrollManagerUpdated_event> = TestHelpersJS.PiePay.PayrollManagerUpdated.processEvent as any;

export const PiePay_PayrollManagerUpdated_createMockEvent: (args:PiePay_PayrollManagerUpdated_createMockArgs) => Types_PiePay_PayrollManagerUpdated_event = TestHelpersJS.PiePay.PayrollManagerUpdated.createMockEvent as any;

export const PiePay_UnitsConverted_processEvent: EventFunctions_eventProcessor<Types_PiePay_UnitsConverted_event> = TestHelpersJS.PiePay.UnitsConverted.processEvent as any;

export const PiePay_UnitsConverted_createMockEvent: (args:PiePay_UnitsConverted_createMockArgs) => Types_PiePay_UnitsConverted_event = TestHelpersJS.PiePay.UnitsConverted.createMockEvent as any;

export const PiePay_TotalUnitsUpdated_processEvent: EventFunctions_eventProcessor<Types_PiePay_TotalUnitsUpdated_event> = TestHelpersJS.PiePay.TotalUnitsUpdated.processEvent as any;

export const PiePay_TotalUnitsUpdated_createMockEvent: (args:PiePay_TotalUnitsUpdated_createMockArgs) => Types_PiePay_TotalUnitsUpdated_event = TestHelpersJS.PiePay.TotalUnitsUpdated.createMockEvent as any;

export const PiePay_ConversionMultipliersUpdated_processEvent: EventFunctions_eventProcessor<Types_PiePay_ConversionMultipliersUpdated_event> = TestHelpersJS.PiePay.ConversionMultipliersUpdated.processEvent as any;

export const PiePay_ConversionMultipliersUpdated_createMockEvent: (args:PiePay_ConversionMultipliersUpdated_createMockArgs) => Types_PiePay_ConversionMultipliersUpdated_event = TestHelpersJS.PiePay.ConversionMultipliersUpdated.createMockEvent as any;

export const PiePay_UnitCapacityUpdated_processEvent: EventFunctions_eventProcessor<Types_PiePay_UnitCapacityUpdated_event> = TestHelpersJS.PiePay.UnitCapacityUpdated.processEvent as any;

export const PiePay_UnitCapacityUpdated_createMockEvent: (args:PiePay_UnitCapacityUpdated_createMockArgs) => Types_PiePay_UnitCapacityUpdated_event = TestHelpersJS.PiePay.UnitCapacityUpdated.createMockEvent as any;

export const Addresses: { mockAddresses: Address_t[]; defaultAddress: Address_t } = TestHelpersJS.Addresses as any;

export const PiePay: {
  PayrollFunded: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_PayrollFunded_event>; 
    createMockEvent: (args:PiePay_PayrollFunded_createMockArgs) => Types_PiePay_PayrollFunded_event
  }; 
  UnitsDistributed: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_UnitsDistributed_event>; 
    createMockEvent: (args:PiePay_UnitsDistributed_createMockArgs) => Types_PiePay_UnitsDistributed_event
  }; 
  ContributorWhitelisted: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributorWhitelisted_event>; 
    createMockEvent: (args:PiePay_ContributorWhitelisted_createMockArgs) => Types_PiePay_ContributorWhitelisted_event
  }; 
  PayrollManagerUpdated: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_PayrollManagerUpdated_event>; 
    createMockEvent: (args:PiePay_PayrollManagerUpdated_createMockArgs) => Types_PiePay_PayrollManagerUpdated_event
  }; 
  ConversionMultipliersUpdated: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ConversionMultipliersUpdated_event>; 
    createMockEvent: (args:PiePay_ConversionMultipliersUpdated_createMockArgs) => Types_PiePay_ConversionMultipliersUpdated_event
  }; 
  ContributorRemoved: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributorRemoved_event>; 
    createMockEvent: (args:PiePay_ContributorRemoved_createMockArgs) => Types_PiePay_ContributorRemoved_event
  }; 
  UnitCapacityUpdated: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_UnitCapacityUpdated_event>; 
    createMockEvent: (args:PiePay_UnitCapacityUpdated_createMockArgs) => Types_PiePay_UnitCapacityUpdated_event
  }; 
  ProjectInitialized: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ProjectInitialized_event>; 
    createMockEvent: (args:PiePay_ProjectInitialized_createMockArgs) => Types_PiePay_ProjectInitialized_event
  }; 
  ContributionSubmitted: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributionSubmitted_event>; 
    createMockEvent: (args:PiePay_ContributionSubmitted_createMockArgs) => Types_PiePay_ContributionSubmitted_event
  }; 
  ContributionApproved: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributionApproved_event>; 
    createMockEvent: (args:PiePay_ContributionApproved_createMockArgs) => Types_PiePay_ContributionApproved_event
  }; 
  TotalUnitsUpdated: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_TotalUnitsUpdated_event>; 
    createMockEvent: (args:PiePay_TotalUnitsUpdated_createMockArgs) => Types_PiePay_TotalUnitsUpdated_event
  }; 
  ContributionRejected: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ContributionRejected_event>; 
    createMockEvent: (args:PiePay_ContributionRejected_createMockArgs) => Types_PiePay_ContributionRejected_event
  }; 
  ProjectLeadUpdated: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_ProjectLeadUpdated_event>; 
    createMockEvent: (args:PiePay_ProjectLeadUpdated_createMockArgs) => Types_PiePay_ProjectLeadUpdated_event
  }; 
  UnitsConverted: {
    processEvent: EventFunctions_eventProcessor<Types_PiePay_UnitsConverted_event>; 
    createMockEvent: (args:PiePay_UnitsConverted_createMockArgs) => Types_PiePay_UnitsConverted_event
  }
} = TestHelpersJS.PiePay as any;

export const MockDb: { createMockDb: () => TestHelpers_MockDb_t } = TestHelpersJS.MockDb as any;
