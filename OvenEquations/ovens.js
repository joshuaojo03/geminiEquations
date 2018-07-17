public class Ovens{

    private static double preIdealRunHoursInput = 10;
    private static double postIdealRunHoursInput = 5;
    private static double preIdleEnergyRateInput = 10;
    private static double postIdleEnergyRateInput = 5;
    private static double preGasEnergyUseInput = 10;
    private static double postGasEnergyUseInput = 10;
    private static double preHourlyEnergyUseInput = 10;
    private static double postHourlyEnergyUseInput = 5;
    private static double preDaysInOperationCalc = preHourlyEnergyUseInput / 24;
    private static double postDaysInOperationCalc = postHourlyEnergyUseInput / 24;
    private static double energySavings;
    private static double prePreheatEnergyInput = 10;
    private static double postPreheatEnergyInput = 10;
    private static double preFanEnergyRateInput = 10;
    private static double postFanEnergyRateInput = 10;
    private static boolean gasAppliance = true;
    private static double energyPowerChange;
    private static double energyTimeChange;
    private static boolean timeChange = true;



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

  //this is the function that will be called by the platform to determine the energy cost savings. In the main class the value is "powerValue" that is
  //used in the various electricityCosts equations; in this equation there should be a check determining if the powerValue returned is dependent upon
  //the time or not. If it is dependent upon the time, then the powerValue returned will be the preValue. If it is not dependent upon the time, then
  //the power value returned will be the difference between the pre and post values
       public static double[] powerValueCalc() {
         if (timeChange == false) {
           double[] powerValues = new double[2];
           powerValues[0] = (prePreheatEnergyInput - postPreheatEnergyInput);
           powerValues[1] = (preIdleEnergyRateInput - postIdleEnergyRateInput);
           powerValues[2] = (preFanEnergyRateInput - postFanEnergyRateInput);
           return (powerValues);
       } else {
         double[] powerValues = new double[3];
         powerValues[0] = (prePreheatEnergyInput);
         powerValues[1] = (preIdleEnergyRateInput);
         powerValues[2] = (preFanEnergyRateInput);
         return (powerValues);
         }
     }

    //these equations are used to calculate the savings in energy

     public static double energyPowerChangeGasCalc() {
         return ((((prePreheatEnergyInput - postPreheatEnergyInput)/4 * preDaysInOperationCalc) +
         (preIdealRunHoursInput * (preIdleEnergyRateInput - postIdleEnergyRateInput))/3.412) + (preIdealRunHoursInput * (preFanEnergyRateInput - postFanEnergyRateInput)));
     }

     public static double energyPowerChangeElectricCalc() {
         return (((prePreheatEnergyInput - postPreheatEnergyInput)/4 * preDaysInOperationCalc) + (preIdealRunHoursInput *
           ((preIdleEnergyRateInput - postIdleEnergyRateInput) + (preFanEnergyRateInput - postFanEnergyRateInput))));
     }

      public static double energyTimeChangeGasCalc() {
        return ((((prePreheatEnergyInput/4 * (preDaysInOperationCalc - postDaysInOperationCalc)) +
        ((preIdealRunHoursInput - postIdealRunHoursInput) * preIdleEnergyRateInput))/3.412) + ((preIdealRunHoursInput - postIdealRunHoursInput) * preFanEnergyRateInput));
     }

      public static double energyTimeChangeElectricCalc() {
        return ((prePreheatEnergyInput/4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + ((preIdealRunHoursInput - postIdealRunHoursInput) *
          ((preIdleEnergyRateInput - postIdleEnergyRateInput) + (preFanEnergyRateInput - postFanEnergyRateInput))));
      }

      public static double energyElectricCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
        return (((prePreheatEnergyInput - postPreheatEnergyInput)/4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + ((preIdealRunHoursInput - postIdealRunHoursInput) *
          ((preIdleEnergyRateInput - postIdleEnergyRateInput) + (preFanEnergyRateInput - postFanEnergyRateInput))));
      }

      public static double energyGasCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
        return ((((prePreheatEnergyInput - postPreheatEnergyInput)/4 * (preDaysInOperationCalc - postDaysInOperationCalc)) + ((preIdealRunHoursInput - postIdealRunHoursInput) *
         (preIdleEnergyRateInput - postIdleEnergyRateInput))/3.412) + ((preIdealRunHoursInput - postIdealRunHoursInput) * (preFanEnergyRateInput - postFanEnergyRateInput)));
    }
}
