import { PiePay } from 'generated';

PiePay.ProjectInitialized.handler(async ({ event, context }) => {
  context.Project.set({
    id: event.srcAddress,
    name: event.params.name,
    description: event.params.description,
    projectLead: event.params.executor,
    payrollManager: event.params.executor,
    contractAddress: event.srcAddress,
    totalPayrollFunded: 0n,
    createdAt: BigInt(event.blockTimestamp),
    blockNumber: BigInt(event.blockNumber),
    transactionHash: event.transactionHash,
  });
});

PiePay.ContributorWhitelisted.handler(async ({ event, context }) => {
  context.Contributor.set({
    id: event.params.contributor,
    address: event.params.contributor,
    isWhitelisted: true,
    profitUnits: 0n,
    debtUnits: 0n,
    capitalUnits: 0n,
    totalContributions: 0,
    totalUnitsEarned: 0n,
    whitelistedAt: BigInt(event.blockTimestamp),
    removedAt: undefined,
  });
});

PiePay.PayrollFunded.handler(async ({ event, context }) => {
  context.PayrollFunding.set({
    id: `${event.transactionHash}-${event.logIndex}`,
    executor: event.params.executor,
    amount: event.params.amount,
    cumulativeAmount: event.params.amount, // For now, just use the amount
    fundedAt: BigInt(event.blockTimestamp),
    blockNumber: BigInt(event.blockNumber),
    transactionHash: event.transactionHash,
  });
});