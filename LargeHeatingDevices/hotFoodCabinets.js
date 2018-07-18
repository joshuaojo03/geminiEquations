object HotFoodCabinets {
  //Hourly Values: these are manual inputs (for now)
  private val preRunHoursInput = 10.0
  private val postRunHoursInput = 10.0
  //Energy Values: The pre value is input (for now) but the post value is called from a database/excel sheet
  private val preIdleEnergyRateInput = 10.0
  private val postIdleEnergyRateInput = 10.0
  //Volume: This is a manual input for now
  private val cabinetVolumeInput = 10.0
  //Power: These values are calculated from the earlier values
  private val prePowerUseCalc = (cabinetVolumeInput * preIdleEnergyRateInput / 1000)
  private val postPowerUseCalc = (cabinetVolumeInput * postIdleEnergyRateInput / 1000)
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
      return (prePowerUseCalc - postPowerUseCalc)
    }
    else
    {
      return (prePowerUseCalc)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeCalc():Double {
    return (preRunHoursInput * (prePowerUseCalc - postPowerUseCalc))
  }
  fun energyTimeChangeCalc():Double {
    return ((preRunHoursInput - postRunHoursInput) * prePowerUseCalc)
  }
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((preRunHoursInput - postRunHoursInput) * (prePowerUseCalc - postPowerUseCalc))
  }
}
