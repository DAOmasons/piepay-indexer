@val external require: string => unit = "require"

let registerContractHandlers = (
  ~contractName,
  ~handlerPathRelativeToRoot,
  ~handlerPathRelativeToConfig,
) => {
  try {
    require(`../${Path.relativePathToRootFromGenerated}/${handlerPathRelativeToRoot}`)
  } catch {
  | exn =>
    let params = {
      "Contract Name": contractName,
      "Expected Handler Path": handlerPathRelativeToConfig,
      "Code": "EE500",
    }
    let logger = Logging.createChild(~params)

    let errHandler = exn->ErrorHandling.make(~msg="Failed to import handler file", ~logger)
    errHandler->ErrorHandling.log
    errHandler->ErrorHandling.raiseExn
  }
}

%%private(
  let makeGeneratedConfig = () => {
    let chains = [
      {
        let contracts = [
          {
            Config.name: "PiePay",
            abi: Types.PiePay.abi,
            addresses: [
              "0xCfa3fAF4cd8Bfc8ba93f87c30C46dAE62B578a2b"->Address.Evm.fromStringOrThrow
,
            ],
            events: [
              (Types.PiePay.ProjectInitialized.register() :> Internal.eventConfig),
              (Types.PiePay.ContributionSubmitted.register() :> Internal.eventConfig),
              (Types.PiePay.ContributionApproved.register() :> Internal.eventConfig),
              (Types.PiePay.ContributionRejected.register() :> Internal.eventConfig),
              (Types.PiePay.UnitsDistributed.register() :> Internal.eventConfig),
              (Types.PiePay.PayrollFunded.register() :> Internal.eventConfig),
              (Types.PiePay.ContributorWhitelisted.register() :> Internal.eventConfig),
              (Types.PiePay.ContributorRemoved.register() :> Internal.eventConfig),
              (Types.PiePay.ProjectLeadUpdated.register() :> Internal.eventConfig),
              (Types.PiePay.PayrollManagerUpdated.register() :> Internal.eventConfig),
              (Types.PiePay.UnitsConverted.register() :> Internal.eventConfig),
              (Types.PiePay.TotalUnitsUpdated.register() :> Internal.eventConfig),
              (Types.PiePay.ConversionMultipliersUpdated.register() :> Internal.eventConfig),
              (Types.PiePay.UnitCapacityUpdated.register() :> Internal.eventConfig),
            ],
          },
        ]
        let chain = ChainMap.Chain.makeUnsafe(~chainId=421614)
        {
          Config.confirmedBlockThreshold: 0,
          startBlock: 0,
          endBlock: None,
          chain,
          contracts,
          sources: NetworkSources.evm(~chain, ~contracts=[{name: "PiePay",events: [Types.PiePay.ProjectInitialized.register(), Types.PiePay.ContributionSubmitted.register(), Types.PiePay.ContributionApproved.register(), Types.PiePay.ContributionRejected.register(), Types.PiePay.UnitsDistributed.register(), Types.PiePay.PayrollFunded.register(), Types.PiePay.ContributorWhitelisted.register(), Types.PiePay.ContributorRemoved.register(), Types.PiePay.ProjectLeadUpdated.register(), Types.PiePay.PayrollManagerUpdated.register(), Types.PiePay.UnitsConverted.register(), Types.PiePay.TotalUnitsUpdated.register(), Types.PiePay.ConversionMultipliersUpdated.register(), Types.PiePay.UnitCapacityUpdated.register()],abi: Types.PiePay.abi}], ~hyperSync=Some("https://421614.hypersync.xyz"), ~allEventSignatures=[Types.PiePay.eventSignatures]->Belt.Array.concatMany, ~shouldUseHypersyncClientDecoder=true, ~rpcs=[])
        }
      },
    ]

    Config.make(
      ~shouldRollbackOnReorg=true,
      ~shouldSaveFullHistory=false,
      ~isUnorderedMultichainMode=false,
      ~chains,
      ~enableRawEvents=false,
    )
  }

  let config: ref<option<Config.t>> = ref(None)
)

let registerAllHandlers = () => {
  registerContractHandlers(
    ~contractName="PiePay",
    ~handlerPathRelativeToRoot="src/PiePay.ts",
    ~handlerPathRelativeToConfig="src/PiePay.ts",
  )

  let generatedConfig = makeGeneratedConfig()
  config := Some(generatedConfig)
  generatedConfig
}

let getConfig = () => {
  switch config.contents {
  | Some(config) => config
  | None => registerAllHandlers()
  }
}
