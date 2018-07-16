public class Televisions{

    private static double prePowerConsumptionModeOnInput = 10;
    private static double postPowerConsumptionModeOnInput = 10;
    private static double prePowerConsumptionStandbyModeInput = 10;
    private static double postPowerConsumptionStandbyModeInput = 10;
    private static double preOperatingHoursInput = 10;
    private static double postOperatingHoursInput = 10;
    private static double preOffHoursInput = 10;
    private static double postOffHoursInput = 10;
    private static double energySavings;


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
        System.out.println(energySavings);
     }

   //this is the function that will be called by the platform to determine the energy cost savings. In the main class the value is "powerValue" that is
   //used in the various electricityCosts equations; in this equation there should be a check determining if the powerValue returned is dependent upon
   //the time or not. If it is dependent upon the time, then the powerValue returned will be the preValue. If it is not dependent upon the time, then
   //the power value returned will be the difference between the pre and post values
        public static double[] powerValueCalc() {
          if (timeChange == false) {
            double[] powerValues = new double[2];
            powerValues[0] = (prePowerConsumptionStandbyModeInput - postPowerConsumptionModeOnInput);
            powerValues[1] = (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnInput);
            return (powerValues);
        } else {
          double[] powerValues = new double[2];
          powerValues[0] = (prePowerConsumptionStandbyModeInput);
          powerValues[1] = (prePowerConsumptionModeOnInput);
          return (powerValues);
          }
      }

   //these equations are used to calculate the savings in energy


     public static double energyPowerChangeCalc() {
         return ((preOperatingHoursInput * (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnInput)) +
         (preOffHoursInput * (prePowerConsumptionStandbyModeInput - postPowerConsumptionModeOnInput)));
     }

     public static double energyTimeChangeCalc() {
         return (((preOperatingHoursInput-postOperatingHoursInput) * prePowerConsumptionModeOnInput) +
         ((preOffHoursInput-postOffHoursInput) * prePowerConsumptionStandbyModeInput));
     }

      public static double energyCalcTotal(double energyPowerChange, double energyTimeChange) {
        return (((preOperatingHoursInput-postOperatingHoursInput) * (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnInput)) +
        ((preOffHoursInput-postOffHoursInput) * (prePowerConsumptionStandbyModeInput - postPowerConsumptionModeOnInput)));
      }
}
