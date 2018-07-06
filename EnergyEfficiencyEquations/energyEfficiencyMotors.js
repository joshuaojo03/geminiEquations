object EnegySavingsCaluclationsHVAC {
  //will be manual inputs
  private val motorPower = 100.0
  private val loadFactor = 100.0
  private val annualOperatingTime = 100.0
  private val motorEfficiencyPre = 8.0
  private val motorEfficiencyPost = 9.0
  @JvmStatic fun main(args:Array<String>) {
    val savings = (motorPower * loadFactor * (0.746) * annualOperatingTime * ((100 / motorEfficiencyPre) - (100 / motorEfficiencyPost)))
    println("savings " + savings)
  }
}
