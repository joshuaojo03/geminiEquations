public class OvenEnergyandCosts{

    private static double hoursOnPeakPricingInput = 10;
    private static double hoursOnPartPeakPricingInput = 10;
    private static double hoursOnOffPeakPricingInput = 10;
    private static double peakPriceInput = 10;
    private static double partPeakPriceInput = 10;
    private static double offPeakPriceInput = 10;
    private static double fanEnergyRateInput = 10;
    private static double idleEnergyRateInput = 10;
    private static double preheatEnergyInput = 10;
    private static double daysInOperationInput = 10;
    private static double idealRunHoursInput = 10;
    private static double gasEnergyInput = 10;
    private static double summerRateInput = 10;
    private static double winterRateInput = 10;

     public static void main(String []args){
        System.out.println("Hello World");
        double electricOvenSummer = electricOvenCostsSummer();
        double electricOvenWinter = electricOvenCostsWinter();
        double totalElectricOvenElectricityCosts = electricOvenCostsTotal(electricOvenSummer, electricOvenWinter);
        double electricOvenEnergy = electricOvenEnergyCalc();
        double gasOvenSummer = gasOvenSummerElectricityCosts();
        double gasOvenWinter = gasOvenWinterElectricityCosts();
        double totalGasOvenElectricityCosts = gasOvenTotalElectricityCosts(gasOvenSummer, gasOvenWinter);
        double gasOvenGasCosts = gasOvenGasCostCalc();
        double gasOvenTotalCosts = gasOvenTotalCosts(totalGasOvenElectricityCosts, gasOvenGasCosts);
        double gasOvenEnergy = gasOvenEnergyCalc();
        System.out.println(electricOvenWinter);
        System.out.println(totalElectricOvenElectricityCosts);
        System.out.println(electricOvenEnergy);
        System.out.println("gas costs" + gasOvenTotalCosts);
        System.out.println("gas energy" + gasOvenEnergy);

     }

     public static double electricOvenCostsSummer() {
        return((hoursOnPeakPricingInput*(fanEnergyRateInput + idleEnergyRateInput) * peakPriceInput) + (hoursOnPartPeakPricingInput*(fanEnergyRateInput + idleEnergyRateInput) * partPeakPriceInput) + (hoursOnOffPeakPricingInput*(fanEnergyRateInput + idleEnergyRateInput) * offPeakPriceInput)
        );
     }

      public static double electricOvenCostsWinter() {
        return((hoursOnPartPeakPricingInput*(fanEnergyRateInput + idleEnergyRateInput) * partPeakPriceInput) + (hoursOnOffPeakPricingInput*(fanEnergyRateInput + idleEnergyRateInput) * offPeakPriceInput)
        );
     }

      public static double electricOvenCostsTotal(double electricOvenSummer, double electricOvenWinter) {
          return (electricOvenSummer + electricOvenWinter);
     }

     public static double electricOvenEnergyCalc() {
         return (((preheatEnergyInput * daysInOperationInput)/4) + (idealRunHoursInput *(fanEnergyRateInput + idleEnergyRateInput)));
     }

      public static double gasOvenSummerElectricityCosts() {
          return((hoursOnPeakPricingInput*fanEnergyRateInput * peakPriceInput) + (hoursOnPartPeakPricingInput*fanEnergyRateInput * partPeakPriceInput) + (hoursOnOffPeakPricingInput*fanEnergyRateInput* offPeakPriceInput));
     }

      public static double gasOvenWinterElectricityCosts() {
        return((hoursOnPartPeakPricingInput*fanEnergyRateInput * partPeakPriceInput) + (hoursOnOffPeakPricingInput*fanEnergyRateInput* offPeakPriceInput));
     }

      public static double gasOvenTotalElectricityCosts(double gasOvenSummer, double gasOvenWinter) {
         return (gasOvenSummer + gasOvenWinter);
     }

      public static double gasOvenGasCostCalc() {
        return ((gasEnergyInput/99976.1) * ((winterRateInput + summerRateInput)*0.5));
     }

      public static double gasOvenTotalCosts(double totalGasOvenElectricityCosts, double gasOvenGasCosts) {
        return (totalGasOvenElectricityCosts + gasOvenGasCosts);
     }

      public static double gasOvenEnergyCalc() {
        return (((((preheatEnergyInput * daysInOperationInput)/4) + (idealRunHoursInput * idleEnergyRateInput))/3412.142) + (idealRunHoursInput + fanEnergyRateInput));
     }
}
