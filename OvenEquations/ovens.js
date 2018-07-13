public class Ovens{

    private static double preIdealRunHoursInput = 10;
    private static double postIdealRunHoursInput = 10;
    private static double preIdleEnergyRateInput = 10;
    private static double postIdleEnergyRateInput = 10;
    private static double preGasEnergyUseInput = 10;
    private static double postGasEnergyUseInput = 10;
    private static double hourlyEnergyUseInput = 10;
    private static double energySavings;
    private static double prePreheatEnergyInput = 10;
    private static double postPreheatEnergyInput = 10;
    private static double preFanEnergyRateInput = 10;
    private static double postFanEnergyRateInput = 10;
    private static double daysInOperationInput = 365;
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


     public static double energyPowerChangeGasCalc() {
         return ((((prePreheatEnergyInput - postPreheatEnergyInput)/4 * daysInOperationInput) +
         (preIdealRunHoursInput * (preIdleEnergyRateInput - postIdleEnergyRateInput))/3.412) + (preIdealRunHoursInput * (preFanEnergyRateInput - postFanEnergyRateInput)));
     }

     public static double energyPowerChangeElectricCalc() {
         return (((prePreheatEnergyInput - postPreheatEnergyInput)/4 * daysInOperationInput) + (preIdealRunHoursInput *
           ((preIdleEnergyRateInput - postIdleEnergyRateInput) + (preFanEnergyRateInput - postFanEnergyRateInput))));
     }

      public static double energyTimeChangeGasCalc() {
        return ((((prePreheatEnergyInput/4 * daysInOperationInput) +
        ((preIdealRunHoursInput - postIdealRunHoursInput) * preIdleEnergyRateInput))/3.412) + ((preIdealRunHoursInput - postIdealRunHoursInput) * preFanEnergyRateInput));
     }

      public static double energyTimeChangeElectricCalc() {
        return ((prePreheatEnergyInput/4 * daysInOperationInput) + ((preIdealRunHoursInput - postIdealRunHoursInput) *
          ((preIdleEnergyRateInput - postIdleEnergyRateInput) + (preFanEnergyRateInput - postFanEnergyRateInput))));
      }

      public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
          return (energyCalcPowerChange * energyCalcTimeChange);
      }

}
