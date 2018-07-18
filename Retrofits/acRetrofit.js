object ACRetrofit {
  //Hourly Values: these are manual inputs (for now)
  private val preHoursOnPerYearInput = 10.0
  private val postHoursOnPerYearInput = 5.0
  //SEER Values: pre is input, post is called
  private val preSEERInput = 10.0
  private val postSEERCall = 10.0
  //Nominal capacity: will be a manual input
  private val nominalCapacityInput = 10.0
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
      return (nominalCapacityInput / preSEERInput) - (nominalCapacityInput / postSEERCall)
    }
    else
    {
      return (nominalCapacityInput / preSEERInput)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeCalc():Double {
    return ((nominalCapacityInput / preSEERInput * preHoursOnPerYearInput) - (nominalCapacityInput / postSEERCall * preHoursOnPerYearInput))
  }
  fun energyTimeChangeCalc():Double {
    return ((nominalCapacityInput / preSEERInput) * (preHoursOnPerYearInput - postHoursOnPerYearInput))
  }
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((nominalCapacityInput / preSEERInput * preHoursOnPerYearInput) - (nominalCapacityInput / postSEERCall * postHoursOnPerYearInput))
  }
}
