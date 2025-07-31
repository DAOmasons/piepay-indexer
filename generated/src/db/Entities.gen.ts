/* TypeScript file generated from Entities.res by genType. */

/* eslint-disable */
/* tslint:disable */

import type {ContributionStatus_t as Enums_ContributionStatus_t} from './Enums.gen';

import type {UnitType_t as Enums_UnitType_t} from './Enums.gen';

export type id = string;

export type whereOperations<entity,fieldType> = { readonly eq: (_1:fieldType) => Promise<entity[]>; readonly gt: (_1:fieldType) => Promise<entity[]> };

export type Contribution_t = {
  readonly approvedAt: (undefined | bigint); 
  readonly blockNumber: bigint; 
  readonly contributionId: bigint; 
  readonly contributor_id: id; 
  readonly description: string; 
  readonly executor: string; 
  readonly id: id; 
  readonly rejectedAt: (undefined | bigint); 
  readonly status: Enums_ContributionStatus_t; 
  readonly submittedAt: bigint; 
  readonly transactionHash: string; 
  readonly unitType: Enums_UnitType_t; 
  readonly unitsAwarded: (undefined | bigint); 
  readonly unitsRequested: bigint
};

export type Contribution_indexedFieldOperations = { readonly contributor_id: whereOperations<Contribution_t,id> };

export type Contributor_t = {
  readonly address: string; 
  readonly capitalUnits: bigint; 
  readonly debtUnits: bigint; 
  readonly id: id; 
  readonly isWhitelisted: boolean; 
  readonly profitUnits: bigint; 
  readonly removedAt: (undefined | bigint); 
  readonly totalContributions: number; 
  readonly totalUnitsEarned: bigint; 
  readonly whitelistedAt: (undefined | bigint)
};

export type Contributor_indexedFieldOperations = {};

export type PayrollFunding_t = {
  readonly amount: bigint; 
  readonly blockNumber: bigint; 
  readonly cumulativeAmount: bigint; 
  readonly executor: string; 
  readonly fundedAt: bigint; 
  readonly id: id; 
  readonly transactionHash: string
};

export type PayrollFunding_indexedFieldOperations = {};

export type Project_t = {
  readonly blockNumber: bigint; 
  readonly contractAddress: string; 
  readonly createdAt: bigint; 
  readonly description: string; 
  readonly id: id; 
  readonly name: string; 
  readonly payrollManager: string; 
  readonly projectLead: string; 
  readonly totalPayrollFunded: bigint; 
  readonly transactionHash: string
};

export type Project_indexedFieldOperations = {};

export type SystemStat_t = {
  readonly dToCMultiplier: number; 
  readonly id: id; 
  readonly lastUpdated: bigint; 
  readonly pToCMultiplier: number; 
  readonly pToDMultiplier: number; 
  readonly totalCapitalUnits: bigint; 
  readonly totalContributions: number; 
  readonly totalContributors: number; 
  readonly totalDebtUnits: bigint; 
  readonly totalPayrollFunded: bigint; 
  readonly totalProfitUnits: bigint
};

export type SystemStat_indexedFieldOperations = {};

export type UnitConversion_t = {
  readonly blockNumber: bigint; 
  readonly contributor_id: id; 
  readonly convertedAt: bigint; 
  readonly executor: string; 
  readonly fromAmount: bigint; 
  readonly fromType: Enums_UnitType_t; 
  readonly id: id; 
  readonly toAmount: bigint; 
  readonly toType: Enums_UnitType_t; 
  readonly transactionHash: string
};

export type UnitConversion_indexedFieldOperations = { readonly contributor_id: whereOperations<UnitConversion_t,id> };

export type UnitDistribution_t = {
  readonly amount: bigint; 
  readonly blockNumber: bigint; 
  readonly contributor_id: id; 
  readonly distributedAt: bigint; 
  readonly executor: string; 
  readonly id: id; 
  readonly recipientCount: bigint; 
  readonly totalDistributed: bigint; 
  readonly transactionHash: string; 
  readonly unitType: Enums_UnitType_t
};

export type UnitDistribution_indexedFieldOperations = { readonly contributor_id: whereOperations<UnitDistribution_t,id> };
