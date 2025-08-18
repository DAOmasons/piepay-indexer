/*
 * Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features
 */
import {
  PiePay,
  PiePayFactory,
  Project,
  ProjectSettings,
  Contributor,
  Contribution,
  ContributionEvent,
  ContributorEvent,
  ProjectEvent,
  PiePayFactory_ProjectCreated,
  PiePayFactory_ProjectMetadataUpdated,
} from "generated";

// Utility functions
function createProjectId(contractAddress: string): string {
  return contractAddress.toLowerCase();
}

function createContributorId(projectAddress: string, contributorAddress: string): string {
  return `${projectAddress.toLowerCase()}_${contributorAddress.toLowerCase()}`;
}

function createContributionId(projectAddress: string, contributionId: bigint): string {
  return `${projectAddress.toLowerCase()}_${contributionId.toString()}`;
}

function createEventId(event: any): string {
  return `${event.chainId}_${event.block.number}_${event.logIndex}`;
}

function createTransactionHash(event: any): string {
  return event.transaction?.hash || `${event.chainId}_${event.block.number}_${event.logIndex}`;
}

PiePay.ContributionApproved.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  const contributionId = createContributionId(event.srcAddress, event.params.contributionId);
  const contributorId = createContributorId(event.srcAddress, event.params.contributor);

  // Get existing entities
  const project = await context.Project.get(projectId);
  const contribution = await context.Contribution.get(contributionId);
  const contributor = await context.Contributor.get(contributorId);

  if (!project || !contribution || !contributor) {
    context.log.error(`Missing entities for ContributionApproved: project=${!!project}, contribution=${!!contribution}, contributor=${!!contributor}`);
    return;
  }

  // Update contribution status
  const updatedContribution: Contribution = {
    ...contribution,
    status: "approved",
    unitsAwarded: event.params.unitsAwarded,
    processedAt: BigInt(event.block.timestamp),
    lastUpdated: BigInt(event.block.timestamp),
  };

  // Update contributor totals based on unit type
  let updatedContributor = { ...contributor };
  const unitType = Number(event.params.unitType);
  
  if (unitType === 0) { // P Units
    updatedContributor.totalPUnits += event.params.unitsAwarded;
  } else if (unitType === 1) { // D Units
    updatedContributor.totalDUnits += event.params.unitsAwarded;
  } else if (unitType === 2) { // C Units
    updatedContributor.totalCUnits += event.params.unitsAwarded;
  }
  updatedContributor.lastUpdated = BigInt(event.block.timestamp);

  // Update project totals
  let updatedProject = { ...project };
  if (unitType === 0) {
    updatedProject.totalPUnits += event.params.unitsAwarded;
  } else if (unitType === 1) {
    updatedProject.totalDUnits += event.params.unitsAwarded;
  } else if (unitType === 2) {
    updatedProject.totalCUnits += event.params.unitsAwarded;
  }
  updatedProject.lastUpdated = BigInt(event.block.timestamp);

  // Create event record
  const contributionEvent: ContributionEvent = {
    id: createEventId(event),
    project_id: projectId,
    contribution_id: contributionId,
    contributionId: event.params.contributionId,
    eventType: "approved",
    contributor: event.params.contributor,
    executor: event.params.executor,
    unitType: event.params.unitType,
    unitsAwarded: event.params.unitsAwarded,
    unitsRequested: undefined,
    description: undefined,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };

  // Save all updates
  context.Project.set(updatedProject);
  context.Contributor.set(updatedContributor);
  context.Contribution.set(updatedContribution);
  context.ContributionEvent.set(contributionEvent);
});

PiePay.ContributionRejected.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  const contributionId = createContributionId(event.srcAddress, event.params.contributionId);

  // Get existing entities
  const project = await context.Project.get(projectId);
  const contribution = await context.Contribution.get(contributionId);

  if (!project || !contribution) {
    context.log.error(`Missing entities for ContributionRejected: project=${!!project}, contribution=${!!contribution}`);
    return;
  }

  // Update contribution status
  const updatedContribution: Contribution = {
    ...contribution,
    status: "rejected",
    unitsAwarded: 0n,
    processedAt: BigInt(event.block.timestamp),
    lastUpdated: BigInt(event.block.timestamp),
  };

  // Create event record
  const contributionEvent: ContributionEvent = {
    id: createEventId(event),
    project_id: projectId,
    contribution_id: contributionId,
    contributionId: event.params.contributionId,
    eventType: "rejected",
    contributor: event.params.contributor,
    executor: event.params.executor,
    unitType: undefined,
    unitsAwarded: undefined,
    unitsRequested: undefined,
    description: undefined,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };

  // Save updates
  context.Contribution.set(updatedContribution);
  context.ContributionEvent.set(contributionEvent);
});

PiePay.ContributionSubmitted.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  const contributionId = createContributionId(event.srcAddress, event.params.contributionId);
  const contributorId = createContributorId(event.srcAddress, event.params.executor);

  // Get existing entities
  const project = await context.Project.get(projectId);
  const contributor = await context.Contributor.get(contributorId);

  if (!project) {
    context.log.error(`Project not found for ContributionSubmitted: ${projectId}`);
    return;
  }

  if (!contributor) {
    context.log.error(`Contributor not found for ContributionSubmitted: ${contributorId}`);
    return;
  }

  // Create new contribution
  const contribution: Contribution = {
    id: contributionId,
    project_id: projectId,
    contributor_id: contributorId,
    contributionId: event.params.contributionId,
    unitType: event.params.unitType,
    unitsRequested: event.params.unitsRequested,
    unitsAwarded: 0n,
    description: event.params.description,
    status: "pending",
    submittedAt: BigInt(event.block.timestamp),
    processedAt: undefined,
    lastUpdated: BigInt(event.block.timestamp),
  };

  // Create event record
  const contributionEvent: ContributionEvent = {
    id: createEventId(event),
    project_id: projectId,
    contribution_id: contributionId,
    contributionId: event.params.contributionId,
    eventType: "submitted",
    contributor: event.params.executor,
    executor: event.params.executor,
    unitType: event.params.unitType,
    unitsRequested: event.params.unitsRequested,
    unitsAwarded: undefined,
    description: event.params.description,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };

  // Save new entities
  context.Contribution.set(contribution);
  context.ContributionEvent.set(contributionEvent);
});

PiePay.ContributorRemoved.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  const contributorId = createContributorId(event.srcAddress, event.params.contributor);

  // Get existing contributor
  const contributor = await context.Contributor.get(contributorId);

  if (!contributor) {
    context.log.error(`Contributor not found for ContributorRemoved: ${contributorId}`);
    return;
  }

  // Update contributor status
  const updatedContributor: Contributor = {
    ...contributor,
    isWhitelisted: false,
    removedAt: BigInt(event.block.timestamp),
    lastUpdated: BigInt(event.block.timestamp),
  };

  // Create event record
  const contributorEvent: ContributorEvent = {
    id: createEventId(event),
    project_id: projectId,
    contributor_id: contributorId,
    contributorAddress: event.params.contributor,
    eventType: "removed",
    executor: event.params.executor,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };

  // Save updates
  context.Contributor.set(updatedContributor);
  context.ContributorEvent.set(contributorEvent);
});

PiePay.ContributorWhitelisted.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  const contributorId = createContributorId(event.srcAddress, event.params.contributor);

  // Get or create contributor
  let contributor = await context.Contributor.get(contributorId);

  if (!contributor) {
    // Create new contributor
    contributor = {
      id: contributorId,
      project_id: projectId,
      address: event.params.contributor,
      isWhitelisted: true,
      whitelistedAt: BigInt(event.block.timestamp),
      removedAt: undefined,
      totalPUnits: 0n,
      totalDUnits: 0n,
      totalCUnits: 0n,
      lastUpdated: BigInt(event.block.timestamp),
    };
  } else {
    // Update existing contributor
    contributor = {
      ...contributor,
      isWhitelisted: true,
      whitelistedAt: BigInt(event.block.timestamp),
      removedAt: undefined,
      lastUpdated: BigInt(event.block.timestamp),
    };
  }

  // Create event record
  const contributorEvent: ContributorEvent = {
    id: createEventId(event),
    project_id: projectId,
    contributor_id: contributorId,
    contributorAddress: event.params.contributor,
    eventType: "whitelisted",
    executor: event.params.executor,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };

  // Save updates
  context.Contributor.set(contributor);
  context.ContributorEvent.set(contributorEvent);
});

PiePay.ConversionMultipliersUpdated.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get current project and settings
  const project = await context.Project.get(projectId);
  if (!project) {
    context.log.error(`Project not found for ConversionMultipliersUpdated: ${projectId}`);
    return;
  }
  
  const currentSettings = await context.ProjectSettings.get(project.currentSettings_id);
  if (!currentSettings) {
    context.log.error(`Current settings not found: ${project.currentSettings_id}`);
    return;
  }
  
  // Create new settings version
  const newSettingsId = `${projectId}_${Date.now()}`;
  const newSettings: ProjectSettings = {
    ...currentSettings,
    id: newSettingsId,
    pToDMultiplier: event.params.pToDMultiplier,
    pToCMultiplier: event.params.pToCMultiplier,
    dToCMultiplier: event.params.dToCMultiplier,
    effectiveFrom: BigInt(event.block.timestamp),
    createdAt: BigInt(event.block.timestamp),
    updatedBy: event.params.executor,
  };
  
  // Update project to reference new settings
  const updatedProject: Project = {
    ...project,
    currentSettings_id: newSettingsId,
    lastUpdated: BigInt(event.block.timestamp),
  };
  
  // Create project event record
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "multipliers_updated",
    executor: event.params.executor,
    eventData: JSON.stringify({
      pToDMultiplier: event.params.pToDMultiplier.toString(),
      pToCMultiplier: event.params.pToCMultiplier.toString(),
      dToCMultiplier: event.params.dToCMultiplier.toString(),
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  // Save updates
  context.Project.set(updatedProject);
  context.ProjectSettings.set(newSettings);
  context.ProjectEvent.set(projectEvent);
});

PiePay.PayrollFunded.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get current project
  const project = await context.Project.get(projectId);
  if (!project) {
    context.log.error(`Project not found for PayrollFunded: ${projectId}`);
    return;
  }
  
  // Update project funding total
  const updatedProject: Project = {
    ...project,
    totalFunding: project.totalFunding + event.params.amount,
    lastUpdated: BigInt(event.block.timestamp),
  };
  
  // Create project event record
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "funded",
    executor: event.params.executor,
    eventData: JSON.stringify({
      amount: event.params.amount.toString(),
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  // Save updates
  context.Project.set(updatedProject);
  context.ProjectEvent.set(projectEvent);
});

PiePay.PayrollManagerUpdated.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get current project
  const project = await context.Project.get(projectId);
  if (!project) {
    context.log.error(`Project not found for PayrollManagerUpdated: ${projectId}`);
    return;
  }
  
  // Update project payroll manager
  const updatedProject: Project = {
    ...project,
    payrollManager: event.params.newManager,
    lastUpdated: BigInt(event.block.timestamp),
  };
  
  // Create project event record
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "manager_updated",
    executor: event.params.executor,
    eventData: JSON.stringify({
      newManager: event.params.newManager,
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  // Save updates
  context.Project.set(updatedProject);
  context.ProjectEvent.set(projectEvent);
});

PiePay.ProjectInitialized.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get existing project (should have been created by factory)
  let project = await context.Project.get(projectId);
  
  if (!project) {
    context.log.warn(`Project not found for ProjectInitialized, creating new: ${projectId}`);
    
    // Create project if it doesn't exist (fallback for direct deployments)
    const initialSettings: ProjectSettings = {
      id: `${projectId}_0`,
      project_id: projectId,
      pToDMultiplier: 100n,
      pToCMultiplier: 100n, 
      dToCMultiplier: 100n,
      pUnitCapacity: 1000000n,
      dUnitCapacity: 1000000n,
      cUnitCapacity: 1000000n,
      effectiveFrom: BigInt(event.block.timestamp),
      createdAt: BigInt(event.block.timestamp),
      updatedBy: event.params.executor,
    };
    
    project = {
      id: projectId,
      projectId: 0n, // Unknown project ID for direct deployments
      address: event.srcAddress,
      name: event.params.name,
      description: event.params.description,
      projectLead: event.params.executor, // Default to executor
      payrollManager: event.params.executor, // Default to executor
      paymentToken: "", // Unknown for direct deployments
      creator: event.params.executor,
      createdAt: BigInt(event.block.timestamp),
      lastUpdated: BigInt(event.block.timestamp),
      totalPUnits: 0n,
      totalDUnits: 0n,
      totalCUnits: 0n,
      totalFunding: 0n,
      currentSettings_id: initialSettings.id,
    };
    
    context.ProjectSettings.set(initialSettings);
  } else {
    // Update existing project with initialization data
    project = {
      ...project,
      name: event.params.name,
      description: event.params.description,
      lastUpdated: BigInt(event.block.timestamp),
    };
  }
  
  // Create project event record
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "initialized",
    executor: event.params.executor,
    eventData: JSON.stringify({
      name: event.params.name,
      description: event.params.description,
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  // Save updates
  context.Project.set(project);
  context.ProjectEvent.set(projectEvent);
});

PiePay.ProjectLeadUpdated.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get current project
  const project = await context.Project.get(projectId);
  if (!project) {
    context.log.error(`Project not found for ProjectLeadUpdated: ${projectId}`);
    return;
  }
  
  // Update project lead
  const updatedProject: Project = {
    ...project,
    projectLead: event.params.newLead,
    lastUpdated: BigInt(event.block.timestamp),
  };
  
  // Create project event record
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "lead_updated",
    executor: event.params.executor,
    eventData: JSON.stringify({
      newLead: event.params.newLead,
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  // Save updates
  context.Project.set(updatedProject);
  context.ProjectEvent.set(projectEvent);
});

// Note: TotalUnitsUpdated events are now computed from contribution approvals
// This handler serves as a verification/sync mechanism
PiePay.TotalUnitsUpdated.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get current project
  const project = await context.Project.get(projectId);
  if (!project) {
    context.log.error(`Project not found for TotalUnitsUpdated: ${projectId}`);
    return;
  }
  
  // Verify our computed totals match the contract
  const unitType = Number(event.params.unitType);
  let currentTotal = 0n;
  
  if (unitType === 0) currentTotal = project.totalPUnits;
  else if (unitType === 1) currentTotal = project.totalDUnits;
  else if (unitType === 2) currentTotal = project.totalCUnits;
  
  if (currentTotal !== event.params.newTotal) {
    context.log.warn(`Total units mismatch for project ${projectId}, type ${unitType}: computed=${currentTotal}, contract=${event.params.newTotal}`);
    
    // Sync with contract value
    let updatedProject = { ...project };
    if (unitType === 0) updatedProject.totalPUnits = event.params.newTotal;
    else if (unitType === 1) updatedProject.totalDUnits = event.params.newTotal;
    else if (unitType === 2) updatedProject.totalCUnits = event.params.newTotal;
    
    updatedProject.lastUpdated = BigInt(event.block.timestamp);
    context.Project.set(updatedProject);
  }
  
  // Create project event record for audit
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "units_updated",
    executor: "system", // This is typically a system event
    eventData: JSON.stringify({
      unitType: unitType.toString(),
      newTotal: event.params.newTotal.toString(),
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  context.ProjectEvent.set(projectEvent);
});

PiePay.UnitCapacityUpdated.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Get current project and settings
  const project = await context.Project.get(projectId);
  if (!project) {
    context.log.error(`Project not found for UnitCapacityUpdated: ${projectId}`);
    return;
  }
  
  const currentSettings = await context.ProjectSettings.get(project.currentSettings_id);
  if (!currentSettings) {
    context.log.error(`Current settings not found: ${project.currentSettings_id}`);
    return;
  }
  
  // Create new settings version with updated capacity
  const newSettingsId = `${projectId}_${Date.now()}`;
  let newSettings = { ...currentSettings };
  
  const unitType = Number(event.params.unitType);
  if (unitType === 0) newSettings.pUnitCapacity = event.params.newCapacity;
  else if (unitType === 1) newSettings.dUnitCapacity = event.params.newCapacity;
  else if (unitType === 2) newSettings.cUnitCapacity = event.params.newCapacity;
  
  newSettings.id = newSettingsId;
  newSettings.effectiveFrom = BigInt(event.block.timestamp);
  newSettings.createdAt = BigInt(event.block.timestamp);
  newSettings.updatedBy = event.params.executor;
  
  // Update project to reference new settings
  const updatedProject: Project = {
    ...project,
    currentSettings_id: newSettingsId,
    lastUpdated: BigInt(event.block.timestamp),
  };
  
  // Create project event record
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "capacity_updated",
    executor: event.params.executor,
    eventData: JSON.stringify({
      unitType: unitType.toString(),
      newCapacity: event.params.newCapacity.toString(),
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  // Save updates
  context.Project.set(updatedProject);
  context.ProjectSettings.set(newSettings);
  context.ProjectEvent.set(projectEvent);
});

PiePay.UnitsConverted.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Create project event record for conversion
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "units_converted",
    executor: event.params.executor,
    eventData: JSON.stringify({
      fromType: event.params.fromType.toString(),
      toType: event.params.toType.toString(),
      fromAmount: event.params.fromAmount.toString(),
      toAmount: event.params.toAmount.toString(),
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  context.ProjectEvent.set(projectEvent);
});

PiePay.UnitsDistributed.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.srcAddress);
  
  // Create project event record for distribution
  const projectEvent: ProjectEvent = {
    id: createEventId(event),
    project_id: projectId,
    eventType: "units_distributed",
    executor: event.params.executor,
    eventData: JSON.stringify({
      unitType: event.params.unitType.toString(),
      totalDistributed: event.params.totalDistributed.toString(),
      recipientCount: event.params.recipientCount.toString(),
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };
  
  context.ProjectEvent.set(projectEvent);
});

// ============ FACTORY EVENT HANDLERS ============

PiePayFactory.ProjectCreated.handler(async ({ event, context }) => {
  const projectId = createProjectId(event.params.projectAddress);

  // Create initial project settings
  const initialSettings: ProjectSettings = {
    id: `${projectId}_0`, // First settings version
    project_id: projectId,
    pToDMultiplier: 100n, // Default values - these should come from contract or be configurable
    pToCMultiplier: 100n,
    dToCMultiplier: 100n,
    pUnitCapacity: 1000000n,
    dUnitCapacity: 1000000n,
    cUnitCapacity: 1000000n,
    effectiveFrom: BigInt(event.block.timestamp),
    createdAt: BigInt(event.block.timestamp),
    updatedBy: event.params.creator,
  };

  // Create project entity
  const project: Project = {
    id: projectId,
    projectId: event.params.projectId,
    address: event.params.projectAddress,
    name: event.params.projectName,
    description: event.params.projectDescription,
    projectLead: event.params.projectLead,
    payrollManager: event.params.payrollManager,
    paymentToken: event.params.paymentToken,
    creator: event.params.creator,
    createdAt: BigInt(event.block.timestamp),
    lastUpdated: BigInt(event.block.timestamp),
    totalPUnits: 0n,
    totalDUnits: 0n,
    totalCUnits: 0n,
    totalFunding: 0n,
    currentSettings_id: initialSettings.id,
  };

  // Create factory event record
  const factoryEvent: PiePayFactory_ProjectCreated = {
    id: createEventId(event),
    projectId: event.params.projectId,
    projectAddress: event.params.projectAddress,
    projectName: event.params.projectName,
    projectDescription: event.params.projectDescription,
    projectLead: event.params.projectLead,
    payrollManager: event.params.payrollManager,
    paymentToken: event.params.paymentToken,
    creator: event.params.creator,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
  };

  // Create project event record
  const projectEvent: ProjectEvent = {
    id: `${createEventId(event)}_project`,
    project_id: projectId,
    eventType: "created",
    executor: event.params.creator,
    eventData: JSON.stringify({
      projectName: event.params.projectName,
      projectDescription: event.params.projectDescription,
      projectLead: event.params.projectLead,
      payrollManager: event.params.payrollManager,
      paymentToken: event.params.paymentToken,
    }),
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
    transactionHash: createTransactionHash(event),
  };

  // Save all entities
  context.Project.set(project);
  context.ProjectSettings.set(initialSettings);
  context.PiePayFactory_ProjectCreated.set(factoryEvent);
  context.ProjectEvent.set(projectEvent);
});

PiePayFactory.ProjectMetadataUpdated.handler(async ({ event, context }) => {
  const entity: PiePayFactory_ProjectMetadataUpdated = {
    id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
    projectId: event.params.projectId,
    projectAddress: event.params.projectAddress,
    updatedBy: event.params.updatedBy,
    blockNumber: BigInt(event.block.number),
    blockTimestamp: BigInt(event.block.timestamp),
  };

  context.PiePayFactory_ProjectMetadataUpdated.set(entity);
});
