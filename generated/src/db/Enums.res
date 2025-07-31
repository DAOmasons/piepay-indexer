module ContractType = {
  @genType
  type t = 
    | @as("PiePay") PiePay

  let name = "CONTRACT_TYPE"
  let variants = [
    PiePay,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module EntityType = {
  @genType
  type t = 
    | @as("Contribution") Contribution
    | @as("Contributor") Contributor
    | @as("PayrollFunding") PayrollFunding
    | @as("Project") Project
    | @as("SystemStat") SystemStat
    | @as("UnitConversion") UnitConversion
    | @as("UnitDistribution") UnitDistribution
    | @as("dynamic_contract_registry") DynamicContractRegistry

  let name = "ENTITY_TYPE"
  let variants = [
    Contribution,
    Contributor,
    PayrollFunding,
    Project,
    SystemStat,
    UnitConversion,
    UnitDistribution,
    DynamicContractRegistry,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module ContributionStatus = {
  @genType
  type t = 
    | @as("None") None
    | @as("Pending") Pending
    | @as("Approved") Approved
    | @as("Rejected") Rejected

  let name = "ContributionStatus"
  let variants = [
    None,
    Pending,
    Approved,
    Rejected,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module UnitType = {
  @genType
  type t = 
    | @as("Profit") Profit
    | @as("Debt") Debt
    | @as("Capital") Capital

  let name = "UnitType"
  let variants = [
    Profit,
    Debt,
    Capital,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

let allEnums = ([
  ContractType.config->Internal.fromGenericEnumConfig,
  EntityType.config->Internal.fromGenericEnumConfig,
  ContributionStatus.config->Internal.fromGenericEnumConfig,
  UnitType.config->Internal.fromGenericEnumConfig,
])
