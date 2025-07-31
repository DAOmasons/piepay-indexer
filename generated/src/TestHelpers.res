/***** TAKE NOTE ******
This is a hack to get genType to work!

In order for genType to produce recursive types, it needs to be at the 
root module of a file. If it's defined in a nested module it does not 
work. So all the MockDb types and internal functions are defined in TestHelpers_MockDb
and only public functions are recreated and exported from this module.

the following module:
```rescript
module MyModule = {
  @genType
  type rec a = {fieldB: b}
  @genType and b = {fieldA: a}
}
```

produces the following in ts:
```ts
// tslint:disable-next-line:interface-over-type-literal
export type MyModule_a = { readonly fieldB: b };

// tslint:disable-next-line:interface-over-type-literal
export type MyModule_b = { readonly fieldA: MyModule_a };
```

fieldB references type b which doesn't exist because it's defined
as MyModule_b
*/

module MockDb = {
  @genType
  let createMockDb = TestHelpers_MockDb.createMockDb
}

@genType
module Addresses = {
  include TestHelpers_MockAddresses
}

module EventFunctions = {
  //Note these are made into a record to make operate in the same way
  //for Res, JS and TS.

  /**
  The arguements that get passed to a "processEvent" helper function
  */
  @genType
  type eventProcessorArgs<'event> = {
    event: 'event,
    mockDb: TestHelpers_MockDb.t,
    @deprecated("Set the chainId for the event instead")
    chainId?: int,
  }

  @genType
  type eventProcessor<'event> = eventProcessorArgs<'event> => promise<TestHelpers_MockDb.t>

  /**
  A function composer to help create individual processEvent functions
  */
  let makeEventProcessor = (~register) => args => {
    let {event, mockDb, ?chainId} =
      args->(Utils.magic: eventProcessorArgs<'event> => eventProcessorArgs<Internal.event>)

    // Have the line here, just in case the function is called with
    // a manually created event. We don't want to break the existing tests here.
    let _ =
      TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    TestHelpers_MockDb.makeProcessEvents(mockDb, ~chainId=?chainId)([event->(Utils.magic: Internal.event => Types.eventLog<unknown>)])
  }

  module MockBlock = {
    @genType
    type t = {
      hash?: string,
      number?: int,
      timestamp?: int,
    }

    let toBlock = (_mock: t) => {
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
      number: _mock.number->Belt.Option.getWithDefault(0),
      timestamp: _mock.timestamp->Belt.Option.getWithDefault(0),
    }->(Utils.magic: Types.AggregatedBlock.t => Internal.eventBlock)
  }

  module MockTransaction = {
    @genType
    type t = {
      from?: option<Address.t>,
      hash?: string,
      to?: option<Address.t>,
      transactionIndex?: int,
    }

    let toTransaction = (_mock: t) => {
      from: _mock.from->Belt.Option.getWithDefault(None),
      hash: _mock.hash->Belt.Option.getWithDefault("foo"),
      to: _mock.to->Belt.Option.getWithDefault(None),
      transactionIndex: _mock.transactionIndex->Belt.Option.getWithDefault(0),
    }->(Utils.magic: Types.AggregatedTransaction.t => Internal.eventTransaction)
  }

  @genType
  type mockEventData = {
    chainId?: int,
    srcAddress?: Address.t,
    logIndex?: int,
    block?: MockBlock.t,
    transaction?: MockTransaction.t,
  }

  /**
  Applies optional paramters with defaults for all common eventLog field
  */
  let makeEventMocker = (
    ~params: Internal.eventParams,
    ~mockEventData: option<mockEventData>,
    ~register: unit => Internal.eventConfig,
  ): Internal.event => {
    let {?block, ?transaction, ?srcAddress, ?chainId, ?logIndex} =
      mockEventData->Belt.Option.getWithDefault({})
    let block = block->Belt.Option.getWithDefault({})->MockBlock.toBlock
    let transaction = transaction->Belt.Option.getWithDefault({})->MockTransaction.toTransaction
    let config = RegisterHandlers.getConfig()
    let event: Internal.event = {
      params,
      transaction,
      chainId: switch chainId {
      | Some(chainId) => chainId
      | None =>
        switch config.defaultChain {
        | Some(chainConfig) => chainConfig.chain->ChainMap.Chain.toChainId
        | None =>
          Js.Exn.raiseError(
            "No default chain Id found, please add at least 1 chain to your config.yaml",
          )
        }
      },
      block,
      srcAddress: srcAddress->Belt.Option.getWithDefault(Addresses.defaultAddress),
      logIndex: logIndex->Belt.Option.getWithDefault(0),
    }
    // Since currently it's not possible to figure out the event config from the event
    // we store a reference to the register function by event in a weak map
    let _ = TestHelpers_MockDb.mockEventRegisters->Utils.WeakMap.set(event, register)
    event
  }
}


module PiePay = {
  module ProjectInitialized = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ProjectInitialized.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ProjectInitialized.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("name")
      name?: string,
      @as("description")
      description?: string,
      @as("executor")
      executor?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?name,
        ?description,
        ?executor,
        ?mockEventData,
      } = args

      let params = 
      {
       name: name->Belt.Option.getWithDefault("foo"),
       description: description->Belt.Option.getWithDefault("foo"),
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.PiePay.ProjectInitialized.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ProjectInitialized.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ProjectInitialized.event)
    }
  }

  module ContributionSubmitted = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ContributionSubmitted.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ContributionSubmitted.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("contributionId")
      contributionId?: bigint,
      @as("unitType")
      unitType?: bigint,
      @as("unitsRequested")
      unitsRequested?: bigint,
      @as("description")
      description?: string,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?contributionId,
        ?unitType,
        ?unitsRequested,
        ?description,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       contributionId: contributionId->Belt.Option.getWithDefault(0n),
       unitType: unitType->Belt.Option.getWithDefault(0n),
       unitsRequested: unitsRequested->Belt.Option.getWithDefault(0n),
       description: description->Belt.Option.getWithDefault("foo"),
      }
->(Utils.magic: Types.PiePay.ContributionSubmitted.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ContributionSubmitted.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ContributionSubmitted.event)
    }
  }

  module ContributionApproved = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ContributionApproved.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ContributionApproved.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("contributionId")
      contributionId?: bigint,
      @as("contributor")
      contributor?: Address.t,
      @as("unitType")
      unitType?: bigint,
      @as("unitsAwarded")
      unitsAwarded?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?contributionId,
        ?contributor,
        ?unitType,
        ?unitsAwarded,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       contributionId: contributionId->Belt.Option.getWithDefault(0n),
       contributor: contributor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       unitType: unitType->Belt.Option.getWithDefault(0n),
       unitsAwarded: unitsAwarded->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.ContributionApproved.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ContributionApproved.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ContributionApproved.event)
    }
  }

  module ContributionRejected = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ContributionRejected.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ContributionRejected.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("contributionId")
      contributionId?: bigint,
      @as("contributor")
      contributor?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?contributionId,
        ?contributor,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       contributionId: contributionId->Belt.Option.getWithDefault(0n),
       contributor: contributor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.PiePay.ContributionRejected.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ContributionRejected.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ContributionRejected.event)
    }
  }

  module UnitsDistributed = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.UnitsDistributed.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.UnitsDistributed.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("unitType")
      unitType?: bigint,
      @as("totalDistributed")
      totalDistributed?: bigint,
      @as("recipientCount")
      recipientCount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?unitType,
        ?totalDistributed,
        ?recipientCount,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       unitType: unitType->Belt.Option.getWithDefault(0n),
       totalDistributed: totalDistributed->Belt.Option.getWithDefault(0n),
       recipientCount: recipientCount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.UnitsDistributed.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.UnitsDistributed.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.UnitsDistributed.event)
    }
  }

  module PayrollFunded = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.PayrollFunded.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.PayrollFunded.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("amount")
      amount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?amount,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       amount: amount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.PayrollFunded.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.PayrollFunded.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.PayrollFunded.event)
    }
  }

  module ContributorWhitelisted = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ContributorWhitelisted.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ContributorWhitelisted.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("contributor")
      contributor?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?contributor,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       contributor: contributor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.PiePay.ContributorWhitelisted.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ContributorWhitelisted.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ContributorWhitelisted.event)
    }
  }

  module ContributorRemoved = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ContributorRemoved.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ContributorRemoved.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("contributor")
      contributor?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?contributor,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       contributor: contributor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.PiePay.ContributorRemoved.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ContributorRemoved.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ContributorRemoved.event)
    }
  }

  module ProjectLeadUpdated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ProjectLeadUpdated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ProjectLeadUpdated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("newLead")
      newLead?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?newLead,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newLead: newLead->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.PiePay.ProjectLeadUpdated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ProjectLeadUpdated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ProjectLeadUpdated.event)
    }
  }

  module PayrollManagerUpdated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.PayrollManagerUpdated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.PayrollManagerUpdated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("newManager")
      newManager?: Address.t,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?newManager,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       newManager: newManager->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
      }
->(Utils.magic: Types.PiePay.PayrollManagerUpdated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.PayrollManagerUpdated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.PayrollManagerUpdated.event)
    }
  }

  module UnitsConverted = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.UnitsConverted.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.UnitsConverted.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("fromType")
      fromType?: bigint,
      @as("toType")
      toType?: bigint,
      @as("fromAmount")
      fromAmount?: bigint,
      @as("toAmount")
      toAmount?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?fromType,
        ?toType,
        ?fromAmount,
        ?toAmount,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       fromType: fromType->Belt.Option.getWithDefault(0n),
       toType: toType->Belt.Option.getWithDefault(0n),
       fromAmount: fromAmount->Belt.Option.getWithDefault(0n),
       toAmount: toAmount->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.UnitsConverted.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.UnitsConverted.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.UnitsConverted.event)
    }
  }

  module TotalUnitsUpdated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.TotalUnitsUpdated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.TotalUnitsUpdated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("unitType")
      unitType?: bigint,
      @as("newTotal")
      newTotal?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?unitType,
        ?newTotal,
        ?mockEventData,
      } = args

      let params = 
      {
       unitType: unitType->Belt.Option.getWithDefault(0n),
       newTotal: newTotal->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.TotalUnitsUpdated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.TotalUnitsUpdated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.TotalUnitsUpdated.event)
    }
  }

  module ConversionMultipliersUpdated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.ConversionMultipliersUpdated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.ConversionMultipliersUpdated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("pToDMultiplier")
      pToDMultiplier?: bigint,
      @as("pToCMultiplier")
      pToCMultiplier?: bigint,
      @as("dToCMultiplier")
      dToCMultiplier?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?pToDMultiplier,
        ?pToCMultiplier,
        ?dToCMultiplier,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       pToDMultiplier: pToDMultiplier->Belt.Option.getWithDefault(0n),
       pToCMultiplier: pToCMultiplier->Belt.Option.getWithDefault(0n),
       dToCMultiplier: dToCMultiplier->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.ConversionMultipliersUpdated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.ConversionMultipliersUpdated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.ConversionMultipliersUpdated.event)
    }
  }

  module UnitCapacityUpdated = {
    @genType
    let processEvent: EventFunctions.eventProcessor<Types.PiePay.UnitCapacityUpdated.event> = EventFunctions.makeEventProcessor(
      ~register=(Types.PiePay.UnitCapacityUpdated.register :> unit => Internal.eventConfig),
    )

    @genType
    type createMockArgs = {
      @as("executor")
      executor?: Address.t,
      @as("unitType")
      unitType?: bigint,
      @as("newCapacity")
      newCapacity?: bigint,
      mockEventData?: EventFunctions.mockEventData,
    }

    @genType
    let createMockEvent = args => {
      let {
        ?executor,
        ?unitType,
        ?newCapacity,
        ?mockEventData,
      } = args

      let params = 
      {
       executor: executor->Belt.Option.getWithDefault(TestHelpers_MockAddresses.defaultAddress),
       unitType: unitType->Belt.Option.getWithDefault(0n),
       newCapacity: newCapacity->Belt.Option.getWithDefault(0n),
      }
->(Utils.magic: Types.PiePay.UnitCapacityUpdated.eventArgs => Internal.eventParams)

      EventFunctions.makeEventMocker(
        ~params,
        ~mockEventData,
        ~register=(Types.PiePay.UnitCapacityUpdated.register :> unit => Internal.eventConfig),
      )->(Utils.magic: Internal.event => Types.PiePay.UnitCapacityUpdated.event)
    }
  }

}

