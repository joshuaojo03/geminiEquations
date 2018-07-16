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
    private static boolean timeChange = true;



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

  //this is the function that will be called by the platform to determine the energy cost savings. In the main class the value is "powerValue" that is
  //used in the various electricityCosts equations; in this equation there should be a check determining if the powerValue returned is dependent upon
  //the time or not. If it is dependent upon the time, then the powerValue returned will be the preValue. If it is not dependent upon the time, then
  //the power value returned will be the difference between the pre and post values
       public static double powerValueCalc() {
         if (timeChange == false) {
           return ((prePreheatEnergyInput - postPreheatEnergyInput)/8760 + (preIdleEnergyRateInput - postIdleEnergyRateInput));
       } else {
         return ((prePreheatEnergyInput)/8760) + (preIdleEnergyRateInput);
       }
     }

  //these equations are used to calculate the savings in energy
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
