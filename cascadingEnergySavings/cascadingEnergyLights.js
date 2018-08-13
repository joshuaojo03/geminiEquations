object CascadingEnegySavingsLights {

  //manual inputs
  private var lampsPerFixture = 1
  private var numFixtures = 1

  //manual inputs?
  private var percentHoursReduced = 1.0
  private var lifeHours = 1
  private var cooling = 1.0

//Energy: pre will be a manual input, post will be called from a database
  private var currentEnergyUseInput = 1.0
  private var postEnergyUseCall = 0.5

  //SEER: This will be a manual input (for now)
  private var SEERInput = 10

  @JvmStatic fun main(args:Array<String>) {
    println("Hello World")
    var savings = 5
    var lampType = "Halogen"
    println("lampType " + lampType)
    println("lampsPerFixture " + lampsPerFixture)
    selectLamp(lampType)
    println("lifehours " + lifeHours)
    var maintenanceSavings = maintenanceSavingsCalculation()
    var coolingSavings = coolingSavingsCalculation()
    var energySavings = energySavingsCalculation()
    var savingsCascade = maintenanceSavings + coolingSavings + energySavings
    println("savings post " + savingsCascade)
  }

  //The remaining functions will be used as values within the additional functions class
  fun maintenanceSavingsCalculation():Double {
    var savings = (lampsPerFixture.toDouble() * numFixtures.toDouble() * 3.0 * (usagespecific.yearly() / lifeHours).toDouble())
    return savings
  }

  fun coolingSavingsCalculation():Double {
    var savings = currentEnergyUseInput * cooling * SEERInput.toDouble()
    return savings
  }

  fun energySavingsCalculation():Double {
    var savings = currentEnergyUseInput - postEnergyUseCall
    return savings
  }

  fun selectLamp(lampType:String) {
    if (lampType == "Halogen")
    {
      lifeHours = 5000
      cooling = 0.95
      println("Halogen")
    }
    else if (lampType == "CFL")
    {
      lifeHours = 15000
      cooling = 0.8
      println("CFL")
    }
    else if (lampType == "Linear Fluorescent")
    {
      lifeHours = 10000
      cooling = 0.85
      println("Linear Fluorescent")
    }
    else if (lampType == "Incandescent")
    {
      lifeHours = 2500
      cooling = 0.9
      println("Incandescent")
    }
  }
}
