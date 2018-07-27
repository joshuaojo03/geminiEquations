object FridgesAndFreezers {
  //Hourly values: These will be manually input for now
  private var preRunHoursInput = 10.0
  private var postRunHoursInput = 5.0
  //Energy Use Values: The pre-energy use is input (for now), the post energy use is called
  private var preHourlyEnergyUseInput = 10.0
  private var postHourlyEnergyUseCall = 5.0
  //These values are using the above values.
  private var prePowerCalc = preHourlyEnergyUseInput / 24
  private var postPowerCalc = postHourlyEnergyUseCall / 24
  //this serves as a placeholder. This class should reassign the value.
  private var energySavings:Double = 0.toDouble()
  //this value should be passed in from the main class. If just the power is being changed, then the value is false.
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
      return (prePowerUseCalc - postPowerCalc)
    }
    else
    {
      return (prePowerCalc)
    }
  }
  //these equations are used to calculate the savings in energy
  //just the change in power;
  fun energyPowerChangeCalc():Double {
    return (preRunHoursInput * (prePowerCalc - postPowerCalc))
  }
  //just the change in time;
  fun energyTimeChangeCalc():Double {
    return ((preRunHoursInput - postRunHoursInput) * prePowerCalc)
  }
  //If both the power and time are changed;
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((preRunHoursInput - postRunHoursInput) * (prePowerCalc - postPowerCalc))
  }
}
