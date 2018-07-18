object fryersSteamCookersGriddles {
  //Hourly Values: these are manual inputs (for now)
  private val preRunHoursInput = 10.0
  private val postRunHoursInput = 10.0
  /*Energy and Powwer Values*/
  //The pre values will be manual inputs, the post values will be called from a database
  private val preIdleEnergyRateInput = 10.0
  private val postIdleEnergyRateCall = 10.0
  private val preHourlyEnergyUseInput = 10.0
  private val postHourlyEnergyUseCall = 10.0
  private val prePreheatEnergyInput = 10.0
  private val postPreheatEnergyCall = 5.0
  //Will double check this value
  private val preDaysInOperationCalc = preHourlyEnergyUseInput / 24
  private val postDaysInOperationCalc = postHourlyEnergyUseCall / 24
  //This value serves as a placeholder and will be changed throughout the class
  private val energySavings:Double = 0.toDouble()
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true
  private val timeChange = true
  @JvmStatic fun main(args:Array<String>) {
    val energyPowerChange = energyPowerChangeCalc()
    val energyTimeChange = energyTimeChangeCalc()
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
    //will likely be a return statement
    println(energySavings)
  }
  //this is the function that will be called by the platform to determine the energy cost savings. In the main class the value is "powerValue" that is
  //used in the various electricityCosts equations; in this equation there should be a check determining if the powerValue returned is dependent upon
  //the time or not. If it is dependent upon the time, then the powerValue returned will be the preValue. If it is not dependent upon the time, then
  //the power value returned will be the difference between the pre and post values
  fun powerValueCalc():DoubleArray {
    if (timeChange == false)
    {
      val powerValues = DoubleArray(2)
      powerValues[0] = (prePreheatEnergyInput - postPreheatEnergyCall)
      powerValues[1] = (preIdleEnergyRateInput - postIdleEnergyRateCall)
      return (powerValues)
    }
    else
    {
      val powerValues = DoubleArray(2)
      powerValues[0] = (prePreheatEnergyInput)
      powerValues[1] = (preIdleEnergyRateInput)
      return (powerValues)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeCalc():Double {
    return (((prePreheatEnergyInput - postPreheatEnergyCall) * preDaysInOperationCalc) + (preRunHoursInput * (preIdleEnergyRateInput - postIdleEnergyRateCall)))
  }
  fun energyTimeChangeCalc():Double {
    return ((prePreheatEnergyInput) * (preDaysInOperationCalc - postDaysInOperationCalc) + ((preRunHoursInput - postRunHoursInput) * preIdleEnergyRateInput))
  }
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((((prePreheatEnergyInput - postPreheatEnergyCall) * (preDaysInOperationCalc - postDaysInOperationCalc)) + ((preRunHoursInput - postRunHoursInput) * (preIdleEnergyRateInput - postIdleEnergyRateCall))))
  }
}
