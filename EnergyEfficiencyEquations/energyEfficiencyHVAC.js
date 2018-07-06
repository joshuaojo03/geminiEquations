object EnegySavingsCaluclationsHVAC {
  //will be manual inputs by the platform; these are essentially placeholders
  private val SEER = 10.0
  private val tonnage = 10.0
  @JvmStatic fun main(args:Array<String>) {
    val savings = (tonnage * 12000) / (SEER / 1000)
    println("savings " + savings)
  }
}
