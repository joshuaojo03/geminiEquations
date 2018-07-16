public class PreRinseSprays{

    private static double preTotalHoursUsedInput = 10;
    private static double postTotalHoursUsedInput = 10;
    private static double preDaysInOperationCalc = preTotalHoursUsedInput/24;
    private static double postDaysInOperationCalc = postTotalHoursUsedInput/24;
    private static double preFlowRateInput = 10;
    private static double postFlowRateInput = 5;
    private static double preEfficiencyInput = 10;
    private static double postEfficiencyInput = 10;
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
         energySavings = energyCalcTotal(energyPowerChange, energyTimeChange);
       } else if (energyPowerChange == 0 && energyTimeChange == 0) {
         energySavings = 0;
       }
       //will likely be a return statement
       System.out.println(energySavings);
    }

    //these equations are used to calculate the savings in energy

       public static double energyPowerChangeGasCalc() {
           return (((preFlowRateInput - postFlowRateInput) * 60 * preDaysInOperationCalc) * 8.34 * (110/99976.1) * postEfficiencyInput);
       }

       public static double energyPowerChangeElectricCalc() {
         return (((preFlowRateInput - postFlowRateInput) * 60 * preDaysInOperationCalc) * 8.34 * (110/3412.14) * postEfficiencyInput);
       }

       public static double energyTimeChangeGasCalc() {
         return (preFlowRateInput * 60 * (preDaysInOperationCalc - postDaysInOperationCalc) * 8.34 * (110/99976.1) * postEfficiencyInput);
      }

      public static double energyTimeChangeElectricCalc() {
        return (preFlowRateInput * 60 * (preDaysInOperationCalc - postDaysInOperationCalc) * 8.34 * (110/3412.14) * postEfficiencyInput);
     }

      public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
          return (energyCalcPowerChange * energyCalcTimeChange);
      }

}
