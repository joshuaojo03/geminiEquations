object Ovens {
  /*Time Values*/
  //Hourly Values: these are manual inputs (for now)
  private val preRunHoursInput = 10.0
  private val postRunHoursInput = 5.0
  //Days in Operation: These values are calculated from the earlier values; will double check later
  private val preDaysInOperationCalc = preHourlyEnergyUseInput / 24
  private val postDaysInOperationCalc = postHourlyEnergyUseCall / 24
  /*Energy and Power Values*/
  //The pre-values are manually input (for now) but the post values are called
  private val preHourlyEnergyUseInput = 10.0
  private val postHourlyEnergyUseCall = 5.0
  private val preIdleEnergyRateInput = 10.0
  private val postIdleEnergyRateCall = 5.0
  private val preGasEnergyUseInput = 10.0
  private val postGasEnergyUseCall = 10.0
  private val prePreheatEnergyInput = 10.0
  private val postPreheatEnergyCall = 10.0
  private val preFanEnergyRateInput = 10.0
  private val postFanEnergyRateCall = 10.0
  //This value serves as a placeholder and will be changed throughout the class
  private val energySavings:Double = 0.toDouble()
  //This value is a manual input that is taken from the main class. This input determines if the appliance
  //is a gas appliance. If it is a gas appliacnce, there are different energy/power equations, represented
  //by the various if statements
  private val gasAppliance = true
  //This value should be passed in from the main class. If just the power is being changed, then the value is false.
  //If the time is being changed, or if both the time and power are being changed, this value should be true.
  private val timeChange = true
  //These values will be filled within the rest of the class, but serve as placeholders here.
  //They will be calculated depending on whether or not they are a gas or an electric appliance
  private val energyPowerChangeCalc:Double = 0.toDouble()
  private val energyTimeChangeCalc:Double = 0.toDouble()
  @JvmStatic fun main(args:Array<String>) {
    //check to see if it is a gas or electric appliance
    if (gasAppliance == true)
    {
      energyPowerChangeCalc = energyPowerChangeGasCalc()
      energyTimeChangeCalc = energyTimeChangeGasCalc()
    }
    else
    {
      energyPowerChangeCalc = energyPowerChangeElectricCalc()
      energyTimeChangeCalc = energyTimeChangeElectricCalc()
    }
    if (energyPowerChangeCalc != 0.0 && energyTimeChangeCalc == 0.0)
    {
      energySavings = energyPowerChange
    }
    else if (energyPowerChangeCalc == 0.0 && energyTimeChangeCalc != 0.0)
    {
      energySavings = energyTimeChange
    }
    else if (energyPowerChangeCalc != 0.0 && energyTimeChangeCalc != 0.0)
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
    else if (energyPowerChangeCalc == 0.0 && energyTimeChangeCalc == 0.0)
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
  //These power values are returned in an array; The main class has array functions that account for this
  fun powerValueCalc():DoubleArray {
    if (timeChange == false)
    {
      val powerValues = DoubleArray(2)
      powerValues[0] = (prePreheatEnergyInput - postPreheatEnergyCall)
      powerValues[1] = (preIdleEnergyRateInput - postIdleEnergyRateCall)
      powerValues[2] = (preFanEnergyRateInput - postFanEnergyRateCall)
      return (powerValues)
    }
    else
    {
      val powerValues = DoubleArray(3)
      powerValues[0] = (prePreheatEnergyInput)
      powerValues[1] = (preIdleEnergyRateInput)
      powerValues[2] = (preFanEnergyRateInput)
      return (powerValues)
    }
  }
  //these equations are used to calculate the savings in energy; Different equations depending on whether they are gas or electric
  //Already checked within if statement which equations to use under what circumstances
  fun energyPowerChangeGasCalc():Double {
    return ((((((prePreheatEnergyInput - postPreheatEnergyCall) / 4 * preDaysInOperationCalc) + (preRunHoursInput * (preIdleEnergyRateInput - postIdleEnergyRateCall)) / 3.412)) + (preRunHoursInput * (preFanEnergyRateInput - postFanEnergyRateCall))))
  }
  fun energyPowerChangeElectricCalc():Double {
    return ((((prePreheatEnergyInput - postPreheatEnergyCall) / 4 * preDaysInOperationCalc) + ((preRunHoursInput * ((preIdleEnergyRateInput - postIdleEnergyRateCall) + (preFanEnergyRateInput - postFanEnergyRateCall))))))
  }
  fun energyTimeChangeGasCalc():Double {
    return (((((((prePreheatEnergyInput / 4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + ((preRunHoursInput - postRunHoursInput) * preIdleEnergyRateInput))) / 3.412)) + ((preRunHoursInput - postRunHoursInput) * preFanEnergyRateInput)))
  }
  fun energyTimeChangeElectricCalc():Double {
    return (((prePreheatEnergyInput / 4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + (((preRunHoursInput - postRunHoursInput) * ((preIdleEnergyRateInput - postIdleEnergyRateCall) + (preFanEnergyRateInput - postFanEnergyRateCall))))))
  }
  fun energyElectricCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((((prePreheatEnergyInput - postPreheatEnergyCall) / 4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + (((preRunHoursInput - postRunHoursInput) * ((preIdleEnergyRateInput - postIdleEnergyRateCall) + (preFanEnergyRateInput - postFanEnergyRateCall))))))
  }
  fun energyGasCalcTotal(energyCalcPowerChange:Double, energyCalcTimeChange:Double):Double {
    return ((((((prePreheatEnergyInput - postPreheatEnergyCall) / 4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + ((((preRunHoursInput - postRunHoursInput) * (preIdleEnergyRateInput - postIdleEnergyRateCall))) / 3.412))) + ((preRunHoursInput - postRunHoursInput) * (preFanEnergyRateInput - postFanEnergyRateCall))))
  }
}
