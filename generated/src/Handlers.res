  @genType
module PiePay = {
  module ProjectInitialized = Types.MakeRegister(Types.PiePay.ProjectInitialized)
  module ContributionSubmitted = Types.MakeRegister(Types.PiePay.ContributionSubmitted)
  module ContributionApproved = Types.MakeRegister(Types.PiePay.ContributionApproved)
  module ContributionRejected = Types.MakeRegister(Types.PiePay.ContributionRejected)
  module UnitsDistributed = Types.MakeRegister(Types.PiePay.UnitsDistributed)
  module PayrollFunded = Types.MakeRegister(Types.PiePay.PayrollFunded)
  module ContributorWhitelisted = Types.MakeRegister(Types.PiePay.ContributorWhitelisted)
  module ContributorRemoved = Types.MakeRegister(Types.PiePay.ContributorRemoved)
  module ProjectLeadUpdated = Types.MakeRegister(Types.PiePay.ProjectLeadUpdated)
  module PayrollManagerUpdated = Types.MakeRegister(Types.PiePay.PayrollManagerUpdated)
  module UnitsConverted = Types.MakeRegister(Types.PiePay.UnitsConverted)
  module TotalUnitsUpdated = Types.MakeRegister(Types.PiePay.TotalUnitsUpdated)
  module ConversionMultipliersUpdated = Types.MakeRegister(Types.PiePay.ConversionMultipliersUpdated)
  module UnitCapacityUpdated = Types.MakeRegister(Types.PiePay.UnitCapacityUpdated)
}

