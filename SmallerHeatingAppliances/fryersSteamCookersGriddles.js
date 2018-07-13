public class fryersSteamCookersGriddles{

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
    private static double daysInOperationCalculate = 365;
    private static double winterRateInput = 10;
    private static double summerRateInput = 10;


     public static void main(String []args) {
       double energyPowerChange = energyPowerChangeCalc();
       double energyTimeChange = energyTimeChangeCalc();
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


     public static double energyPowerChangeCalc() {
         return (((prePreheatEnergyInput - postPreheatEnergyInput) * daysInOperationCalculate) + (preIdealRunHoursInput * (preIdleEnergyRateInput - postIdleEnergyRateInput)));
     }

      public static double energyTimeChangeCalc() {
          return ((prePreheatEnergyInput) * daysInOperationCalculate + ((preIdealRunHoursInput - postIdealRunHoursInput) * preIdleEnergyRateInput));
      }

      public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
          return (energyCalcPowerChange * energyCalcTimeChange);
      }

}
