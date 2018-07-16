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
    private static double preDaysInOperationCalculate = 365;
    private static double postDaysInOperationCalculate = 365;
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
       public static double[] powerValueCalc() {
         if (timeChange == false) {
           double[] powerValues = new double[2];
           powerValues[0] = (prePreheatEnergyInput - postPreheatEnergyInput);
           powerValues[1] = (preIdleEnergyRateInput - postIdleEnergyRateInput);
           return (powerValues);
       } else {
         double[] powerValues = new double[2];
         powerValues[0] = (prePreheatEnergyInput);
         powerValues[1] = (preIdleEnergyRateInput);
         return (powerValues);
         }
     }

  //these equations are used to calculate the savings in energy
     public static double energyPowerChangeCalc() {
         return (((prePreheatEnergyInput - postPreheatEnergyInput) * preDaysInOperationCalculate) + (preIdealRunHoursInput * (preIdleEnergyRateInput - postIdleEnergyRateInput)));
     }

      public static double energyTimeChangeCalc() {
          return ((prePreheatEnergyInput) * (preDaysInOperationCalculate - postDaysInOperationCalculate) + ((preIdealRunHoursInput - postIdealRunHoursInput) * preIdleEnergyRateInput));
      }

      public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
        return (((prePreheatEnergyInput - postPreheatEnergyInput) * (preDaysInOperationCalculate - postDaysInOperationCalculate))
        + ((preIdealRunHoursInput - postIdealRunHoursInput) * (preIdleEnergyRateInput - postIdleEnergyRateInput)));
      }
}
