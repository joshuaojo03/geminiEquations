object EnegySavingsCaluclationsHVAC {
  //will be manual inputs
  private var motorPower = 100.0
  private var loadFactor = 100.0
  private var annualOperatingTime = 100.0

  //The pre value is an input, the post value will be called from a database
  private var motorEfficiencyPreInput = 8.0
  private var motorEfficiencyPostCall = 9.0

  @JvmStatic fun main(args:Array<String>) {
    var savings = (motorPower * loadFactor * (0.746) * annualOperatingTime * ((100 / motorEfficiencyPreInput) - (100 / motorEfficiencyPostCall)))
    println("savings " + savings)
  }
}
