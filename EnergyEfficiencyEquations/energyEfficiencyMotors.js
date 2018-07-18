object EnegySavingsCaluclationsHVAC {
  //will be manual inputs
  private val motorPower = 100.0
  private val loadFactor = 100.0
  private val annualOperatingTime = 100.0

  //The pre value is an input, the post value will be called from a database
  private val motorEfficiencyPreInput = 8.0
  private val motorEfficiencyPostCall = 9.0

  @JvmStatic fun main(args:Array<String>) {
    val savings = (motorPower * loadFactor * (0.746) * annualOperatingTime * ((100 / motorEfficiencyPreInput) - (100 / motorEfficiencyPostCall)))
    println("savings " + savings)
  }
}
