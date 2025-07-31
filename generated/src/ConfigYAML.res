
type hyperSyncConfig = {endpointUrl: string}
type hyperFuelConfig = {endpointUrl: string}

@genType.opaque
type rpcConfig = {
  syncConfig: Config.syncConfig,
}

@genType
type syncSource = HyperSync(hyperSyncConfig) | HyperFuel(hyperFuelConfig) | Rpc(rpcConfig)

@genType.opaque
type aliasAbi = Ethers.abi

type eventName = string

type contract = {
  name: string,
  abi: aliasAbi,
  addresses: array<string>,
  events: array<eventName>,
}

type configYaml = {
  syncSource,
  startBlock: int,
  confirmedBlockThreshold: int,
  contracts: dict<contract>,
}

let publicConfig = ChainMap.fromArrayUnsafe([
  {
    let contracts = Js.Dict.fromArray([
      (
        "PiePay",
        {
          name: "PiePay",
          abi: Types.PiePay.abi,
          addresses: [
            "0xCfa3fAF4cd8Bfc8ba93f87c30C46dAE62B578a2b",
          ],
          events: [
            Types.PiePay.ProjectInitialized.name,
            Types.PiePay.ContributionSubmitted.name,
            Types.PiePay.ContributionApproved.name,
            Types.PiePay.ContributionRejected.name,
            Types.PiePay.UnitsDistributed.name,
            Types.PiePay.PayrollFunded.name,
            Types.PiePay.ContributorWhitelisted.name,
            Types.PiePay.ContributorRemoved.name,
            Types.PiePay.ProjectLeadUpdated.name,
            Types.PiePay.PayrollManagerUpdated.name,
            Types.PiePay.UnitsConverted.name,
            Types.PiePay.TotalUnitsUpdated.name,
            Types.PiePay.ConversionMultipliersUpdated.name,
            Types.PiePay.UnitCapacityUpdated.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=421614)
    (
      chain,
      {
        confirmedBlockThreshold: 0,
        syncSource: HyperSync({endpointUrl: "https://421614.hypersync.xyz"}),
        startBlock: 0,
        contracts
      }
    )
  },
])

@genType
let getGeneratedByChainId: int => configYaml = chainId => {
  let chain = ChainMap.Chain.makeUnsafe(~chainId)
  if !(publicConfig->ChainMap.has(chain)) {
    Js.Exn.raiseError(
      "No chain with id " ++ chain->ChainMap.Chain.toString ++ " found in config.yaml",
    )
  }
  publicConfig->ChainMap.get(chain)
}
