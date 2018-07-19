object IceMakers {
  //Hourly Values: these are manual inputs (for now)
  private var preRunHoursInput = 10.0
  private var postRunHoursInput = 5.0
  //Energy Values: The pre value is input (for now) but the post value is called from a database/excel sheet
  private var preEnergyUseRateInput = 10.0
  private var postEnergyUseRateCall = 5.0
  //Ice Harvest: The pre value is input (for now) but the post value is called from a database/excel sheet
  private var preIceHarvestRateInput = 10.0
  private var postIceHarvestRateCall = 10.0
  //This value serves as a placeholder and will be changed throughout the class
  private var energySavings:Double = 0.toDouble()
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true.
  private var timeChange = true
  @JvmStatic fun main(args:Array<String>) {
    println("Hello World")
    var energyPowerChange = energyPowerChangeCalc()
    var energyTimeChange = energyTimeChangeCalc()
    if (energyPowerChange != 0.0 && energyTimeChange == 0.0)
    {
      energySavings = energyPowerChange
    }
    else if (energyPowerChange == 0.0 && energyTimeChange != 0.0)
    {
      energySavings = energyTimeChange
    }
    else if (energyPowerChange != 0.0 && energyTimeChange != 0.0)
    {
      energySavings = energyCalcTotal(energyPowerChange, energyTimeChange)
    }
    else if (energyPowerChange == 0.0 && energyTimeChange == 0.0)
    {
      energySavings = 0.0
    }
    println(energySavings)
  }
  //this is the function that will be called by the platform to determine the energy cost savings. In the main class the value is "powerValue" that is
  //used in the various electricityCosts equations; in this equation there should be a check determining if the powerValue returned is dependent upon
  //the time or not. If it is dependent upon the time, then the powerValue returned will be the preValue. If it is not dependent upon the time, then
  //the power value returned will be the difference between the pre and post values
  fun powerValueCalc():Double {
    if (timeChange == false)
    {
      return ((preEnergyUseRateInput - postEnergyUseRateCall) / 24 * postIceHarvestRateCall)
    }
    else
    {
      return (preEnergyUseRateInput) / 24 * preIceHarvestRateInput
    }
  }
  //these equations are used to calculate the savings in energy
  //shows if just the power is changed
  fun energyPowerChangeCalc():Double {
    return (preRunHoursInput * (preEnergyUseRateInput - postEnergyUseRateCall) / 24 * postIceHarvestRateCall)
  }
  //shows if just the time is changed
  fun energyTimeChangeCalc():Double {
    return ((preRunHoursInput - postRunHoursInput) * preEnergyUseRateInput / 24 * preIceHarvestRateInput)
  }
  //shows if the time and the power is changed
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((preRunHoursInput - postRunHoursInput) * (preEnergyUseRateInput - postEnergyUseRateCall) / 24 * postIceHarvestRateCall)
  }
}
