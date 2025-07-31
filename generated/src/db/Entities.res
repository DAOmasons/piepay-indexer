open Table
open Enums.EntityType
type id = string

type internalEntity = Internal.entity
module type Entity = {
  type t
  let name: Enums.EntityType.t
  let schema: S.t<t>
  let rowsSchema: S.t<array<t>>
  let table: Table.table
  let entityHistory: EntityHistory.t<t>
}
external entityModToInternal: module(Entity with type t = 'a) => Internal.entityConfig = "%identity"
external entityModsToInternal: array<module(Entity)> => array<Internal.entityConfig> = "%identity"
external entitiesToInternal: array<'a> => array<Internal.entity> = "%identity"

@get
external getEntityId: internalEntity => string = "id"

exception UnexpectedIdNotDefinedOnEntity
let getEntityIdUnsafe = (entity: 'entity): id =>
  switch Utils.magic(entity)["id"] {
  | Some(id) => id
  | None =>
    UnexpectedIdNotDefinedOnEntity->ErrorHandling.mkLogAndRaise(
      ~msg="Property 'id' does not exist on expected entity object",
    )
  }

//shorthand for punning
let isPrimaryKey = true
let isNullable = true
let isArray = true
let isIndex = true

@genType
type whereOperations<'entity, 'fieldType> = {
  eq: 'fieldType => promise<array<'entity>>,
  gt: 'fieldType => promise<array<'entity>>
}

module Contribution = {
  let name = Contribution
  @genType
  type t = {
    approvedAt: option<bigint>,
    blockNumber: bigint,
    contributionId: bigint,
    contributor_id: id,
    description: string,
    executor: string,
    id: id,
    rejectedAt: option<bigint>,
    status: Enums.ContributionStatus.t,
    submittedAt: bigint,
    transactionHash: string,
    unitType: Enums.UnitType.t,
    unitsAwarded: option<bigint>,
    unitsRequested: bigint,
  }

  let schema = S.object((s): t => {
    approvedAt: s.field("approvedAt", S.null(BigInt.schema)),
    blockNumber: s.field("blockNumber", BigInt.schema),
    contributionId: s.field("contributionId", BigInt.schema),
    contributor_id: s.field("contributor_id", S.string),
    description: s.field("description", S.string),
    executor: s.field("executor", S.string),
    id: s.field("id", S.string),
    rejectedAt: s.field("rejectedAt", S.null(BigInt.schema)),
    status: s.field("status", Enums.ContributionStatus.config.schema),
    submittedAt: s.field("submittedAt", BigInt.schema),
    transactionHash: s.field("transactionHash", S.string),
    unitType: s.field("unitType", Enums.UnitType.config.schema),
    unitsAwarded: s.field("unitsAwarded", S.null(BigInt.schema)),
    unitsRequested: s.field("unitsRequested", BigInt.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("contributor_id") contributor_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "approvedAt", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "blockNumber", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "contributionId", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "contributor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Contributor",
      ),
      mkField(
      "description", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "executor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "rejectedAt", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "status", 
      Custom(Enums.ContributionStatus.config.name),
      ~fieldSchema=Enums.ContributionStatus.config.schema,
      
      
      
      
      
      ),
      mkField(
      "submittedAt", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "transactionHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "unitType", 
      Custom(Enums.UnitType.config.name),
      ~fieldSchema=Enums.UnitType.config.schema,
      
      
      
      
      
      ),
      mkField(
      "unitsAwarded", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "unitsRequested", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module Contributor = {
  let name = Contributor
  @genType
  type t = {
    address: string,
    capitalUnits: bigint,
    
    
    debtUnits: bigint,
    id: id,
    isWhitelisted: bool,
    profitUnits: bigint,
    removedAt: option<bigint>,
    totalContributions: int,
    totalUnitsEarned: bigint,
    
    whitelistedAt: option<bigint>,
  }

  let schema = S.object((s): t => {
    address: s.field("address", S.string),
    capitalUnits: s.field("capitalUnits", BigInt.schema),
    
    
    debtUnits: s.field("debtUnits", BigInt.schema),
    id: s.field("id", S.string),
    isWhitelisted: s.field("isWhitelisted", S.bool),
    profitUnits: s.field("profitUnits", BigInt.schema),
    removedAt: s.field("removedAt", S.null(BigInt.schema)),
    totalContributions: s.field("totalContributions", S.int),
    totalUnitsEarned: s.field("totalUnitsEarned", BigInt.schema),
    
    whitelistedAt: s.field("whitelistedAt", S.null(BigInt.schema)),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "address", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "capitalUnits", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "debtUnits", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "isWhitelisted", 
      Boolean,
      ~fieldSchema=S.bool,
      
      
      
      
      
      ),
      mkField(
      "profitUnits", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "removedAt", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField(
      "totalContributions", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalUnitsEarned", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "whitelistedAt", 
      Numeric,
      ~fieldSchema=S.null(BigInt.schema),
      
      ~isNullable,
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
      mkDerivedFromField(
      "contributions", 
      ~derivedFromEntity="Contribution",
      ~derivedFromField="contributor",
      ),
      mkDerivedFromField(
      "conversions", 
      ~derivedFromEntity="UnitConversion",
      ~derivedFromField="contributor",
      ),
      mkDerivedFromField(
      "unitDistributions", 
      ~derivedFromEntity="UnitDistribution",
      ~derivedFromField="contributor",
      ),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module PayrollFunding = {
  let name = PayrollFunding
  @genType
  type t = {
    amount: bigint,
    blockNumber: bigint,
    cumulativeAmount: bigint,
    executor: string,
    fundedAt: bigint,
    id: id,
    transactionHash: string,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", BigInt.schema),
    blockNumber: s.field("blockNumber", BigInt.schema),
    cumulativeAmount: s.field("cumulativeAmount", BigInt.schema),
    executor: s.field("executor", S.string),
    fundedAt: s.field("fundedAt", BigInt.schema),
    id: s.field("id", S.string),
    transactionHash: s.field("transactionHash", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "blockNumber", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "cumulativeAmount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "executor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "fundedAt", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "transactionHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module Project = {
  let name = Project
  @genType
  type t = {
    blockNumber: bigint,
    contractAddress: string,
    createdAt: bigint,
    description: string,
    id: id,
    name: string,
    payrollManager: string,
    projectLead: string,
    totalPayrollFunded: bigint,
    transactionHash: string,
  }

  let schema = S.object((s): t => {
    blockNumber: s.field("blockNumber", BigInt.schema),
    contractAddress: s.field("contractAddress", S.string),
    createdAt: s.field("createdAt", BigInt.schema),
    description: s.field("description", S.string),
    id: s.field("id", S.string),
    name: s.field("name", S.string),
    payrollManager: s.field("payrollManager", S.string),
    projectLead: s.field("projectLead", S.string),
    totalPayrollFunded: s.field("totalPayrollFunded", BigInt.schema),
    transactionHash: s.field("transactionHash", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "blockNumber", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "contractAddress", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "createdAt", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "description", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "name", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "payrollManager", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "projectLead", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "totalPayrollFunded", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "transactionHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module SystemStat = {
  let name = SystemStat
  @genType
  type t = {
    dToCMultiplier: int,
    id: id,
    lastUpdated: bigint,
    pToCMultiplier: int,
    pToDMultiplier: int,
    totalCapitalUnits: bigint,
    totalContributions: int,
    totalContributors: int,
    totalDebtUnits: bigint,
    totalPayrollFunded: bigint,
    totalProfitUnits: bigint,
  }

  let schema = S.object((s): t => {
    dToCMultiplier: s.field("dToCMultiplier", S.int),
    id: s.field("id", S.string),
    lastUpdated: s.field("lastUpdated", BigInt.schema),
    pToCMultiplier: s.field("pToCMultiplier", S.int),
    pToDMultiplier: s.field("pToDMultiplier", S.int),
    totalCapitalUnits: s.field("totalCapitalUnits", BigInt.schema),
    totalContributions: s.field("totalContributions", S.int),
    totalContributors: s.field("totalContributors", S.int),
    totalDebtUnits: s.field("totalDebtUnits", BigInt.schema),
    totalPayrollFunded: s.field("totalPayrollFunded", BigInt.schema),
    totalProfitUnits: s.field("totalProfitUnits", BigInt.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "dToCMultiplier", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "lastUpdated", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "pToCMultiplier", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "pToDMultiplier", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalCapitalUnits", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "totalContributions", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalContributors", 
      Integer,
      ~fieldSchema=S.int,
      
      
      
      
      
      ),
      mkField(
      "totalDebtUnits", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "totalPayrollFunded", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "totalProfitUnits", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module UnitConversion = {
  let name = UnitConversion
  @genType
  type t = {
    blockNumber: bigint,
    contributor_id: id,
    convertedAt: bigint,
    executor: string,
    fromAmount: bigint,
    fromType: Enums.UnitType.t,
    id: id,
    toAmount: bigint,
    toType: Enums.UnitType.t,
    transactionHash: string,
  }

  let schema = S.object((s): t => {
    blockNumber: s.field("blockNumber", BigInt.schema),
    contributor_id: s.field("contributor_id", S.string),
    convertedAt: s.field("convertedAt", BigInt.schema),
    executor: s.field("executor", S.string),
    fromAmount: s.field("fromAmount", BigInt.schema),
    fromType: s.field("fromType", Enums.UnitType.config.schema),
    id: s.field("id", S.string),
    toAmount: s.field("toAmount", BigInt.schema),
    toType: s.field("toType", Enums.UnitType.config.schema),
    transactionHash: s.field("transactionHash", S.string),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("contributor_id") contributor_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "blockNumber", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "contributor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Contributor",
      ),
      mkField(
      "convertedAt", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "executor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "fromAmount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "fromType", 
      Custom(Enums.UnitType.config.name),
      ~fieldSchema=Enums.UnitType.config.schema,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "toAmount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "toType", 
      Custom(Enums.UnitType.config.name),
      ~fieldSchema=Enums.UnitType.config.schema,
      
      
      
      
      
      ),
      mkField(
      "transactionHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

module UnitDistribution = {
  let name = UnitDistribution
  @genType
  type t = {
    amount: bigint,
    blockNumber: bigint,
    contributor_id: id,
    distributedAt: bigint,
    executor: string,
    id: id,
    recipientCount: bigint,
    totalDistributed: bigint,
    transactionHash: string,
    unitType: Enums.UnitType.t,
  }

  let schema = S.object((s): t => {
    amount: s.field("amount", BigInt.schema),
    blockNumber: s.field("blockNumber", BigInt.schema),
    contributor_id: s.field("contributor_id", S.string),
    distributedAt: s.field("distributedAt", BigInt.schema),
    executor: s.field("executor", S.string),
    id: s.field("id", S.string),
    recipientCount: s.field("recipientCount", BigInt.schema),
    totalDistributed: s.field("totalDistributed", BigInt.schema),
    transactionHash: s.field("transactionHash", S.string),
    unitType: s.field("unitType", Enums.UnitType.config.schema),
  })

  let rowsSchema = S.array(schema)

  @genType
  type indexedFieldOperations = {
    
      @as("contributor_id") contributor_id: whereOperations<t, id>,
    
  }

  let table = mkTable(
    (name :> string),
    ~fields=[
      mkField(
      "amount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "blockNumber", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "contributor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      ~linkedEntity="Contributor",
      ),
      mkField(
      "distributedAt", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "executor", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "id", 
      Text,
      ~fieldSchema=S.string,
      ~isPrimaryKey,
      
      
      
      
      ),
      mkField(
      "recipientCount", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "totalDistributed", 
      Numeric,
      ~fieldSchema=BigInt.schema,
      
      
      
      
      
      ),
      mkField(
      "transactionHash", 
      Text,
      ~fieldSchema=S.string,
      
      
      
      
      
      ),
      mkField(
      "unitType", 
      Custom(Enums.UnitType.config.name),
      ~fieldSchema=Enums.UnitType.config.schema,
      
      
      
      
      
      ),
      mkField("db_write_timestamp", TimestampWithoutTimezone, ~fieldSchema=Utils.Schema.dbDate, ~default="CURRENT_TIMESTAMP"),
    ],
  )

  let entityHistory = table->EntityHistory.fromTable(~pgSchema=Env.Db.publicSchema, ~schema)

  external castToInternal: t => Internal.entity = "%identity"
}

let userEntities = [
  module(Contribution),
  module(Contributor),
  module(PayrollFunding),
  module(Project),
  module(SystemStat),
  module(UnitConversion),
  module(UnitDistribution),
]->entityModsToInternal

let allEntities =
  userEntities->Js.Array2.concat(
    [module(TablesStatic.DynamicContractRegistry)]->entityModsToInternal,
  )

let byName =
  allEntities
  ->Js.Array2.map(entityConfig => {
    (entityConfig.name, entityConfig)
  })
  ->Js.Dict.fromArray
