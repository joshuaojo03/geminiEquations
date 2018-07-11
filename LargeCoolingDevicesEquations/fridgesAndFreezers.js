public class FridgesAndFreezers{

    private static double hoursOnPeakPricingInput = 10;
    private static double hoursOnPartPeakPricingInput = 10;
    private static double hoursOnOffPeakPricingInput = 10;
    private static double peakPriceInput = 10;
    private static double partPeakPriceInput = 10;
    private static double offPeakPriceInput = 10;
    private static double idealRunHoursInput = 10;
    private static double hourlyEnergyUseInput = 10;

     public static void main(String []args){
        System.out.println("Hello World");
        double electricityCostsSummer = electricityCostsSummerCalc();
        double electricityCostsWinter = electricityCostsWinterCalc();
        double totalElectricityCosts = electricityCostsTotal(electricityCostsSummer, electricityCostsWinter);
        double energyUse = energyCalc();
        System.out.println(energyUse);
        System.out.println(totalElectricityCosts);
     }

     public static double electricityCostsSummerCalc() {
        return((hoursOnPeakPricingInput*hourlyEnergyUseInput * peakPriceInput) + (hoursOnPartPeakPricingInput*hourlyEnergyUseInput * partPeakPriceInput) + (hoursOnOffPeakPricingInput*hourlyEnergyUseInput * offPeakPriceInput)
        );
     }

      public static double electricityCostsWinterCalc() {
        return((hoursOnPartPeakPricingInput*hourlyEnergyUseInput * partPeakPriceInput) + (hoursOnOffPeakPricingInput* hourlyEnergyUseInput * offPeakPriceInput)
        );
     }

      public static double electricityCostsTotal(double electricityCostsSummer, double electricityCostsWinter) {
          return (electricityCostsSummer + electricityCostsWinter);
     }

     public static double energyCalc() {
         return (idealRunHoursInput * hourlyEnergyUseInput);
     }

}
