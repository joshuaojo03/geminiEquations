object AdditionalFunctions {
  // //Each of the functions in this class should be viewed as independent. The main method is busy just to
  // show how the functions are supposed to work. But every placeholder is a value that should be calculated by another function.
  // It is a placeholder here just to show what is supposed to actually be passed into these functions. But they should be removed from the
  // main method, and calculated independently so that these functions can properly be called by the platform.
  //I need to double check the maintenance costs/equipment costs, and finish writing the energy equations for the devices; need to check if the device equations
  //calculate the change in energy usage or if they calculate the individual energy usage
  //inputs for time in the equations; These values are taken from a database that has the prices within them; Here they are placeholders
  private val preHoursOnPeakPricingInput = 10.0
  private val preHoursOnPartPeakPricingInput = 10.0
  private val preHoursOnOffPeakPricingInput = 10.0
  private val postHoursOnPeakPricingInput = 10.0
  private val postHoursOnPartPeakPricingInput = 10.0
  private val postHoursOnOffPeakPricingInput = 10.0
  //inputs for pricing in the equations; These values are taken from a database that has the prices within them; Here they are placeholders
  private val peakPriceCall = 10.0
  private val partpeakPriceCall = 10.0
  private val offpeakPriceCall = 10.0
  private val winterRateInput = 10.0
  private val summerRateInput = 10.0
  //These values are called from the excel database
  private val materialsCostCall = 100.0
  private val laborCostsCall = 100.0
  //calculated from other class; these placeholders will be calculations from other classes. They are placeholders now
  //because I am not super comfortable creating different classes and calling these functions from different classes.
  private val implementationCostsCalc = 100.0
  private val totalEnergyCostSavingsPlaceholderYearsCalc = 2.0
  private val maintenanceCostSavingsCalc = 8.0
  private val otherEquipmentSavingsCalc = 9.0
  //This value is called from a database and is dependent on the specific device
  private val incentivesCall = 10.0
  //This value is input manually
  private val hoursOfOperationInput = 10.0
  //This is a call from a database
  private val blendedRate = 10.0
  //This value determines what the type of rate schedule to use; Right now it is a string check, but a more sophisticated check could be required
  private val getRateSchedule = "TOU"
  //this is a check for appliances to see if they also have gas components
  private val checkForGas = true
  //right here energy use will serve as a placeholder, but in general it will be a value derived from each individual device/retrofit
  // val energyUse = energyCalc(); this energyCalc() formula is device specific and is included in the different classes for devices
  private val energyUse = 10.0
  //checking for which input variable is changed regarding the time of use, will either be power, time, or both
  //These values determine which equation to use to determine the
  private val powerChangeCheck = true
  private val timeChangeCheck = true
  private val bothPowerAndTimeCheck = true
  private val multiplePowerCheck = true
  private val multipleTimeCheck = true
  private val bothMultiplePowerandTimeCheck = true
  //You have to get the rate schedule and determine whether or not it is a TOU rate schedule or a non-TOU rate schedule
  //The powerValue is returned from every device; for the power change and bothPowerAndTime change, the power value represents
  // the change in power. For the time change, the powerValue represents the prePower value
  @JvmStatic fun main(args:Array<String>) {
    //This array is essentially a placeholder; The array is called from the specific device questions
    val powerValues = DoubleArray(3)
    powerValues[0] = 1.0
    powerValues[1] = 2.0
    powerValues[2] = 3.0
    val powerValue = 10.0
    val energyCostSavings = 10.0
    val gasCostsSavings = 10.0
    System.out.println(Arrays.toString(powerValues))
    if (getRateSchedule === "TOU")
    {
      if (multiplePowerCheck == true)
      {
        val electricityCostsSummer = electricityCostsSummerCalcMultiplePowerChange(powerValues)
        val electricityCostsWinter = electricityCostsWinterCalcMultiplePowerChange(powerValues)
        energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
      }
      else if (multipleTimeCheck == true)
      {
        //the powervalues that are taken from the device should be for time change
        val electricityCostsSummer = electricityCostsSummerCalcMultipleTimeChange(powerValues)
        val electricityCostsWinter = electricityCostsWinterCalcMultipleTimeChange(powerValues)
        energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
      }
      else if (bothMultiplePowerandTimeCheck == true)
      {
        //the powervalues that are taken from the device should be for time change
        val electricityCostsSummer = electricityCostsSummerCalcMultipleTimeChange(powerValues)
        val electricityCostsWinter = electricityCostsWinterCalcMultipleTimeChange(powerValues)
        energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
      }
      else if (powerChangeCheck == true)
      {
        val electricityCostsSummer = electricityCostsSummerCalcPowerChange(powerValue)
        val electricityCostsWinter = electricityCostsWinterCalcPowerChange(powerValue)
        energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
      }
      else if (timeChangeCheck == true)
      {
        //the powervalues that are taken from the device should be for time change
        val electricityCostsSummer = electricityCostsSummerCalcTimeChange(powerValue)
        val electricityCostsWinter = electricityCostsWinterCalcTimeChange(powerValue)
        energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
      }
      else if (bothPowerAndTimeCheck == true)
      {
        //the powervalues that are taken from the device should be for time change
        val electricityCostsSummer = electricityCostsSummerCalcTimeChange(powerValue)
        val electricityCostsWinter = electricityCostsWinterCalcTimeChange(powerValue)
        energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
      }
    }
    else if (getRateSchedule === "NonTOU")
    {
      energyCostSavings = findNonTOUCostSavings(energyUse)
    }
    else if (checkForGas == true)
    {
      energyCostSavings = gasCostSavings(energyUse)
    }
    else
    {
      energyCostSavings = 0.0
      gasCostsSavings = 0.0
    }
    val demandCostSavings = demandCostSavingsYearCalc(energyCostSavings, hoursOfOperationInput)
    val implementationCosts = implementationCosts(materialsCostCall, laborCostsCall, incentivesCall)
    val totalCostSaved = totalCostSavedCalc(energyCostSavings, maintenanceCostSavingsCalc, otherEquipmentSavingsCalc, demandCostSavings, gasCostsSavings)
    val paybackPeriodMonths = calculatePaybackPeriodMonths(totalCostSaved, implementationCostsCalc)
    val paybackPeriodYears = calculatePaybackPeriodYears(totalCostSaved, implementationCostsCalc)
  }
  fun implementationCosts(materialsCostCall:Double, laborCostsCall:Double, incentivesCall:Double):Double {
    return ((materialsCostCall + laborCostsCall) - incentivesCall)
  }
  fun calculatePaybackPeriodMonths(totalCostSaved:Double, implementationCosts:Double):Double {
    return ((implementationCosts / totalCostSaved) / 12)
  }
  fun calculatePaybackPeriodYears(totalCostSaved:Double, implementationCosts:Double):Double {
    return (implementationCosts / totalCostSaved)
  }
  fun totalCostSavedCalc(energyCostSavings:Double, maintenanceCostSavingsCalc:Double,
                         otherEquipmentCostSavings:Double, demandCostSavings:Double, gasCostsSavings:Double):Double {
    return (energyCostSavings + maintenanceCostSavingsCalc + otherEquipmentCostSavings + demandCostSavings)
  }
  fun demandCostSavingsYearCalc(energyCostSavings:Double, hoursOfOperationInput:Double):Double {
    return (energyCostSavings / hoursOfOperationInput)
  }
  //this power value will be returned from the equations for each device; The equations used are checked within the if-statement in the main function
  fun electricityCostsSummerCalcPowerChange(powerValue:Double):Double {
    return (((preHoursOnPeakPricingInput * powerValue * peakPriceCall) + (preHoursOnPartPeakPricingInput * powerValue * partpeakPriceCall)
             + (preHoursOnOffPeakPricingInput * powerValue * offpeakPriceCall)))
  }
  fun electricityCostsWinterCalcPowerChange(powerValue:Double):Double {
    return ((preHoursOnPartPeakPricingInput * powerValue * partpeakPriceCall) + (preHoursOnOffPeakPricingInput * powerValue * offpeakPriceCall))
  }
  fun electricityCostsSummerCalcTimeChange(powerValue:Double):Double {
    return ((((preHoursOnPeakPricingInput - postHoursOnPeakPricingInput) * powerValue * peakPriceCall) + (((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput)
                                                                                                           * powerValue * partpeakPriceCall)) + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValue * offpeakPriceCall)))
  }
  fun electricityCostsWinterCalcTimeChange(powerValue:Double):Double {
    return ((((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput) * powerValue * partpeakPriceCall) + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValue * offpeakPriceCall)))
  }
  fun findTOUCostSavings(electricityCostsSummer:Double, electricityCostsWinter:Double):Double {
    return (electricityCostsSummer + electricityCostsWinter)
  }
  fun findNonTOUCostSavings(energyUse:Double):Double {
    return (((energyUse / 2) * summerRateInput) + ((energyUse / 2) * winterRateInput))
  }
  fun gasCostSavings(energyUse:Double):Double {
    return (((energyUse) / 99976.1) * ((winterRateInput + summerRateInput) / 2))
  }
  //this is the equation for appliances where there is a days in operation value, as opposed to just timed hourly values. (pre-rinse sprays, water heaters,dishwashers, etc).
  //There is no real way for us to know when at what specific times a business is using their pre-rinses, dishwashers, water heaters, etc, but we do know how many hours they
  //are using them each day. So from this value we can get a total "days in operation" that we can use in the formula.
  //The blendedRate is a value from the database.
  fun blendedRateCalc(energyUse:Double):Double {
    return (energyUse * blendedRate)
  }
  //This is the cost equation for televisions and other future appliances that function similarly
  //There will be an if-statement checking for these values
  //make for loops, fix bugs, and comment
  fun electricityCostsSummerCalcMultiplePowerChange(powerValues:DoubleArray):Double {
    val electricitySummerCostsMultiplePowerChangeCalc = 0.0
    for (i in powerValues.indices)
    {
      println(powerValues)
      electricitySummerCostsMultiplePowerChangeCalc += (((preHoursOnPeakPricingInput * (powerValues[i].toDouble()) * peakPriceCall)
                                                         + (preHoursOnPartPeakPricingInput * (powerValues[i].toDouble()) * partpeakPriceCall)
                                                         + (preHoursOnOffPeakPricingInput * (powerValues[i].toDouble()) * offpeakPriceCall)))
    }
    return (electricitySummerCostsMultiplePowerChangeCalc)
  }
  fun electricityCostsWinterCalcMultiplePowerChange(powerValues:DoubleArray):Double {
    val electricityWinterCostsMultiplePowerChangeCalc = 0.0
    for (i in powerValues.indices)
    {
      println(powerValues)
      electricityWinterCostsMultiplePowerChangeCalc += (((preHoursOnPartPeakPricingInput * powerValues[i] * partpeakPriceCall) + (preHoursOnOffPeakPricingInput * powerValues[i] * offpeakPriceCall)))
    }
    return (electricityWinterCostsMultiplePowerChangeCalc)
  }
  fun electricityCostsSummerCalcMultipleTimeChange(powerValues:DoubleArray):Double {
    val electricitySummerCostsMultipleTimeChangeCalc = 0.0
    for (i in powerValues.indices)
    {
      println(powerValues)
      electricitySummerCostsMultipleTimeChangeCalc += ((((preHoursOnPeakPricingInput - postHoursOnPeakPricingInput) * powerValues[i] * peakPriceCall) + (((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput)
* powerValues[i] * partpeakPriceCall)) + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValues[i] * offpeakPriceCall)))
    }
    return (electricitySummerCostsMultipleTimeChangeCalc)
  }
  fun electricityCostsWinterCalcMultipleTimeChange(powerValues:DoubleArray):Double {
    val electricityWinterCostsMultipleTimeChangeCalc = 0.0
    println(powerValues)
    for (i in powerValues.indices)
    {
      electricityWinterCostsMultipleTimeChangeCalc += ((((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput) * powerValues[i] * partpeakPriceCall) + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValues[i] * offpeakPriceCall)))
    }
    return (electricityWinterCostsMultipleTimeChangeCalc)
  }
}
