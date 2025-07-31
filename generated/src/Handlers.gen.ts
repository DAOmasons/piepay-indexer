/* TypeScript file generated from Handlers.res by genType. */

/* eslint-disable */
/* tslint:disable */

const HandlersJS = require('./Handlers.res.js');

import type {HandlerTypes_eventConfig as Types_HandlerTypes_eventConfig} from './Types.gen';

import type {PiePay_ContributionApproved_contractRegister as Types_PiePay_ContributionApproved_contractRegister} from './Types.gen';

import type {PiePay_ContributionApproved_eventFilters as Types_PiePay_ContributionApproved_eventFilters} from './Types.gen';

import type {PiePay_ContributionApproved_handler as Types_PiePay_ContributionApproved_handler} from './Types.gen';

import type {PiePay_ContributionApproved_loader as Types_PiePay_ContributionApproved_loader} from './Types.gen';

import type {PiePay_ContributionRejected_contractRegister as Types_PiePay_ContributionRejected_contractRegister} from './Types.gen';

import type {PiePay_ContributionRejected_eventFilters as Types_PiePay_ContributionRejected_eventFilters} from './Types.gen';

import type {PiePay_ContributionRejected_handler as Types_PiePay_ContributionRejected_handler} from './Types.gen';

import type {PiePay_ContributionRejected_loader as Types_PiePay_ContributionRejected_loader} from './Types.gen';

import type {PiePay_ContributionSubmitted_contractRegister as Types_PiePay_ContributionSubmitted_contractRegister} from './Types.gen';

import type {PiePay_ContributionSubmitted_eventFilters as Types_PiePay_ContributionSubmitted_eventFilters} from './Types.gen';

import type {PiePay_ContributionSubmitted_handler as Types_PiePay_ContributionSubmitted_handler} from './Types.gen';

import type {PiePay_ContributionSubmitted_loader as Types_PiePay_ContributionSubmitted_loader} from './Types.gen';

import type {PiePay_ContributorRemoved_contractRegister as Types_PiePay_ContributorRemoved_contractRegister} from './Types.gen';

import type {PiePay_ContributorRemoved_eventFilters as Types_PiePay_ContributorRemoved_eventFilters} from './Types.gen';

import type {PiePay_ContributorRemoved_handler as Types_PiePay_ContributorRemoved_handler} from './Types.gen';

import type {PiePay_ContributorRemoved_loader as Types_PiePay_ContributorRemoved_loader} from './Types.gen';

import type {PiePay_ContributorWhitelisted_contractRegister as Types_PiePay_ContributorWhitelisted_contractRegister} from './Types.gen';

import type {PiePay_ContributorWhitelisted_eventFilters as Types_PiePay_ContributorWhitelisted_eventFilters} from './Types.gen';

import type {PiePay_ContributorWhitelisted_handler as Types_PiePay_ContributorWhitelisted_handler} from './Types.gen';

import type {PiePay_ContributorWhitelisted_loader as Types_PiePay_ContributorWhitelisted_loader} from './Types.gen';

import type {PiePay_ConversionMultipliersUpdated_contractRegister as Types_PiePay_ConversionMultipliersUpdated_contractRegister} from './Types.gen';

import type {PiePay_ConversionMultipliersUpdated_eventFilters as Types_PiePay_ConversionMultipliersUpdated_eventFilters} from './Types.gen';

import type {PiePay_ConversionMultipliersUpdated_handler as Types_PiePay_ConversionMultipliersUpdated_handler} from './Types.gen';

import type {PiePay_ConversionMultipliersUpdated_loader as Types_PiePay_ConversionMultipliersUpdated_loader} from './Types.gen';

import type {PiePay_PayrollFunded_contractRegister as Types_PiePay_PayrollFunded_contractRegister} from './Types.gen';

import type {PiePay_PayrollFunded_eventFilters as Types_PiePay_PayrollFunded_eventFilters} from './Types.gen';

import type {PiePay_PayrollFunded_handler as Types_PiePay_PayrollFunded_handler} from './Types.gen';

import type {PiePay_PayrollFunded_loader as Types_PiePay_PayrollFunded_loader} from './Types.gen';

import type {PiePay_PayrollManagerUpdated_contractRegister as Types_PiePay_PayrollManagerUpdated_contractRegister} from './Types.gen';

import type {PiePay_PayrollManagerUpdated_eventFilters as Types_PiePay_PayrollManagerUpdated_eventFilters} from './Types.gen';

import type {PiePay_PayrollManagerUpdated_handler as Types_PiePay_PayrollManagerUpdated_handler} from './Types.gen';

import type {PiePay_PayrollManagerUpdated_loader as Types_PiePay_PayrollManagerUpdated_loader} from './Types.gen';

import type {PiePay_ProjectInitialized_contractRegister as Types_PiePay_ProjectInitialized_contractRegister} from './Types.gen';

import type {PiePay_ProjectInitialized_eventFilters as Types_PiePay_ProjectInitialized_eventFilters} from './Types.gen';

import type {PiePay_ProjectInitialized_handler as Types_PiePay_ProjectInitialized_handler} from './Types.gen';

import type {PiePay_ProjectInitialized_loader as Types_PiePay_ProjectInitialized_loader} from './Types.gen';

import type {PiePay_ProjectLeadUpdated_contractRegister as Types_PiePay_ProjectLeadUpdated_contractRegister} from './Types.gen';

import type {PiePay_ProjectLeadUpdated_eventFilters as Types_PiePay_ProjectLeadUpdated_eventFilters} from './Types.gen';

import type {PiePay_ProjectLeadUpdated_handler as Types_PiePay_ProjectLeadUpdated_handler} from './Types.gen';

import type {PiePay_ProjectLeadUpdated_loader as Types_PiePay_ProjectLeadUpdated_loader} from './Types.gen';

import type {PiePay_TotalUnitsUpdated_contractRegister as Types_PiePay_TotalUnitsUpdated_contractRegister} from './Types.gen';

import type {PiePay_TotalUnitsUpdated_eventFilters as Types_PiePay_TotalUnitsUpdated_eventFilters} from './Types.gen';

import type {PiePay_TotalUnitsUpdated_handler as Types_PiePay_TotalUnitsUpdated_handler} from './Types.gen';

import type {PiePay_TotalUnitsUpdated_loader as Types_PiePay_TotalUnitsUpdated_loader} from './Types.gen';

import type {PiePay_UnitCapacityUpdated_contractRegister as Types_PiePay_UnitCapacityUpdated_contractRegister} from './Types.gen';

import type {PiePay_UnitCapacityUpdated_eventFilters as Types_PiePay_UnitCapacityUpdated_eventFilters} from './Types.gen';

import type {PiePay_UnitCapacityUpdated_handler as Types_PiePay_UnitCapacityUpdated_handler} from './Types.gen';

import type {PiePay_UnitCapacityUpdated_loader as Types_PiePay_UnitCapacityUpdated_loader} from './Types.gen';

import type {PiePay_UnitsConverted_contractRegister as Types_PiePay_UnitsConverted_contractRegister} from './Types.gen';

import type {PiePay_UnitsConverted_eventFilters as Types_PiePay_UnitsConverted_eventFilters} from './Types.gen';

import type {PiePay_UnitsConverted_handler as Types_PiePay_UnitsConverted_handler} from './Types.gen';

import type {PiePay_UnitsConverted_loader as Types_PiePay_UnitsConverted_loader} from './Types.gen';

import type {PiePay_UnitsDistributed_contractRegister as Types_PiePay_UnitsDistributed_contractRegister} from './Types.gen';

import type {PiePay_UnitsDistributed_eventFilters as Types_PiePay_UnitsDistributed_eventFilters} from './Types.gen';

import type {PiePay_UnitsDistributed_handler as Types_PiePay_UnitsDistributed_handler} from './Types.gen';

import type {PiePay_UnitsDistributed_loader as Types_PiePay_UnitsDistributed_loader} from './Types.gen';

import type {fnWithEventConfig as Types_fnWithEventConfig} from './Types.gen';

import type {genericHandlerWithLoader as Internal_genericHandlerWithLoader} from 'envio/src/Internal.gen';

export const PiePay_ProjectInitialized_handler: Types_fnWithEventConfig<Types_PiePay_ProjectInitialized_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectInitialized_eventFilters>> = HandlersJS.PiePay.ProjectInitialized.handler as any;

export const PiePay_ProjectInitialized_contractRegister: Types_fnWithEventConfig<Types_PiePay_ProjectInitialized_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectInitialized_eventFilters>> = HandlersJS.PiePay.ProjectInitialized.contractRegister as any;

export const PiePay_ProjectInitialized_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ProjectInitialized_loader<loaderReturn>,Types_PiePay_ProjectInitialized_handler<loaderReturn>,Types_PiePay_ProjectInitialized_eventFilters>) => void = HandlersJS.PiePay.ProjectInitialized.handlerWithLoader as any;

export const PiePay_ContributionSubmitted_handler: Types_fnWithEventConfig<Types_PiePay_ContributionSubmitted_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionSubmitted_eventFilters>> = HandlersJS.PiePay.ContributionSubmitted.handler as any;

export const PiePay_ContributionSubmitted_contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributionSubmitted_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionSubmitted_eventFilters>> = HandlersJS.PiePay.ContributionSubmitted.contractRegister as any;

export const PiePay_ContributionSubmitted_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributionSubmitted_loader<loaderReturn>,Types_PiePay_ContributionSubmitted_handler<loaderReturn>,Types_PiePay_ContributionSubmitted_eventFilters>) => void = HandlersJS.PiePay.ContributionSubmitted.handlerWithLoader as any;

export const PiePay_ContributionApproved_handler: Types_fnWithEventConfig<Types_PiePay_ContributionApproved_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionApproved_eventFilters>> = HandlersJS.PiePay.ContributionApproved.handler as any;

export const PiePay_ContributionApproved_contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributionApproved_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionApproved_eventFilters>> = HandlersJS.PiePay.ContributionApproved.contractRegister as any;

export const PiePay_ContributionApproved_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributionApproved_loader<loaderReturn>,Types_PiePay_ContributionApproved_handler<loaderReturn>,Types_PiePay_ContributionApproved_eventFilters>) => void = HandlersJS.PiePay.ContributionApproved.handlerWithLoader as any;

export const PiePay_ContributionRejected_handler: Types_fnWithEventConfig<Types_PiePay_ContributionRejected_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionRejected_eventFilters>> = HandlersJS.PiePay.ContributionRejected.handler as any;

export const PiePay_ContributionRejected_contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributionRejected_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionRejected_eventFilters>> = HandlersJS.PiePay.ContributionRejected.contractRegister as any;

export const PiePay_ContributionRejected_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributionRejected_loader<loaderReturn>,Types_PiePay_ContributionRejected_handler<loaderReturn>,Types_PiePay_ContributionRejected_eventFilters>) => void = HandlersJS.PiePay.ContributionRejected.handlerWithLoader as any;

export const PiePay_UnitsDistributed_handler: Types_fnWithEventConfig<Types_PiePay_UnitsDistributed_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsDistributed_eventFilters>> = HandlersJS.PiePay.UnitsDistributed.handler as any;

export const PiePay_UnitsDistributed_contractRegister: Types_fnWithEventConfig<Types_PiePay_UnitsDistributed_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsDistributed_eventFilters>> = HandlersJS.PiePay.UnitsDistributed.contractRegister as any;

export const PiePay_UnitsDistributed_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_UnitsDistributed_loader<loaderReturn>,Types_PiePay_UnitsDistributed_handler<loaderReturn>,Types_PiePay_UnitsDistributed_eventFilters>) => void = HandlersJS.PiePay.UnitsDistributed.handlerWithLoader as any;

export const PiePay_PayrollFunded_handler: Types_fnWithEventConfig<Types_PiePay_PayrollFunded_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollFunded_eventFilters>> = HandlersJS.PiePay.PayrollFunded.handler as any;

export const PiePay_PayrollFunded_contractRegister: Types_fnWithEventConfig<Types_PiePay_PayrollFunded_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollFunded_eventFilters>> = HandlersJS.PiePay.PayrollFunded.contractRegister as any;

export const PiePay_PayrollFunded_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_PayrollFunded_loader<loaderReturn>,Types_PiePay_PayrollFunded_handler<loaderReturn>,Types_PiePay_PayrollFunded_eventFilters>) => void = HandlersJS.PiePay.PayrollFunded.handlerWithLoader as any;

export const PiePay_ContributorWhitelisted_handler: Types_fnWithEventConfig<Types_PiePay_ContributorWhitelisted_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorWhitelisted_eventFilters>> = HandlersJS.PiePay.ContributorWhitelisted.handler as any;

export const PiePay_ContributorWhitelisted_contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributorWhitelisted_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorWhitelisted_eventFilters>> = HandlersJS.PiePay.ContributorWhitelisted.contractRegister as any;

export const PiePay_ContributorWhitelisted_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributorWhitelisted_loader<loaderReturn>,Types_PiePay_ContributorWhitelisted_handler<loaderReturn>,Types_PiePay_ContributorWhitelisted_eventFilters>) => void = HandlersJS.PiePay.ContributorWhitelisted.handlerWithLoader as any;

export const PiePay_ContributorRemoved_handler: Types_fnWithEventConfig<Types_PiePay_ContributorRemoved_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorRemoved_eventFilters>> = HandlersJS.PiePay.ContributorRemoved.handler as any;

export const PiePay_ContributorRemoved_contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributorRemoved_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorRemoved_eventFilters>> = HandlersJS.PiePay.ContributorRemoved.contractRegister as any;

export const PiePay_ContributorRemoved_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributorRemoved_loader<loaderReturn>,Types_PiePay_ContributorRemoved_handler<loaderReturn>,Types_PiePay_ContributorRemoved_eventFilters>) => void = HandlersJS.PiePay.ContributorRemoved.handlerWithLoader as any;

export const PiePay_ProjectLeadUpdated_handler: Types_fnWithEventConfig<Types_PiePay_ProjectLeadUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectLeadUpdated_eventFilters>> = HandlersJS.PiePay.ProjectLeadUpdated.handler as any;

export const PiePay_ProjectLeadUpdated_contractRegister: Types_fnWithEventConfig<Types_PiePay_ProjectLeadUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectLeadUpdated_eventFilters>> = HandlersJS.PiePay.ProjectLeadUpdated.contractRegister as any;

export const PiePay_ProjectLeadUpdated_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ProjectLeadUpdated_loader<loaderReturn>,Types_PiePay_ProjectLeadUpdated_handler<loaderReturn>,Types_PiePay_ProjectLeadUpdated_eventFilters>) => void = HandlersJS.PiePay.ProjectLeadUpdated.handlerWithLoader as any;

export const PiePay_PayrollManagerUpdated_handler: Types_fnWithEventConfig<Types_PiePay_PayrollManagerUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollManagerUpdated_eventFilters>> = HandlersJS.PiePay.PayrollManagerUpdated.handler as any;

export const PiePay_PayrollManagerUpdated_contractRegister: Types_fnWithEventConfig<Types_PiePay_PayrollManagerUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollManagerUpdated_eventFilters>> = HandlersJS.PiePay.PayrollManagerUpdated.contractRegister as any;

export const PiePay_PayrollManagerUpdated_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_PayrollManagerUpdated_loader<loaderReturn>,Types_PiePay_PayrollManagerUpdated_handler<loaderReturn>,Types_PiePay_PayrollManagerUpdated_eventFilters>) => void = HandlersJS.PiePay.PayrollManagerUpdated.handlerWithLoader as any;

export const PiePay_UnitsConverted_handler: Types_fnWithEventConfig<Types_PiePay_UnitsConverted_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsConverted_eventFilters>> = HandlersJS.PiePay.UnitsConverted.handler as any;

export const PiePay_UnitsConverted_contractRegister: Types_fnWithEventConfig<Types_PiePay_UnitsConverted_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsConverted_eventFilters>> = HandlersJS.PiePay.UnitsConverted.contractRegister as any;

export const PiePay_UnitsConverted_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_UnitsConverted_loader<loaderReturn>,Types_PiePay_UnitsConverted_handler<loaderReturn>,Types_PiePay_UnitsConverted_eventFilters>) => void = HandlersJS.PiePay.UnitsConverted.handlerWithLoader as any;

export const PiePay_TotalUnitsUpdated_handler: Types_fnWithEventConfig<Types_PiePay_TotalUnitsUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_TotalUnitsUpdated_eventFilters>> = HandlersJS.PiePay.TotalUnitsUpdated.handler as any;

export const PiePay_TotalUnitsUpdated_contractRegister: Types_fnWithEventConfig<Types_PiePay_TotalUnitsUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_TotalUnitsUpdated_eventFilters>> = HandlersJS.PiePay.TotalUnitsUpdated.contractRegister as any;

export const PiePay_TotalUnitsUpdated_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_TotalUnitsUpdated_loader<loaderReturn>,Types_PiePay_TotalUnitsUpdated_handler<loaderReturn>,Types_PiePay_TotalUnitsUpdated_eventFilters>) => void = HandlersJS.PiePay.TotalUnitsUpdated.handlerWithLoader as any;

export const PiePay_ConversionMultipliersUpdated_handler: Types_fnWithEventConfig<Types_PiePay_ConversionMultipliersUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ConversionMultipliersUpdated_eventFilters>> = HandlersJS.PiePay.ConversionMultipliersUpdated.handler as any;

export const PiePay_ConversionMultipliersUpdated_contractRegister: Types_fnWithEventConfig<Types_PiePay_ConversionMultipliersUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ConversionMultipliersUpdated_eventFilters>> = HandlersJS.PiePay.ConversionMultipliersUpdated.contractRegister as any;

export const PiePay_ConversionMultipliersUpdated_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ConversionMultipliersUpdated_loader<loaderReturn>,Types_PiePay_ConversionMultipliersUpdated_handler<loaderReturn>,Types_PiePay_ConversionMultipliersUpdated_eventFilters>) => void = HandlersJS.PiePay.ConversionMultipliersUpdated.handlerWithLoader as any;

export const PiePay_UnitCapacityUpdated_handler: Types_fnWithEventConfig<Types_PiePay_UnitCapacityUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_UnitCapacityUpdated_eventFilters>> = HandlersJS.PiePay.UnitCapacityUpdated.handler as any;

export const PiePay_UnitCapacityUpdated_contractRegister: Types_fnWithEventConfig<Types_PiePay_UnitCapacityUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_UnitCapacityUpdated_eventFilters>> = HandlersJS.PiePay.UnitCapacityUpdated.contractRegister as any;

export const PiePay_UnitCapacityUpdated_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_UnitCapacityUpdated_loader<loaderReturn>,Types_PiePay_UnitCapacityUpdated_handler<loaderReturn>,Types_PiePay_UnitCapacityUpdated_eventFilters>) => void = HandlersJS.PiePay.UnitCapacityUpdated.handlerWithLoader as any;

export const PiePay: {
  PayrollFunded: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_PayrollFunded_loader<loaderReturn>,Types_PiePay_PayrollFunded_handler<loaderReturn>,Types_PiePay_PayrollFunded_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_PayrollFunded_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollFunded_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_PayrollFunded_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollFunded_eventFilters>>
  }; 
  UnitsDistributed: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_UnitsDistributed_loader<loaderReturn>,Types_PiePay_UnitsDistributed_handler<loaderReturn>,Types_PiePay_UnitsDistributed_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_UnitsDistributed_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsDistributed_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_UnitsDistributed_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsDistributed_eventFilters>>
  }; 
  ContributorWhitelisted: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributorWhitelisted_loader<loaderReturn>,Types_PiePay_ContributorWhitelisted_handler<loaderReturn>,Types_PiePay_ContributorWhitelisted_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ContributorWhitelisted_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorWhitelisted_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributorWhitelisted_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorWhitelisted_eventFilters>>
  }; 
  PayrollManagerUpdated: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_PayrollManagerUpdated_loader<loaderReturn>,Types_PiePay_PayrollManagerUpdated_handler<loaderReturn>,Types_PiePay_PayrollManagerUpdated_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_PayrollManagerUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollManagerUpdated_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_PayrollManagerUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_PayrollManagerUpdated_eventFilters>>
  }; 
  ConversionMultipliersUpdated: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ConversionMultipliersUpdated_loader<loaderReturn>,Types_PiePay_ConversionMultipliersUpdated_handler<loaderReturn>,Types_PiePay_ConversionMultipliersUpdated_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ConversionMultipliersUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ConversionMultipliersUpdated_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ConversionMultipliersUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ConversionMultipliersUpdated_eventFilters>>
  }; 
  ContributorRemoved: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributorRemoved_loader<loaderReturn>,Types_PiePay_ContributorRemoved_handler<loaderReturn>,Types_PiePay_ContributorRemoved_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ContributorRemoved_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorRemoved_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributorRemoved_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributorRemoved_eventFilters>>
  }; 
  UnitCapacityUpdated: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_UnitCapacityUpdated_loader<loaderReturn>,Types_PiePay_UnitCapacityUpdated_handler<loaderReturn>,Types_PiePay_UnitCapacityUpdated_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_UnitCapacityUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_UnitCapacityUpdated_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_UnitCapacityUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_UnitCapacityUpdated_eventFilters>>
  }; 
  ProjectInitialized: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ProjectInitialized_loader<loaderReturn>,Types_PiePay_ProjectInitialized_handler<loaderReturn>,Types_PiePay_ProjectInitialized_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ProjectInitialized_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectInitialized_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ProjectInitialized_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectInitialized_eventFilters>>
  }; 
  ContributionSubmitted: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributionSubmitted_loader<loaderReturn>,Types_PiePay_ContributionSubmitted_handler<loaderReturn>,Types_PiePay_ContributionSubmitted_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ContributionSubmitted_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionSubmitted_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributionSubmitted_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionSubmitted_eventFilters>>
  }; 
  ContributionApproved: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributionApproved_loader<loaderReturn>,Types_PiePay_ContributionApproved_handler<loaderReturn>,Types_PiePay_ContributionApproved_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ContributionApproved_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionApproved_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributionApproved_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionApproved_eventFilters>>
  }; 
  TotalUnitsUpdated: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_TotalUnitsUpdated_loader<loaderReturn>,Types_PiePay_TotalUnitsUpdated_handler<loaderReturn>,Types_PiePay_TotalUnitsUpdated_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_TotalUnitsUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_TotalUnitsUpdated_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_TotalUnitsUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_TotalUnitsUpdated_eventFilters>>
  }; 
  ContributionRejected: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ContributionRejected_loader<loaderReturn>,Types_PiePay_ContributionRejected_handler<loaderReturn>,Types_PiePay_ContributionRejected_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ContributionRejected_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionRejected_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ContributionRejected_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ContributionRejected_eventFilters>>
  }; 
  ProjectLeadUpdated: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_ProjectLeadUpdated_loader<loaderReturn>,Types_PiePay_ProjectLeadUpdated_handler<loaderReturn>,Types_PiePay_ProjectLeadUpdated_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_ProjectLeadUpdated_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectLeadUpdated_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_ProjectLeadUpdated_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_ProjectLeadUpdated_eventFilters>>
  }; 
  UnitsConverted: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Types_PiePay_UnitsConverted_loader<loaderReturn>,Types_PiePay_UnitsConverted_handler<loaderReturn>,Types_PiePay_UnitsConverted_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Types_PiePay_UnitsConverted_handler<void>,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsConverted_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Types_PiePay_UnitsConverted_contractRegister,Types_HandlerTypes_eventConfig<Types_PiePay_UnitsConverted_eventFilters>>
  }
} = HandlersJS.PiePay as any;
