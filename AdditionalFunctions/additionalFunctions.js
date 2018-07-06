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
    val totalEnergyCostSavingsPlaceholderMonths = 8.0
    val totalEnergyCostSavingsPlaceholderYears = 2.0
    val electricalCostSavings = 9.0
    val maintenanceCostSavings = 8.0
    val otherEquipmentSavings = 9.0
    val costOfUpgrade = costOfUpgrade(materialsCost, laborCosts)
    val tecs = totalEnergyCostSaved(electricalCostSavings, maintenanceCostSavings, otherEquipmentSavings)
    val paybackPeriodMonths = calculatePaybackPeriodMonths(totalEnergyCostSavingsPlaceholderMonths, costOfUpgradePlaceholder)
    val paybackPeriodYears = calculatePaybackPeriodYears(totalEnergyCostSavingsPlaceholderYears, costOfUpgradePlaceholder)
  }
  private fun costOfUpgrade(materialsCost:Double, laborCosts:Double):Double {
    return (materialsCost + laborCosts)
  }
  private fun calculatePaybackPeriodMonths(totalEnergyCostSavingsPlaceholderMonths:Double, costOfUpgradePlaceholder:Double):Double {
    return (costOfUpgradePlaceholder / totalEnergyCostSavingsPlaceholderMonths)
  }
  private fun calculatePaybackPeriodYears(totalEnergyCostSavingsPlaceholderYears:Double, costOfUpgradePlaceholder:Double):Double {
    return (costOfUpgradePlaceholder / totalEnergyCostSavingsPlaceholderYears)
  }
  private fun totalEnergyCostSaved(electricalCostSavings:Double, maintenanceCostSavings:Double, otherEquipmentCostSavings:Double):Double {
    return (electricalCostSavings + maintenanceCostSavings + otherEquipmentCostSavings)
  }
}
