object WaterHeatersDishwashers {
  /*Time Values*/
  //Will be manual inputs (for now)
  private var preDaysInOperationInput = 10.0
  private var postDaysInOperationInput = 5.0
  private var preRunHoursInput = 10.0
  private var postRunHoursInput = 5.0
  //Water Consumption: pre will be manual input, post will be called
  private var preWaterConsumptionInput = 10.0
  private var postWaterConsumptionCall = 10.0
  //Efficency: pre will be manual input, post will be called
  private var preEfficiencyInput = 10.0
  private var postEfficiencyCall = 10.0
  //Efficency: pre will be manual input, post will be called
  private var preIdleEnergyRateInput = 10.0
  private var postIdleEnergyRateCall = 10.0
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true.
  private var timeChange = true
  //This value serves as a placeholder and will be changed throughout the class
  private var energySavings:Double = 0.toDouble()
  //this is a placeholder; there should be an option to select whether or not it is a gas appliance
  private var gasAppliance = true
  //These values will be filled within the rest of the class, but serve as placeholders here.
  //They will be calculated depending on whether or not they are a gas or an electric appliance
  private var energyPowerChange:Double = 0.toDouble()
  private var energyTimeChange:Double = 0.toDouble()
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
      return (((preWaterConsumptionInput - postWaterConsumptionCall) * 20) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
    }
    else if (timeChange == true && gasAppliance == true)
    {
      return ((preWaterConsumptionInput * 20.0 * 8.34 * (110 / 99976.1) * preEfficiencyInput))
    }
    else if (timeChange == false && gasAppliance == false)
    {
      return (((preIdleEnergyRateInput - postIdleEnergyRateCall) + (20.0 * 8.34 * (110 / 3412.14) * postEfficiencyCall)))
    }
    else
    {
      return ((preIdleEnergyRateInput) + ((preWaterConsumptionInput * 20.0 * 8.34 * (110 / 3412.14) * preEfficiencyInput)))
    }
  }
  fun energyPowerChangeGasCalc():Double {
    return (((preWaterConsumptionInput - postWaterConsumptionCall) * 20.0 * preDaysInOperationInput) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
  }
  fun energyPowerChangeElectricCalc():Double {
    return ((((preIdleEnergyRateInput - postIdleEnergyRateCall) * preRunHoursInput) + (((preWaterConsumptionInput - postWaterConsumptionCall) * 20.0 * preDaysInOperationInput) * 8.34 * (110 / 3412.14) * postEfficiencyCall)))
  }
  fun energyTimeChangeGasCalc():Double {
    return ((preWaterConsumptionInput * 20.0 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110 / 99976.1) * preEfficiencyInput)
  }
  fun energyTimeChangeElectricCalc():Double {
    return (((preIdleEnergyRateInput * (preRunHoursInput - postRunHoursInput)) + ((preWaterConsumptionInput * 20.0 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110 / 3412.14) * preEfficiencyInput)))
  }
  fun energyGasCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return (((preWaterConsumptionInput - postWaterConsumptionCall) * 20.0 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110 / 99976.1) * postEfficiencyCall)
  }
  fun energyElectricCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((((preIdleEnergyRateInput - postIdleEnergyRateCall) * (preRunHoursInput - postRunHoursInput)) + (((preWaterConsumptionInput - postWaterConsumptionCall) * 20.0 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110 / 3412.14) * postEfficiencyCall)))
  }
}
