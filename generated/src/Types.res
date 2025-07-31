//*************
//***ENTITIES**
//*************
@genType.as("Id")
type id = string

@genType
type contractRegistrations = {
  log: Envio.logger,
  // TODO: only add contracts we've registered for the event in the config
  addPiePay: (Address.t) => unit,
}

@genType
type entityLoaderContext<'entity, 'indexedFieldOperations> = {
  get: id => promise<option<'entity>>,
  getOrThrow: (id, ~message: string=?) => promise<'entity>,
  getWhere: 'indexedFieldOperations,
  getOrCreate: ('entity) => promise<'entity>,
  set: 'entity => unit,
  deleteUnsafe: id => unit,
}

@genType.import(("./Types.ts", "LoaderContext"))
type loaderContext = {
  log: Envio.logger,
  effect: 'input 'output. (Envio.effect<'input, 'output>, 'input) => promise<'output>,
  isPreload: bool,
  @as("Contribution") contribution: entityLoaderContext<Entities.Contribution.t, Entities.Contribution.indexedFieldOperations>,
  @as("Contributor") contributor: entityLoaderContext<Entities.Contributor.t, Entities.Contributor.indexedFieldOperations>,
  @as("PayrollFunding") payrollFunding: entityLoaderContext<Entities.PayrollFunding.t, Entities.PayrollFunding.indexedFieldOperations>,
  @as("Project") project: entityLoaderContext<Entities.Project.t, Entities.Project.indexedFieldOperations>,
  @as("SystemStat") systemStat: entityLoaderContext<Entities.SystemStat.t, Entities.SystemStat.indexedFieldOperations>,
  @as("UnitConversion") unitConversion: entityLoaderContext<Entities.UnitConversion.t, Entities.UnitConversion.indexedFieldOperations>,
  @as("UnitDistribution") unitDistribution: entityLoaderContext<Entities.UnitDistribution.t, Entities.UnitDistribution.indexedFieldOperations>,
}

@genType
type entityHandlerContext<'entity> = {
  get: id => promise<option<'entity>>,
  getOrThrow: (id, ~message: string=?) => promise<'entity>,
  getOrCreate: ('entity) => promise<'entity>,
  set: 'entity => unit,
  deleteUnsafe: id => unit,
}

@genType.import(("./Types.ts", "HandlerContext"))
type handlerContext = {
  log: Envio.logger,
  effect: 'input 'output. (Envio.effect<'input, 'output>, 'input) => promise<'output>,
  @as("Contribution") contribution: entityHandlerContext<Entities.Contribution.t>,
  @as("Contributor") contributor: entityHandlerContext<Entities.Contributor.t>,
  @as("PayrollFunding") payrollFunding: entityHandlerContext<Entities.PayrollFunding.t>,
  @as("Project") project: entityHandlerContext<Entities.Project.t>,
  @as("SystemStat") systemStat: entityHandlerContext<Entities.SystemStat.t>,
  @as("UnitConversion") unitConversion: entityHandlerContext<Entities.UnitConversion.t>,
  @as("UnitDistribution") unitDistribution: entityHandlerContext<Entities.UnitDistribution.t>,
}

//Re-exporting types for backwards compatability
@genType.as("Contribution")
type contribution = Entities.Contribution.t
@genType.as("Contributor")
type contributor = Entities.Contributor.t
@genType.as("PayrollFunding")
type payrollFunding = Entities.PayrollFunding.t
@genType.as("Project")
type project = Entities.Project.t
@genType.as("SystemStat")
type systemStat = Entities.SystemStat.t
@genType.as("UnitConversion")
type unitConversion = Entities.UnitConversion.t
@genType.as("UnitDistribution")
type unitDistribution = Entities.UnitDistribution.t

type eventIdentifier = {
  chainId: int,
  blockTimestamp: int,
  blockNumber: int,
  logIndex: int,
}

type entityUpdateAction<'entityType> =
  | Set('entityType)
  | Delete

type entityUpdate<'entityType> = {
  eventIdentifier: eventIdentifier,
  entityId: id,
  entityUpdateAction: entityUpdateAction<'entityType>,
}

let mkEntityUpdate = (~eventIdentifier, ~entityId, entityUpdateAction) => {
  entityId,
  eventIdentifier,
  entityUpdateAction,
}

type entityValueAtStartOfBatch<'entityType> =
  | NotSet // The entity isn't in the DB yet
  | AlreadySet('entityType)

type updatedValue<'entityType> = {
  latest: entityUpdate<'entityType>,
  history: array<entityUpdate<'entityType>>,
  // In the event of a rollback, some entity updates may have been
  // been affected by a rollback diff. If there was no rollback diff
  // this will always be false.
  // If there was a rollback diff, this will be false in the case of a
  // new entity update (where entity affected is not present in the diff) b
  // but true if the update is related to an entity that is
  // currently present in the diff
  containsRollbackDiffChange: bool,
}

@genType
type inMemoryStoreRowEntity<'entityType> =
  | Updated(updatedValue<'entityType>)
  | InitialReadFromDb(entityValueAtStartOfBatch<'entityType>) // This means there is no change from the db.

//*************
//**CONTRACTS**
//*************

module Transaction = {
  @genType
  type t = {from: option<Address.t>, to: option<Address.t>, hash: string, transactionIndex: int}

  let schema = S.object((s): t => {from: s.field("from", S.nullable(Address.schema)), to: s.field("to", S.nullable(Address.schema)), hash: s.field("hash", S.string), transactionIndex: s.field("transactionIndex", S.int)})
}

module Block = {
  @genType
  type t = {number: int, timestamp: int, hash: string}

  let schema = S.object((s): t => {number: s.field("number", S.int), timestamp: s.field("timestamp", S.int), hash: s.field("hash", S.string)})

  @get
  external getNumber: Internal.eventBlock => int = "number"

  @get
  external getTimestamp: Internal.eventBlock => int = "timestamp"
 
  @get
  external getId: Internal.eventBlock => string = "hash"

  let cleanUpRawEventFieldsInPlace: Js.Json.t => () = %raw(`fields => {
    delete fields.hash
    delete fields.number
    delete fields.timestamp
  }`)
}

module AggregatedBlock = {
  @genType
  type t = {hash: string, number: int, timestamp: int}
}
module AggregatedTransaction = {
  @genType
  type t = {from: option<Address.t>, hash: string, to: option<Address.t>, transactionIndex: int}
}

@genType.as("EventLog")
type eventLog<'params> = Internal.genericEvent<'params, Block.t, Transaction.t>

module SingleOrMultiple: {
  @genType.import(("./bindings/OpaqueTypes", "SingleOrMultiple"))
  type t<'a>
  let normalizeOrThrow: (t<'a>, ~nestedArrayDepth: int=?) => array<'a>
  let single: 'a => t<'a>
  let multiple: array<'a> => t<'a>
} = {
  type t<'a> = Js.Json.t

  external single: 'a => t<'a> = "%identity"
  external multiple: array<'a> => t<'a> = "%identity"
  external castMultiple: t<'a> => array<'a> = "%identity"
  external castSingle: t<'a> => 'a = "%identity"

  exception AmbiguousEmptyNestedArray

  let rec isMultiple = (t: t<'a>, ~nestedArrayDepth): bool =>
    switch t->Js.Json.decodeArray {
    | None => false
    | Some(_arr) if nestedArrayDepth == 0 => true
    | Some([]) if nestedArrayDepth > 0 =>
      AmbiguousEmptyNestedArray->ErrorHandling.mkLogAndRaise(
        ~msg="The given empty array could be interperated as a flat array (value) or nested array. Since it's ambiguous,
        please pass in a nested empty array if the intention is to provide an empty array as a value",
      )
    | Some(arr) => arr->Js.Array2.unsafe_get(0)->isMultiple(~nestedArrayDepth=nestedArrayDepth - 1)
    }

  let normalizeOrThrow = (t: t<'a>, ~nestedArrayDepth=0): array<'a> => {
    if t->isMultiple(~nestedArrayDepth) {
      t->castMultiple
    } else {
      [t->castSingle]
    }
  }
}

module HandlerTypes = {
  @genType
  type args<'eventArgs, 'context> = {
    event: eventLog<'eventArgs>,
    context: 'context,
  }

  @genType
  type contractRegisterArgs<'eventArgs> = Internal.genericContractRegisterArgs<eventLog<'eventArgs>, contractRegistrations>
  @genType
  type contractRegister<'eventArgs> = Internal.genericContractRegister<contractRegisterArgs<'eventArgs>>

  @genType
  type loaderArgs<'eventArgs> = Internal.genericLoaderArgs<eventLog<'eventArgs>, loaderContext>
  @genType
  type loader<'eventArgs, 'loaderReturn> = Internal.genericLoader<loaderArgs<'eventArgs>, 'loaderReturn>

  @genType
  type handlerArgs<'eventArgs, 'loaderReturn> = Internal.genericHandlerArgs<eventLog<'eventArgs>, handlerContext, 'loaderReturn>

  @genType
  type handler<'eventArgs, 'loaderReturn> = Internal.genericHandler<handlerArgs<'eventArgs, 'loaderReturn>>

  @genType
  type loaderHandler<'eventArgs, 'loaderReturn, 'eventFilters> = Internal.genericHandlerWithLoader<
    loader<'eventArgs, 'loaderReturn>,
    handler<'eventArgs, 'loaderReturn>,
    'eventFilters
  >

  @genType
  type eventConfig<'eventFilters> = {
    wildcard?: bool,
    eventFilters?: 'eventFilters,
    /**
      @deprecated The option is removed starting from v2.19 since we made the default mode even faster than pre-registration.
    */
    preRegisterDynamicContracts?: bool,
  }

  module EventOptions = {
    type t = {
      isWildcard: bool,
      eventFilters: option<Js.Json.t>,
      preRegisterDynamicContracts: bool,
    }

    let default = {
      isWildcard: false,
      eventFilters: None,
      preRegisterDynamicContracts: false,
    }

    let make = (
      ~isWildcard,
      ~eventFilters,
      ~preRegisterDynamicContracts,
    ) => {
      isWildcard,
      eventFilters: eventFilters->(Utils.magic: option<'a> => option<Js.Json.t>),
      preRegisterDynamicContracts,
    }
  }

  module Register: {
    type t
    let make: (~contractName: string, ~eventName: string) => t
    let setLoaderHandler: (
      t,
      Internal.genericHandlerWithLoader<'loader, 'handler, 'eventFilters>,
      ~logger: Pino.t=?,
    ) => unit
    let setContractRegister: (
      t,
      Internal.genericContractRegister<Internal.genericContractRegisterArgs<'event, 'context>>,
      ~eventOptions: option<EventOptions.t>,
      ~logger: Pino.t=?,
    ) => unit
    let noopLoader: Internal.genericLoader<'event, ()>
    let getLoader: t => option<Internal.loader>
    let getHandler: t => option<Internal.handler>
    let getContractRegister: t => option<Internal.contractRegister>
    let getEventOptions: t => EventOptions.t
    let hasRegistration: t => bool
  } = {
    open Belt

    type handlerWithLoader = Internal.genericHandlerWithLoader<Internal.loader, Internal.handler, Js.Json.t>

    type t = {
      contractName: string,
      eventName: string,
      mutable loaderHandler: option<handlerWithLoader>,
      mutable contractRegister: option<Internal.contractRegister>,
      mutable eventOptions: option<EventOptions.t>,
    }

    let noopLoader = _ => Promise.resolve()

    let getLoader = (t: t) => 
      switch t.loaderHandler {
        | Some({loader}) => {
          if loader === noopLoader->(Utils.magic: Internal.genericLoader<'event, ()> => Internal.loader) {
            None
          } else {
            Some(loader)
          }
        }
        | None => None
      }

    let getHandler = (t: t) => 
      switch t.loaderHandler {
        | Some({handler}) => Some(handler)
        | None => None
      }

    let getContractRegister = (t: t) => t.contractRegister

    let getEventOptions = ({eventOptions}: t): EventOptions.t =>
      switch eventOptions {
      | Some(eventOptions) => eventOptions
      | None => EventOptions.default
      }

    let hasRegistration = ({loaderHandler, contractRegister}) =>
      loaderHandler->Belt.Option.isSome || contractRegister->Belt.Option.isSome

    let make = (~contractName, ~eventName) => {
      contractName,
      eventName,
      loaderHandler: None,
      contractRegister: None,
      eventOptions: None,
    }

    type eventNamespace = {contractName: string, eventName: string}
    exception DuplicateEventRegistration(eventNamespace)

    let setEventOptions = (t: t, value: EventOptions.t, ~logger=Logging.getLogger()) => {
      switch t.eventOptions {
      | None => t.eventOptions = Some(value)
      | Some(_) =>
        let eventNamespace = {contractName: t.contractName, eventName: t.eventName}
        DuplicateEventRegistration(eventNamespace)->ErrorHandling.mkLogAndRaise(
          ~logger=Logging.createChildFrom(~logger, ~params=eventNamespace),
          ~msg="Duplicate eventOptions in handlers not allowed",
        )
      }
    }

    let setLoaderHandler = (
      t: t,
      value,
      ~logger=Logging.getLogger(),
    ) => {
      switch t.loaderHandler {
      | None =>
        t.loaderHandler =
          value
          ->(Utils.magic: Internal.genericHandlerWithLoader<'loader, 'handler, 'eventFilters> => handlerWithLoader)
          ->Some
      | Some(_) =>
        let eventNamespace = {contractName: t.contractName, eventName: t.eventName}
        DuplicateEventRegistration(eventNamespace)->ErrorHandling.mkLogAndRaise(
          ~logger=Logging.createChildFrom(~logger, ~params=eventNamespace),
          ~msg="Duplicate registration of event handlers not allowed",
        )
      }

      switch value {
        | {wildcard: ?None, eventFilters: ?None, preRegisterDynamicContracts: ?None} => ()
        | {?wildcard, ?eventFilters, ?preRegisterDynamicContracts} =>
        t->setEventOptions(
          EventOptions.make(
            ~isWildcard=wildcard->Option.getWithDefault(false),
            ~eventFilters,
            ~preRegisterDynamicContracts=preRegisterDynamicContracts->Option.getWithDefault(false),
          ),
          ~logger
        )
      }
    }

    let setContractRegister = (
      t: t,
      value,
      ~eventOptions,
      ~logger=Logging.getLogger(),
    ) => {
      switch t.contractRegister {
      | None => t.contractRegister = Some(value->(Utils.magic: Internal.genericContractRegister<Internal.genericContractRegisterArgs<'event, 'context>> => Internal.contractRegister))
      | Some(_) =>
        let eventNamespace = {contractName: t.contractName, eventName: t.eventName}
        DuplicateEventRegistration(eventNamespace)->ErrorHandling.mkLogAndRaise(
          ~logger=Logging.createChildFrom(~logger, ~params=eventNamespace),
          ~msg="Duplicate contractRegister handlers not allowed",
        )
      }
      switch eventOptions {
      | Some(eventOptions) => t->setEventOptions(eventOptions, ~logger)
      | None => ()
      }
    }
  }
}

module type Event = {
  type event

  type loader<'loaderReturn> = Internal.genericLoader<
    Internal.genericLoaderArgs<event, loaderContext>,
    'loaderReturn,
  >
  type handler<'loaderReturn> = Internal.genericHandler<
    Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>,
  >
  type contractRegister = Internal.genericContractRegister<
    Internal.genericContractRegisterArgs<event, contractRegistrations>,
  >

  let handlerRegister: HandlerTypes.Register.t

  type eventFilters
}

let makeEventOptions = (
  type eventFilters,
  eventConfig: option<HandlerTypes.eventConfig<eventFilters>>,
) => {
  open Belt
  eventConfig->Option.map(({?wildcard, ?eventFilters, ?preRegisterDynamicContracts}) =>
    HandlerTypes.EventOptions.make(
      ~isWildcard=wildcard->Option.getWithDefault(false),
      ~eventFilters,
      ~preRegisterDynamicContracts=preRegisterDynamicContracts->Option.getWithDefault(false),
    )
  )
}

@genType.import(("./bindings/OpaqueTypes.ts", "HandlerWithOptions"))
type fnWithEventConfig<'fn, 'eventConfig> = ('fn, ~eventConfig: 'eventConfig=?) => unit

@genType
type handlerWithOptions<'eventArgs, 'loaderReturn, 'eventFilters> = fnWithEventConfig<
  HandlerTypes.handler<'eventArgs, 'loaderReturn>,
  HandlerTypes.eventConfig<'eventFilters>,
>

@genType
type contractRegisterWithOptions<'eventArgs, 'eventFilters> = fnWithEventConfig<
  HandlerTypes.contractRegister<'eventArgs>,
  HandlerTypes.eventConfig<'eventFilters>,
>

module MakeRegister = (Event: Event) => {
  let handler: fnWithEventConfig<
    Event.handler<unit>,
    HandlerTypes.eventConfig<Event.eventFilters>,
  > = (
    handler,
    ~eventConfig=?,
  ) => {
    Event.handlerRegister->HandlerTypes.Register.setLoaderHandler(
      {
        loader: HandlerTypes.Register.noopLoader,
        handler,
        wildcard: ?eventConfig->Belt.Option.flatMap(c => c.wildcard),
        eventFilters: ?eventConfig->Belt.Option.flatMap(c => c.eventFilters),
        preRegisterDynamicContracts: ?eventConfig->Belt.Option.flatMap(c =>
          c.preRegisterDynamicContracts
        ),
      },
    )
  }

  let contractRegister: fnWithEventConfig<
    Event.contractRegister,
    HandlerTypes.eventConfig<Event.eventFilters>,
  > = (
    contractRegister,
    ~eventConfig=?,
  ) =>
    Event.handlerRegister->HandlerTypes.Register.setContractRegister(
      contractRegister,
      ~eventOptions=makeEventOptions(eventConfig),
    )

  let handlerWithLoader = (args: Internal.genericHandlerWithLoader<
    Event.loader<'loaderReturn>,
    Event.handler<'loaderReturn>,
    Event.eventFilters,
  >) =>
    Event.handlerRegister->HandlerTypes.Register.setLoaderHandler(
      args,
    )
}

module PiePay = {
let abi = Ethers.makeAbi((%raw(`[{"type":"event","name":"ContributionApproved","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"contributionId","type":"uint256","indexed":true},{"name":"contributor","type":"address","indexed":true},{"name":"unitType","type":"uint8","indexed":false},{"name":"unitsAwarded","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"ContributionRejected","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"contributionId","type":"uint256","indexed":true},{"name":"contributor","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"ContributionSubmitted","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"contributionId","type":"uint256","indexed":true},{"name":"unitType","type":"uint8","indexed":false},{"name":"unitsRequested","type":"uint256","indexed":false},{"name":"description","type":"string","indexed":false}],"anonymous":false},{"type":"event","name":"ContributorRemoved","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"contributor","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"ContributorWhitelisted","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"contributor","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"ConversionMultipliersUpdated","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"pToDMultiplier","type":"uint16","indexed":false},{"name":"pToCMultiplier","type":"uint16","indexed":false},{"name":"dToCMultiplier","type":"uint16","indexed":false}],"anonymous":false},{"type":"event","name":"PayrollFunded","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"amount","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"PayrollManagerUpdated","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"newManager","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"ProjectInitialized","inputs":[{"name":"name","type":"string","indexed":false},{"name":"description","type":"string","indexed":false},{"name":"executor","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"ProjectLeadUpdated","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"newLead","type":"address","indexed":true}],"anonymous":false},{"type":"event","name":"TotalUnitsUpdated","inputs":[{"name":"unitType","type":"uint8","indexed":true},{"name":"newTotal","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UnitCapacityUpdated","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"unitType","type":"uint8","indexed":true},{"name":"newCapacity","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UnitsConverted","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"fromType","type":"uint8","indexed":true},{"name":"toType","type":"uint8","indexed":true},{"name":"fromAmount","type":"uint256","indexed":false},{"name":"toAmount","type":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"UnitsDistributed","inputs":[{"name":"executor","type":"address","indexed":true},{"name":"unitType","type":"uint8","indexed":true},{"name":"totalDistributed","type":"uint256","indexed":false},{"name":"recipientCount","type":"uint256","indexed":false}],"anonymous":false}]`): Js.Json.t))
let eventSignatures = ["ContributionApproved(address indexed executor, uint256 indexed contributionId, address indexed contributor, uint8 unitType, uint256 unitsAwarded)", "ContributionRejected(address indexed executor, uint256 indexed contributionId, address indexed contributor)", "ContributionSubmitted(address indexed executor, uint256 indexed contributionId, uint8 unitType, uint256 unitsRequested, string description)", "ContributorRemoved(address indexed executor, address indexed contributor)", "ContributorWhitelisted(address indexed executor, address indexed contributor)", "ConversionMultipliersUpdated(address indexed executor, uint16 pToDMultiplier, uint16 pToCMultiplier, uint16 dToCMultiplier)", "PayrollFunded(address indexed executor, uint256 amount)", "PayrollManagerUpdated(address indexed executor, address indexed newManager)", "ProjectInitialized(string name, string description, address indexed executor)", "ProjectLeadUpdated(address indexed executor, address indexed newLead)", "TotalUnitsUpdated(uint8 indexed unitType, uint256 newTotal)", "UnitCapacityUpdated(address indexed executor, uint8 indexed unitType, uint256 newCapacity)", "UnitsConverted(address indexed executor, uint8 indexed fromType, uint8 indexed toType, uint256 fromAmount, uint256 toAmount)", "UnitsDistributed(address indexed executor, uint8 indexed unitType, uint256 totalDistributed, uint256 recipientCount)"]
@genType type chainId = [#421614]
let contractName = "PiePay"

module ProjectInitialized = {

let id = "0xdbe7b5ddd5d3713e36394d9168241568a421ed73f4cf69bbafc372737438c34a_2"
let sighash = "0xdbe7b5ddd5d3713e36394d9168241568a421ed73f4cf69bbafc372737438c34a"
let name = "ProjectInitialized"
let contractName = contractName

@genType
type eventArgs = {name: string, description: string, executor: Address.t}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {name: s.field("name", S.string), description: s.field("description", S.string), executor: s.field("executor", Address.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, name: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, description: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ContributionSubmitted = {

let id = "0xb8e66104b5a45cba77279f0b6417ca29c32fc0c8911fb83ff38b3093a073d9d1_3"
let sighash = "0xb8e66104b5a45cba77279f0b6417ca29c32fc0c8911fb83ff38b3093a073d9d1"
let name = "ContributionSubmitted"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, contributionId: bigint, unitType: bigint, unitsRequested: bigint, description: string}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), contributionId: s.field("contributionId", BigInt.schema), unitType: s.field("unitType", BigInt.schema), unitsRequested: s.field("unitsRequested", BigInt.schema), description: s.field("description", S.string)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("contributionId") contributionId?: SingleOrMultiple.t<bigint>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","contributionId",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributionId")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributionId: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, unitType: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, unitsRequested: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, description: decodedEvent.body->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ContributionApproved = {

let id = "0x8e9e84ff2f4827eb8f453640a6aba7b2c9864b535f6b28ae694a252c6cdcbc94_4"
let sighash = "0x8e9e84ff2f4827eb8f453640a6aba7b2c9864b535f6b28ae694a252c6cdcbc94"
let name = "ContributionApproved"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, contributionId: bigint, contributor: Address.t, unitType: bigint, unitsAwarded: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), contributionId: s.field("contributionId", BigInt.schema), contributor: s.field("contributor", Address.schema), unitType: s.field("unitType", BigInt.schema), unitsAwarded: s.field("unitsAwarded", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("contributionId") contributionId?: SingleOrMultiple.t<bigint>, @as("contributor") contributor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","contributionId","contributor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributionId")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)), ~topic3=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributionId: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributor: decodedEvent.indexed->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, unitType: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, unitsAwarded: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ContributionRejected = {

let id = "0x11fe36ade3375928bf773f08f6388ef3da1086d6c1b0115a858911c3322e6715_4"
let sighash = "0x11fe36ade3375928bf773f08f6388ef3da1086d6c1b0115a858911c3322e6715"
let name = "ContributionRejected"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, contributionId: bigint, contributor: Address.t}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), contributionId: s.field("contributionId", BigInt.schema), contributor: s.field("contributor", Address.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("contributionId") contributionId?: SingleOrMultiple.t<bigint>, @as("contributor") contributor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","contributionId","contributor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributionId")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)), ~topic3=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributionId: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributor: decodedEvent.indexed->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module UnitsDistributed = {

let id = "0xcc3a1a19a39e2a356b4d64cf0defa5c11be8009d73e0c4dfe5669940a99ec2aa_3"
let sighash = "0xcc3a1a19a39e2a356b4d64cf0defa5c11be8009d73e0c4dfe5669940a99ec2aa"
let name = "UnitsDistributed"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, unitType: bigint, totalDistributed: bigint, recipientCount: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), unitType: s.field("unitType", BigInt.schema), totalDistributed: s.field("totalDistributed", BigInt.schema), recipientCount: s.field("recipientCount", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("unitType") unitType?: SingleOrMultiple.t<bigint>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","unitType",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("unitType")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, unitType: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, totalDistributed: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, recipientCount: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module PayrollFunded = {

let id = "0x8965492665ae65aac7bb9b650760a8c61148b40e6c988ed5a646e420676d4511_2"
let sighash = "0x8965492665ae65aac7bb9b650760a8c61148b40e6c988ed5a646e420676d4511"
let name = "PayrollFunded"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, amount: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), amount: s.field("amount", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, amount: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ContributorWhitelisted = {

let id = "0xd311cf42333c9446fe9af6bd72e0d7af1963cfb795b6f647c1aa8839e48429e3_3"
let sighash = "0xd311cf42333c9446fe9af6bd72e0d7af1963cfb795b6f647c1aa8839e48429e3"
let name = "ContributorWhitelisted"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, contributor: Address.t}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), contributor: s.field("contributor", Address.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("contributor") contributor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","contributor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributor: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ContributorRemoved = {

let id = "0xdfe811a95bef48e76e32818e44c91bba06027b310506108346fb435afcb93e06_3"
let sighash = "0xdfe811a95bef48e76e32818e44c91bba06027b310506108346fb435afcb93e06"
let name = "ContributorRemoved"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, contributor: Address.t}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), contributor: s.field("contributor", Address.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("contributor") contributor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","contributor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("contributor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, contributor: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ProjectLeadUpdated = {

let id = "0xe6c8d0172a8b250d9ab3134b721c28058c5289615daa61658015a34e3060fc1b_3"
let sighash = "0xe6c8d0172a8b250d9ab3134b721c28058c5289615daa61658015a34e3060fc1b"
let name = "ProjectLeadUpdated"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, newLead: Address.t}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), newLead: s.field("newLead", Address.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("newLead") newLead?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","newLead",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("newLead")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, newLead: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module PayrollManagerUpdated = {

let id = "0x4b1d5cdf715aef4e78239f270fef28e1120e4aa362aeaa4913f57888c699541a_3"
let sighash = "0x4b1d5cdf715aef4e78239f270fef28e1120e4aa362aeaa4913f57888c699541a"
let name = "PayrollManagerUpdated"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, newManager: Address.t}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), newManager: s.field("newManager", Address.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("newManager") newManager?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","newManager",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("newManager")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, newManager: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module UnitsConverted = {

let id = "0x6a1db84162d96b20308460ce740805af5700f5ce384613922f3a4588e4dabee0_4"
let sighash = "0x6a1db84162d96b20308460ce740805af5700f5ce384613922f3a4588e4dabee0"
let name = "UnitsConverted"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, fromType: bigint, toType: bigint, fromAmount: bigint, toAmount: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), fromType: s.field("fromType", BigInt.schema), toType: s.field("toType", BigInt.schema), fromAmount: s.field("fromAmount", BigInt.schema), toAmount: s.field("toAmount", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("fromType") fromType?: SingleOrMultiple.t<bigint>, @as("toType") toType?: SingleOrMultiple.t<bigint>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","fromType","toType",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("fromType")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)), ~topic3=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("toType")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, fromType: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, toType: decodedEvent.indexed->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, fromAmount: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, toAmount: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module TotalUnitsUpdated = {

let id = "0x22f819390dc0f488870f1adc5de4402d0e337c687fe8587231bc953777cf64c3_2"
let sighash = "0x22f819390dc0f488870f1adc5de4402d0e337c687fe8587231bc953777cf64c3"
let name = "TotalUnitsUpdated"
let contractName = contractName

@genType
type eventArgs = {unitType: bigint, newTotal: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {unitType: s.field("unitType", BigInt.schema), newTotal: s.field("newTotal", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("unitType") unitType?: SingleOrMultiple.t<bigint>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["unitType",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("unitType")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {unitType: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, newTotal: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module ConversionMultipliersUpdated = {

let id = "0x9704ca64e4bb8a7f81f0677867676c5b53d0cb8e838ce9997751866ea229b062_2"
let sighash = "0x9704ca64e4bb8a7f81f0677867676c5b53d0cb8e838ce9997751866ea229b062"
let name = "ConversionMultipliersUpdated"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, pToDMultiplier: bigint, pToCMultiplier: bigint, dToCMultiplier: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), pToDMultiplier: s.field("pToDMultiplier", BigInt.schema), pToCMultiplier: s.field("pToCMultiplier", BigInt.schema), dToCMultiplier: s.field("dToCMultiplier", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, pToDMultiplier: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, pToCMultiplier: decodedEvent.body->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, dToCMultiplier: decodedEvent.body->Js.Array2.unsafe_get(2)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}

module UnitCapacityUpdated = {

let id = "0xa5c985c982153cb0e97b7dcc5355aee785dfe4821a92e9b7933dcca66d5b3f38_3"
let sighash = "0xa5c985c982153cb0e97b7dcc5355aee785dfe4821a92e9b7933dcca66d5b3f38"
let name = "UnitCapacityUpdated"
let contractName = contractName

@genType
type eventArgs = {executor: Address.t, unitType: bigint, newCapacity: bigint}
@genType
type block = Block.t
@genType
type transaction = Transaction.t

@genType
type event = {
  /** The parameters or arguments associated with this event. */
  params: eventArgs,
  /** The unique identifier of the blockchain network where this event occurred. */
  chainId: chainId,
  /** The address of the contract that emitted this event. */
  srcAddress: Address.t,
  /** The index of this event's log within the block. */
  logIndex: int,
  /** The transaction that triggered this event. Configurable in `config.yaml` via the `field_selection` option. */
  transaction: transaction,
  /** The block in which this event was recorded. Configurable in `config.yaml` via the `field_selection` option. */
  block: block,
}

@genType
type loaderArgs = Internal.genericLoaderArgs<event, loaderContext>
@genType
type loader<'loaderReturn> = Internal.genericLoader<loaderArgs, 'loaderReturn>
@genType
type handlerArgs<'loaderReturn> = Internal.genericHandlerArgs<event, handlerContext, 'loaderReturn>
@genType
type handler<'loaderReturn> = Internal.genericHandler<handlerArgs<'loaderReturn>>
@genType
type contractRegister = Internal.genericContractRegister<Internal.genericContractRegisterArgs<event, contractRegistrations>>

let paramsRawEventSchema = S.object((s): eventArgs => {executor: s.field("executor", Address.schema), unitType: s.field("unitType", BigInt.schema), newCapacity: s.field("newCapacity", BigInt.schema)})
let blockSchema = Block.schema
let transactionSchema = Transaction.schema

let handlerRegister: HandlerTypes.Register.t = HandlerTypes.Register.make(
  ~contractName,
  ~eventName=name,
)

@genType
type eventFilter = {@as("executor") executor?: SingleOrMultiple.t<Address.t>, @as("unitType") unitType?: SingleOrMultiple.t<bigint>}

@genType type eventFiltersArgs = {/** The unique identifier of the blockchain network where this event occurred. */ chainId: chainId, /** Addresses of the contracts indexing the event. */ addresses: array<Address.t>}

@genType @unboxed type eventFiltersDefinition = Single(eventFilter) | Multiple(array<eventFilter>)

@genType @unboxed type eventFilters = | ...eventFiltersDefinition | Dynamic(eventFiltersArgs => eventFiltersDefinition)

let register = (): Internal.evmEventConfig => {
  let {getEventFiltersOrThrow, filterByAddresses} = LogSelection.parseEventFiltersOrThrow(~eventFilters=(handlerRegister->HandlerTypes.Register.getEventOptions).eventFilters, ~sighash, ~params=["executor","unitType",], ~topic1=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("executor")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromAddress)), ~topic2=(_eventFilter) => _eventFilter->Utils.Dict.dangerouslyGetNonOption("unitType")->Belt.Option.mapWithDefault([], topicFilters => topicFilters->Obj.magic->SingleOrMultiple.normalizeOrThrow->Belt.Array.map(TopicFilter.fromBigInt)))
  {
    getEventFiltersOrThrow,
    filterByAddresses,
    dependsOnAddresses: !(handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard || filterByAddresses,
    blockSchema: blockSchema->(Utils.magic: S.t<block> => S.t<Internal.eventBlock>),
    transactionSchema: transactionSchema->(Utils.magic: S.t<transaction> => S.t<Internal.eventTransaction>),
    convertHyperSyncEventArgs: (decodedEvent: HyperSyncClient.Decoder.decodedEvent) => {executor: decodedEvent.indexed->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, unitType: decodedEvent.indexed->Js.Array2.unsafe_get(1)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, newCapacity: decodedEvent.body->Js.Array2.unsafe_get(0)->HyperSyncClient.Decoder.toUnderlying->Utils.magic, }->(Utils.magic: eventArgs => Internal.eventParams),
    id,
  name,
  contractName,
  isWildcard: (handlerRegister->HandlerTypes.Register.getEventOptions).isWildcard,
  loader: handlerRegister->HandlerTypes.Register.getLoader,
  handler: handlerRegister->HandlerTypes.Register.getHandler,
  contractRegister: handlerRegister->HandlerTypes.Register.getContractRegister,
  paramsRawEventSchema: paramsRawEventSchema->(Utils.magic: S.t<eventArgs> => S.t<Internal.eventParams>),
  }
}
}
}

@genType
type chainId = int
