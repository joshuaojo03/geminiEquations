object AdditionalFunctions {
  // //Each of the functions in this class should be viewed as independent. The main method is busy just to
  // show how the functions are supposed to work. But every placeholder is a value that should be calculated by another function.
  // It is a placeholder here just to show what is supposed to actually be passed into these functions. But they should be removed from the
  // main method, and calculated independently so that these functions can properly be called by the platform.

  //I need to double check the maintenance costs/equipment costs, and finish writing the energy equations for the devices; need to check if the device equations
  //calculate the change in energy usage or if they calculate the individual energy usage


   private val hoursOnPeakPricingInput = 10.0
   private val hoursOnPartPeakPricingInput = 10.0
   private val hoursOnOffPeakPricingInput = 10.0
   private val peakPriceInput = 10.0
   private val partPeakPriceInput = 10.0
   private val offPeakPriceInput = 10.0
   private val idealRunHoursInput = 10.0
   private val idleEnergyRateInput = 10.0
   private val preheatEnergyInput = 10.0
   private val daysInOperationInput = 365.0
   private val winterRateInput = 10.0
   private val summerRateInput = 10.0
   //from excel database
   private val materialsCost = 100.0
   private val laborCosts = 100.0
   //calculated from other class; these placeholders will be calculations from other classes. They are placeholders now
   //because I am not super comfortable creating different classes and calling these functions from different classes.
   private val implementationCostsPlaceholder = 100.0
   private val totalEnergyCostSavingsPlaceholderYears = 2.0
   private val maintenanceCostSavings = 8.0
   private val otherEquipmentSavings = 9.0
   private val incentivesPlaceholder = 10.0
   private val preEnergyPlaceholder = 10.0
   private val postEnergyPlaceholder = 5.0
   private val dollarsPerKWHPlaceholder = 1.0
   private val dollarsPerKWPlaceholder = 1.0
   private val powerPlaceholder = 11.0
   private val hoursOfOperationInput = 10.0

  @JvmStatic fun main(args:Array<String>) {

    //this will be something Binay gets. It is a string check right now.
    val getRateSchedule = "TOU"
    //this is a check for appliances to see if they also have gas components
    val checkForGas = true

    //right here energy use will serve as a placeholder, but in general it will be a value derived from each individual device/retrofit
    // val energyUse = energyCalc(); this energyCalc() formula is device specific and is included in the different classes for devices
    val energyUse:Double = 10;
    val energyCostSavings:Double
    val gasCostsSavings:Double

    //checking for which input variable is changed regarding the time of use, will either be power, time, or both
    val powerChangeCheck = true
    val timeChangeCheck = true
    val bothPowerAndTimeCheck = true

    //You have to get the rate schedule and determine whether or not it is a TOU rate schedule or a non-TOU rate schedule
    if (getRateSchedule == "TOU") {
        if (powerChangeCheck == true) {
            val electricityCostsSummer = electricityCostsSummerCalcPowerChange(energyUse)
            val electricityCostsWinter = electricityCostsWinterCalcPowerChange(energyUse)
            energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
          } else if (timeChangeCheck == true) {
            val electricityCostsSummer = electricityCostsSummerCalcTimeChange(energyUse)
            val electricityCostsWinter = electricityCostsWinterCalcTimeChange(energyUse)
            energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
          } else {
            val electricityCostsSummer = electricityCostsSummerCalcBothChange(energyUse)
            val electricityCostsWinter = electricityCostsWinterCalcBothChange(energyUse)
            energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter)
          }
      } else if (getRateSchedule == "NonTOU") {
        energyCostSavings = findNonTOUCostSavings(energyUse)
      } else if (checkForGas == true) {
        energyCostSavings = gasCostSavings(energyUse)
      }


    val demandCostSavings = demandSavingsYearCalc(energyCostSavings, hoursOfOperationInput)
    // val costSavingsEnergyYear = costSavingsEnergyYearCalc(preEnergyPlaceholder, postEnergyPlaceholder, dollarsPerKWHPlaceholder)
    // val costSavingsEnergyMonths = costSavingsEnergyMonthsCalc(preEnergyPlaceholder, postEnergyPlaceholder, dollarsPerKWHPlaceholder)
    val implementationCosts = implementationCosts(materialsCost, laborCosts, incentivesPlaceholder)
    val totalCostSaved = totalCostSavedCalc(energyCostSavings, maintenanceCostSavings, otherEquipmentSavings, demandCostSavings, gasCostsSavings)
    val paybackPeriodMonths = calculatePaybackPeriodMonths(totalCostSaved, implementationCostsPlaceholder)
    val paybackPeriodYears = calculatePaybackPeriodYears(totalCostSaved, implementationCostsPlaceholder)
  }


    private fun implementationCosts(materialsCost:Double, laborCosts:Double, incentivesPlaceholder:Double):Double {
      return ((materialsCost + laborCosts) - incentivesPlaceholder)
    }
    private fun calculatePaybackPeriodMonths(totalCostSaved:Double, implementationCosts:Double):Double {
      return ((implementationCosts / totalCostSaved)/12)
    }
    private fun calculatePaybackPeriodYears(totalCostSaved:Double, implementationCosts:Double):Double {
      return (implementationCosts / totalCostSaved)
    }

    private fun totalCostSavedCalc(energyCostSavings:Double, maintenanceCostSavings:Double, otherEquipmentCostSavings:Double, demandSavings:Double, gasCostsSavings:Double):Double {
      return (energyCostSavings + maintenanceCostSavings + otherEquipmentCostSavings + demandCostSavings)
    }

    //might have to return electrical costs from each device separately and plug into equation, rather than plugging in directly here
    // private fun energyCostSavingsCalc(costSavingsEnergyYear:Double):Double {
    //   return (costSavingsEnergyYear)
    // }
    // private fun costSavingsEnergyYearCalc(preEnergyPlaceholder:Double, postEnergyPlaceholder:Double, dollarsPerKWHPlaceholder:Double):Double {
    //   return (((preEnergyPlaceholder - postEnergyPlaceholder) * dollarsPerKWHPlaceholder))
    // }
    // private fun costSavingsEnergyMonthsCalc(preEnergyPlaceholder:Double, postEnergyPlaceholder:Double, dollarsPerKWHPlaceholder:Double):Double {
    //   return (((preEnergyPlaceholder - postEnergyPlaceholder) * dollarsPerKWHPlaceholder)/12)
    // }
    private fun demandCostSavingsYearCalc(energyCostSavings:Double, hoursOfOperationInput:Double):Double {
      return (energyCostSavings / hoursOfOperationInput)
    }

  private fun electricityCostsSummerCalcPowerChange(energyUse:Double):Double {
   return ((hoursOnPeakPricingInput * energyUse * peakPriceInput) + (hoursOnPartPeakPricingInput * energyUse * partPeakPriceInput)
    + (hoursOnOffPeakPricingInput * energyUse * offPeakPriceInput))
   }
   private fun electricityCostsWinterCalcPowerChange(energyUse:Double):Double {
     return ((hoursOnPartPeakPricingInput * energyUse * partPeakPriceInput) + (hoursOnOffPeakPricingInput * energyUse * offPeakPriceInput))
   }

   private fun electricityCostsSummerCalcTimeChange(energyUse:Double):Double {
    return ((hoursOnPeakPricingInput * energyUse * peakPriceInput) + (hoursOnPartPeakPricingInput * energyUse * partPeakPriceInput)
     + (hoursOnOffPeakPricingInput * energyUse * offPeakPriceInput))
    }
    private fun electricityCostsWinterCalcTimeChange(energyUse:Double):Double {
      return ((hoursOnPartPeakPricingInput * energyUse * partPeakPriceInput) + (hoursOnOffPeakPricingInput * energyUse * offPeakPriceInput))
    }

    private fun electricityCostsSummerCalcBothChange(energyUse:Double):Double {
     return ((hoursOnPeakPricingInput * energyUse * peakPriceInput) + (hoursOnPartPeakPricingInput * energyUse * partPeakPriceInput)
      + (hoursOnOffPeakPricingInput * energyUse * offPeakPriceInput))
     }
     private fun electricityCostsWinterCalcBothChange(energyUse:Double):Double {
       return ((hoursOnPartPeakPricingInput * energyUse * partPeakPriceInput) + (hoursOnOffPeakPricingInput * energyUse * offPeakPriceInput))
     }

   private fun findTOUCostSavings(electricityCostsSummer:Double, electricityCostsWinter:Double):Double {
     return (electricityCostsSummer + electricityCostsWinter)
   }
   private fun findNonTOUCostSavings(energyUse:Double):Double {
    return (((energyUse / 2) * summerRateInput) + ((energyUse / 2) * winterRateInput))
  }

  public static double gasCostSavings(energyUse:Double):Double {
  return (((energyUse)/99976.1) * ((winterRateInput + summerRateInput)/2))
}

  // #costSavingsEnergy for month and year
  // #costSavingsDemand for year(6 months)

}
