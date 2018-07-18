object Televisions {
  /*Power and Energy Values*/
  //The pre values are manual inputs, the post values will be called from a database
  private val prePowerConsumptionModeOnInput = 10.0
  private val postPowerConsumptionModeOnCall = 10.0
  private val prePowerConsumptionStandbyModeInput = 10.0
  private val postPowerConsumptionStandbyModeCall = 10.0
  /*Time Values*/
  //These will be manual inputs (for now)
  private val preOperatingHoursInput = 10.0
  private val postOperatingHoursInput = 5.0
  private val preOffHoursInput = 10.0
  private val postOffHoursInput = 10.0
  //This value serves as a placeholder and will be changed throughout the class
  private val energySavings:Double = 0.toDouble()
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true.
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
    println(energySavings)
  }
  //this is the function that will be called by the platform to determine the energy cost savings. In the main class the value is "powerValue" that is
  //used in the various electricityCosts equations; in this equation there should be a check determining if the powerValue returned is dependent upon
  //the time or not. If it is dependent upon the time, then the powerValue returned will be the preValue. If it is not dependent upon the time, then
  //the power value returned will be the difference between the pre and post values
  //These power values are returned in an array; The main class has array functions that account for this
  fun powerValueCalc():DoubleArray {
    if (timeChange == false)
    {
      val powerValues = DoubleArray(2)
      powerValues[0] = (prePowerConsumptionStandbyModeInput - postPowerConsumptionStandbyModeCall)
      powerValues[1] = (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnCall)
      return (powerValues)
    }
    else
    {
      val powerValues = DoubleArray(2)
      powerValues[0] = (prePowerConsumptionStandbyModeInput)
      powerValues[1] = (prePowerConsumptionModeOnInput)
      return (powerValues)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeCalc():Double {
    return (((preOperatingHoursInput * (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnCall)) + (preOffHoursInput * (prePowerConsumptionStandbyModeInput - postPowerConsumptionStandbyModeCall))))
  }
  fun energyTimeChangeCalc():Double {
    return ((((preOperatingHoursInput - postOperatingHoursInput) * prePowerConsumptionModeOnInput) + ((preOffHoursInput - postOffHoursInput) * prePowerConsumptionStandbyModeInput)))
  }
  fun energyCalcTotal(energyPowerChange:Double, energyTimeChange:Double):Double {
    return ((((preOperatingHoursInput - postOperatingHoursInput) * (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnCall)) + ((preOffHoursInput - postOffHoursInput) * (prePowerConsumptionStandbyModeInput - postPowerConsumptionStandbyModeCall))))
  }
}
