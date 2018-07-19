object Boilers {
  //Time value: These values are input (for now)
  private var preRuntimeInput = 10.0
  private var postRuntimeInput = 5.0
  //Power Values: The pre value is input (for now); the post value is called
  private var prePowerInput = 10.0
  private var postPowerCall = 10.0
  //this serves as a placeholder. This class should reassign the value.
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
      return (prePowerInput - postPowerCall)
    }
    else
    {
      return (prePowerInput)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeCalc():Double {
    return ((preRuntimeInput * 52) * (prePowerInput - postPowerCall))
  }
  fun energyTimeChangeCalc():Double {
    return (((preRuntimeInput - postRuntimeInput) * 52) * prePowerInput)
  }
  fun energyCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return (((preRuntimeInput - postRuntimeInput) * 52) * (prePowerInput - postPowerCall))
  }
}
