object PreRinseSprays {
  /*Time Values*/
  //Hourly: These values will be manually input (for now)
  private val preTotalHoursUsedInput = 10.0
  private val postTotalHoursUsedInput = 10.0
  //Calculated using above values
  private val preDaysInOperationCalc = preTotalHoursUsedInput / 24
  private val postDaysInOperationCalc = postTotalHoursUsedInput / 24
  //Flow: The pre value will be input, the post will be called from a database
  private val preFlowRateInput = 10.0
  private val postFlowRateCall = 5.0
  //Efficency: The pre value will be input, the post will be called
  private val preEfficiencyInput = 10.0
  private val postEfficiencyCall = 10.0
  //This value serves as a placeholder and will be changed throughout the class
  private val energySavings:Double = 0.toDouble()
  //this is a placeholder; there should be an option to select whether or not it is a gas appliance
  private val gasAppliance = true
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true.
  private val timeChange = true
  //These values will be filled within the rest of the class, but serve as placeholders here.
  //They will be calculated depending on whether or not they are a gas or an electric appliance
  private val energyPowerChange:Double = 0.toDouble()
  private val energyTimeChange:Double = 0.toDouble()
  @JvmStatic fun main(args:Array<String>) {
    //check to see if it is a gas appliance
    if (gasAppliance == true)
    {
      energyPowerChange = energyPowerChangeGasCalc()
      energyTimeChange = energyTimeChangeGasCalc()
    }
    else
    {
      energyPowerChange = energyPowerChangeElectricCalc()
      energyTimeChange = energyTimeChangeElectricCalc()
    }
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
      if (gasAppliance == true)
      {
        energySavings = energyGasCalcTotal(energyPowerChange, energyTimeChange)
      }
      else
      {
        energySavings = energyElectricCalcTotal(energyPowerChange, energyTimeChange)
      }
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
  fun powerValueCalc():Double {
    if (timeChange == false && gasAppliance == true)
    {
      return (((preFlowRateInput - postFlowRateCall) * 60) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
    }
    else if (timeChange == true && gasAppliance == true)
    {
      return (preFlowRateInput * 60.0 * 8.34 * (110 / 99976.1) * postEfficiencyCall)
    }
    else if (timeChange == false && gasAppliance == false)
    {
      return (((preFlowRateInput - postFlowRateCall) * 60) * 8.34 * (110 / 3412.14) * postEfficiencyCall)
    }
    else
    {
      return (preFlowRateInput * 60.0 * 8.34 * (110 / 3412.14) * postEfficiencyCall)
    }
  }
  //these equations are used to calculate the savings in energy
  fun energyPowerChangeGasCalc():Double {
    return (((preFlowRateInput - postFlowRateCall) * 60.0 * preDaysInOperationCalc) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
  }
  fun energyPowerChangeElectricCalc():Double {
    return (((preFlowRateInput - postFlowRateCall) * 60.0 * preDaysInOperationCalc) * 8.34 * (110 / 3412.14) * postEfficiencyCall)
  }
  fun energyTimeChangeGasCalc():Double {
    return (preFlowRateInput * 60.0 * (preDaysInOperationCalc - postDaysInOperationCalc) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
  }
  fun energyTimeChangeElectricCalc():Double {
    return (preFlowRateInput * 60.0 * (preDaysInOperationCalc - postDaysInOperationCalc) * 8.34 * (110 / 3412.14) * postEfficiencyCall)
  }
  fun energyElectricCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return (((preFlowRateInput - postFlowRateCall) * 60.0 * (preDaysInOperationCalc - postDaysInOperationCalc)) * 8.34 * (110 / 3412.14) * postEfficiencyCall)
  }
  fun energyGasCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return (((preFlowRateInput - postFlowRateCall) * 60.0 * (preDaysInOperationCalc - postDaysInOperationCalc)) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
  }
}
