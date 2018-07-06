object CascadingEnegySavingsLights {
  //manual inputs
  private val lampsPerFixture = 1
  private val numFixtures = 1
  private val percentHoursReduced = 1.0
  private val lifeHours = 1
  private val cooling = 1.0
  private val currentEnergyUse = 1.0
  private val postEnergyUse = 0.5
  private val SEER = 10
  @JvmStatic fun main(args:Array<String>) {
    println("Hello World")
    val savings = 5
    val lampType = "Halogen"
    println("lampType " + lampType)
    println("lampsPerFixture " + lampsPerFixture)
    selectLamp(lampType)
    println("lifehours " + lifeHours)
    val maintenanceSavings = maintenanceSavingsCalculation()
    val coolingSavings = coolingSavingsCalculation()
    val energySavings = energySavingsCalculation()
    val savingsCascade = maintenanceSavings + coolingSavings + energySavings
    println("savings post " + savingsCascade)
  }
  fun maintenanceSavingsCalculation():Double {
    val savings = (lampsPerFixture.toDouble() * numFixtures.toDouble() * 3.0 * percentHoursReduced * (8760 / lifeHours).toDouble())
    return savings
  }
  fun coolingSavingsCalculation():Double {
    val savings = currentEnergyUse * cooling * SEER.toDouble()
    return savings
  }
  fun energySavingsCalculation():Double {
    val savings = currentEnergyUse - postEnergyUse
    return savings
  }
  fun selectLamp(lampType:String) {
    if (lampType == "Halogen")
    {
      lifeHours = 5000
      percentHoursReduced = 0.75
      cooling = 0.95
      println("Halogen")
    }
    else if (lampType == "CFL")
    {
      lifeHours = 15000
      percentHoursReduced = 0.25
      cooling = 0.8
      println("CFL")
    }
    else if (lampType == "Linear Fluorescent")
    {
      lifeHours = 10000
      percentHoursReduced = 0.85
      cooling = 0.85
      println("Linear Fluorescent")
    }
    else if (lampType == "Incandescent")
    {
      lifeHours = 2500
      percentHoursReduced = 0.9
      cooling = 0.9
      println("Incandescent")
    }
  }
}
