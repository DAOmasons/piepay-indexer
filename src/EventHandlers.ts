/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  PiePay,
  PiePay_ContributionApproved,
  PiePay_ContributionRejected,
  PiePay_ContributionSubmitted,
  PiePay_ContributorRemoved,
  PiePay_ContributorWhitelisted,
  PiePay_ConversionMultipliersUpdated,
  PiePay_PayrollFunded,
  PiePay_PayrollManagerUpdated,
  PiePay_ProjectInitialized,
  PiePay_ProjectLeadUpdated,
  PiePay_TotalUnitsUpdated,
  PiePay_UnitCapacityUpdated,
  PiePay_UnitsConverted,
  PiePay_UnitsDistributed,
} from "generated";

PiePay.ContributionApproved.handler(async ({ event, context }) => {
  const entity: PiePay_ContributionApproved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    contributionId: event.params.contributionId,
    contributor: event.params.contributor,
    unitType: event.params.unitType,
    unitsAwarded: event.params.unitsAwarded,
  };

  context.PiePay_ContributionApproved.set(entity);
});

PiePay.ContributionRejected.handler(async ({ event, context }) => {
  const entity: PiePay_ContributionRejected = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    contributionId: event.params.contributionId,
    contributor: event.params.contributor,
  };

  context.PiePay_ContributionRejected.set(entity);
});

PiePay.ContributionSubmitted.handler(async ({ event, context }) => {
  const entity: PiePay_ContributionSubmitted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    contributionId: event.params.contributionId,
    unitType: event.params.unitType,
    unitsRequested: event.params.unitsRequested,
    description: event.params.description,
  };

  context.PiePay_ContributionSubmitted.set(entity);
});

PiePay.ContributorRemoved.handler(async ({ event, context }) => {
  const entity: PiePay_ContributorRemoved = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    contributor: event.params.contributor,
  };

  context.PiePay_ContributorRemoved.set(entity);
});

PiePay.ContributorWhitelisted.handler(async ({ event, context }) => {
  const entity: PiePay_ContributorWhitelisted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    contributor: event.params.contributor,
  };

  context.PiePay_ContributorWhitelisted.set(entity);
});

PiePay.ConversionMultipliersUpdated.handler(async ({ event, context }) => {
  const entity: PiePay_ConversionMultipliersUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    pToDMultiplier: event.params.pToDMultiplier,
    pToCMultiplier: event.params.pToCMultiplier,
    dToCMultiplier: event.params.dToCMultiplier,
  };

  context.PiePay_ConversionMultipliersUpdated.set(entity);
});

PiePay.PayrollFunded.handler(async ({ event, context }) => {
  const entity: PiePay_PayrollFunded = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    amount: event.params.amount,
  };

  context.PiePay_PayrollFunded.set(entity);
});

PiePay.PayrollManagerUpdated.handler(async ({ event, context }) => {
  const entity: PiePay_PayrollManagerUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    newManager: event.params.newManager,
  };

  context.PiePay_PayrollManagerUpdated.set(entity);
});

PiePay.ProjectInitialized.handler(async ({ event, context }) => {
  const entity: PiePay_ProjectInitialized = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    name: event.params.name,
    description: event.params.description,
    executor: event.params.executor,
  };

  context.PiePay_ProjectInitialized.set(entity);
});

PiePay.ProjectLeadUpdated.handler(async ({ event, context }) => {
  const entity: PiePay_ProjectLeadUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    newLead: event.params.newLead,
  };

  context.PiePay_ProjectLeadUpdated.set(entity);
});

PiePay.TotalUnitsUpdated.handler(async ({ event, context }) => {
  const entity: PiePay_TotalUnitsUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    unitType: event.params.unitType,
    newTotal: event.params.newTotal,
  };

  context.PiePay_TotalUnitsUpdated.set(entity);
});

PiePay.UnitCapacityUpdated.handler(async ({ event, context }) => {
  const entity: PiePay_UnitCapacityUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    unitType: event.params.unitType,
    newCapacity: event.params.newCapacity,
  };

  context.PiePay_UnitCapacityUpdated.set(entity);
});

PiePay.UnitsConverted.handler(async ({ event, context }) => {
  const entity: PiePay_UnitsConverted = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    fromType: event.params.fromType,
    toType: event.params.toType,
    fromAmount: event.params.fromAmount,
    toAmount: event.params.toAmount,
  };

  context.PiePay_UnitsConverted.set(entity);
});

PiePay.UnitsDistributed.handler(async ({ event, context }) => {
  const entity: PiePay_UnitsDistributed = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    executor: event.params.executor,
    unitType: event.params.unitType,
    totalDistributed: event.params.totalDistributed,
    recipientCount: event.params.recipientCount,
  };

  context.PiePay_UnitsDistributed.set(entity);
});
