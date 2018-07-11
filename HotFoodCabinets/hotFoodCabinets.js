public class FridgesAndFreezers{

    private static double hoursOnPeakPricingInput = 10;
    private static double hoursOnPartPeakPricingInput = 10;
    private static double hoursOnOffPeakPricingInput = 10;
    private static double peakPriceInput = 10;
    private static double partPeakPriceInput = 10;
    private static double offPeakPriceInput = 10;
    private static double idealRunHoursInput = 10;
    private static double idleEnergyRateInput = 10;
    private static double cabinetVolumeInput = 10;

     public static void main(String []args){
        double energyUse = (cabinetVolumeInput * idleEnergyRateInput)/1000;
        double electricityCostsSummer = electricityCostsSummerCalc(energyUse);
        double electricityCostsWinter = electricityCostsWinterCalc(energyUse);
        double totalElectricityCosts = electricityCostsTotal(electricityCostsSummer, electricityCostsWinter);
        double energyUseTotal = energyCalc(energyUse);
        System.out.println(energyUseTotal);
        System.out.println(totalElectricityCosts);
     }

     public static double electricityCostsSummerCalc(double energyUse) {
        return((hoursOnPeakPricingInput*energyUse * peakPriceInput) + (hoursOnPartPeakPricingInput*energyUse * partPeakPriceInput) + (hoursOnOffPeakPricingInput*energyUse * offPeakPriceInput)
        );
     }

      public static double electricityCostsWinterCalc(double energyUse) {
        return((hoursOnPartPeakPricingInput*energyUse * partPeakPriceInput) + (hoursOnOffPeakPricingInput* energyUse * offPeakPriceInput)
        );
     }

      public static double electricityCostsTotal(double electricityCostsSummer, double electricityCostsWinter) {
          return (electricityCostsSummer + electricityCostsWinter);
     }

     public static double energyCalc(double energyUse) {
         return (idealRunHoursInput * energyUse);
     }

}
