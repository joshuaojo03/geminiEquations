object AdditionalFunctions {
  // //Each of the functions in this class should be viewed as independent. The main method is busy just to
  // show how the functions are supposed to work. But every placeholder is a value that should be calculated by another function.
  // It is a placeholder here just to show what is supposed to actually be passed into these functions. But they should be removed from the
  // main method, and calculated independently so that these functions can properly be called by the platform.
  @JvmStatic fun main(args:Array<String>) {
    //from excel database
    val materialsCost = 100.0
    val laborCosts = 100.0
    //calculated from other class; these placeholders will be calculations from other classes. They are placeholders now
    //because I am not super comfortable creating different classes and calling these functions from different classes.
    val costOfUpgradePlaceholder = 100.0
    val totalEnergyCostSavingsPlaceholderYears = 2.0
    val maintenanceCostSavings = 8.0
    val otherEquipmentSavings = 9.0
    val incentivesPlaceholder = 10.0;
    val preEnergyPlaceholder = 10.0
    val postEnergyPlaceholder = 5.0
    val dollarsPerKWHPlaceholder = 1.0
    val dollarsPerKWPlaceholder = 1.0
    val powerPlaceholder = 11.0
    val demandSavings = demandSavingsYearCalc(powerPlaceholder, dollarsPerKWPlaceholder)
    val costSavingsEnergyYear = costSavingsEnergyYearCalc(preEnergyPlaceholder, postEnergyPlaceholder, dollarsPerKWHPlaceholder)
    val costSavingsEnergyMonths = costSavingsEnergyMonthsCalc(preEnergyPlaceholder, postEnergyPlaceholder, dollarsPerKWHPlaceholder)
    val electricalCostSavings = electricalCostSavingsCalc(costSavingsEnergyYear, demandSavings)
    val costOfUpgrade = costOfUpgrade(materialsCost, laborCosts, incentivesPlaceholder)
    val totalCostSaved = totalCostSavedCalc(electricalCostSavings, maintenanceCostSavings, otherEquipmentSavings, demandSavings)
    val paybackPeriodMonths = calculatePaybackPeriodMonths(totalEnergyCostSavingsPlaceholderYears, costOfUpgradePlaceholder)
    val paybackPeriodYears = calculatePaybackPeriodYears(totalEnergyCostSavingsPlaceholderYears, costOfUpgradePlaceholder)
  }
  private fun costOfUpgrade(materialsCost:Double, laborCosts:Double, incentivesPlaceholder:Double):Double {
    return ((materialsCost + laborCosts) - incentivesPlaceholder)
  }
  private fun calculatePaybackPeriodMonths(totalCostSaved:Double, costOfUpgrade:Double):Double {
    return ((costOfUpgrade / totalCostSaved)/12)
  }
  private fun calculatePaybackPeriodYears(totalCostSaved:Double, costOfUpgrade:Double):Double {
    return (costOfUpgrade / totalCostSaved)
  }

  //electricalCostSavings will probably be found for each device
  private fun totalCostSavedCalc(electricalCostSavings:Double, maintenanceCostSavings:Double, otherEquipmentCostSavings:Double, demandSavings:Double):Double {
    return (electricalCostSavings + maintenanceCostSavings + otherEquipmentCostSavings + demandSavings)
  }
  //might have to return electrical costs from each device separately and plug into equation, rather than plugging in directly here
  private fun electricalCostSavingsCalc(costSavingsEnergyYear:Double):Double {
    return (costSavingsEnergyYear)
  }
  private fun costSavingsEnergyYearCalc(preEnergyPlaceholder:Double, postEnergyPlaceholder:Double, dollarsPerKWHPlaceholder:Double):Double {
    return (((preEnergyPlaceholder - postEnergyPlaceholder) * dollarsPerKWHPlaceholder))
  }
  private fun costSavingsEnergyMonthsCalc(preEnergyPlaceholder:Double, postEnergyPlaceholder:Double, dollarsPerKWHPlaceholder:Double):Double {
    return (((preEnergyPlaceholder - postEnergyPlaceholder) * dollarsPerKWHPlaceholder)/12)
  }
  private fun demandSavingsYearCalc(powerPlaceholder:Double, dollarsPerKWPlaceholder:Double):Double {
    return ((powerPlaceholder * dollarsPerKWPlaceholder) * 6)
  }

  // #costSavingsEnergy for month and year
  // #costSavingsDemand for year(6 months)

}
