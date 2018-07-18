object LightingRetrofit {
  //Hourly Values: these are manual inputs (for now)
  private val preHoursOnPerYearInput = 10.0
  private val postHoursOnPerYearInput = 5.0
  //Power Values: The pre value is input (for now); the post value is called
  private val preWattsInput = 10.0
  private val postWattsCall = 10.0
  //Number of Lamps: This is a manual input
  private val numberOfLampsInput = 10.0
  //This value serves as a placeholder and will be changed throughout the class
  private val energySavings:Double = 0.toDouble()
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true.
  private val timeChange = true
  @JvmStatic fun main(args:Array<String>) {
    println("Hello World")
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
  fun powerValueCalc():Double {
    if (timeChange == false)
    {
      return (preWattsInput - postWattsCall) / 1000 * numberOfLampsInput
    }
    else
    {
      return (preWattsInput / 1000 * numberOfLampsInput)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeCalc():Double {
    return ((preWattsInput - postWattsCall) / 1000 * numberOfLampsInput * preHoursOnPerYearInput)
  }
  fun energyTimeChangeCalc():Double {
    return (preWattsInput / 1000 * numberOfLampsInput * (preHoursOnPerYearInput - postHoursOnPerYearInput))
  }
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((preWattsInput - postWattsCall) / 1000 * numberOfLampsInput * (preHoursOnPerYearInput - postHoursOnPerYearInput))
  }
}
