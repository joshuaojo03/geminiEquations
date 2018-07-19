object EnegySavingsCaluclationsHVAC {
  //will be manual inputs by the platform; these are essentially placeholders
  private var SEER = 10.0
  private var tonnage = 10.0
  @JvmStatic fun main(args:Array<String>) {
    var savings = (tonnage * 12000) / (SEER / 1000)
    println("savings " + savings)
  }
}
