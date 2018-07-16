public class WaterHeatersDishwashers{

    private static double preDaysInOperationInput = 10;
    private static double postDaysInOperationInput = 5;
    private static double preWaterConsumptionInput = 10;
    private static double postWaterConsumptionInput = 10;
    private static double preRunHoursInput = 10;
    private static double postRunHoursInput = 5;
    private static double preEfficiencyInput = 10;
    private static double postEfficiencyInput = 10;
    private static double preIdleEnergyRateInput = 10;
    private static double postIdleEnergyRateInput = 10;
    private static double energySavings;
    //this is a placeholder; there should be an option to select whether or not it is a gas appliance
    private static boolean gasAppliance = true;
    private static double energyPowerChange;
    private static double energyTimeChange;


     public static void main(String []args) {
       //check to see if it is a gas appliance
       if (gasAppliance == true) {
         energyPowerChange = energyPowerChangeGasCalc();
         energyTimeChange = energyTimeChangeGasCalc();
       } else {
         energyPowerChange = energyPowerChangeElectricCalc();
         energyTimeChange = energyTimeChangeElectricCalc();
       }

       if (energyPowerChange != 0 && energyTimeChange == 0) {
         energySavings = energyPowerChange;
       } else if (energyPowerChange == 0 && energyTimeChange != 0) {
         energySavings = energyTimeChange;
       } else if (energyPowerChange != 0 && energyTimeChange != 0) {
           if (gasAppliance == true) {
           energySavings = energyGasCalcTotal(energyPowerChange, energyTimeChange);
         } else {
           energySavings = energyElectricCalcTotal(energyPowerChange, energyTimeChange);
         }
       } else if (energyPowerChange == 0 && energyTimeChange == 0) {
         energySavings = 0;
       }
       //will likely be a return statement
       System.out.println(energySavings);
    }

       public static double energyPowerChangeGasCalc() {
           return (((preWaterConsumptionInput - postWaterConsumptionInput) * 20 * preDaysInOperationInput) * 8.34 * (110/99976.1) * postEfficiencyInput);
       }

       public static double energyPowerChangeElectricCalc() {
         return (((preIdleEnergyRateInput - postIdleEnergyRateInput) * preRunHoursInput) +
         (((preWaterConsumptionInput - postWaterConsumptionInput) * 20 * preDaysInOperationInput) * 8.34 * (110/3412.14) * postEfficiencyInput));
       }

       public static double energyTimeChangeGasCalc() {
         return ((preWaterConsumptionInput * 20 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110/99976.1) * preEfficiencyInput);
      }

       public static double energyTimeChangeElectricCalc() {
         return ((preIdleEnergyRateInput * (preRunHoursInput - postRunHoursInput)) +
         ((preWaterConsumptionInput * 20 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110/3412.14) * preEfficiencyInput));
      }

      public static double energyGasCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
        return (((preWaterConsumptionInput - postWaterConsumptionInput) * 20 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110/99976.1) * postEfficiencyInput);
      }

      public static double energyElectricCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
        return (((preIdleEnergyRateInput - postIdleEnergyRateInput) * (preRunHoursInput - postRunHoursInput)) +
        (((preWaterConsumptionInput - postWaterConsumptionInput) * 20 * (preDaysInOperationInput - postDaysInOperationInput)) * 8.34 * (110/3412.14) * postEfficiencyInput));
     }

}
