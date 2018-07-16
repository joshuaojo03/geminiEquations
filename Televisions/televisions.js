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


     public static double energyPowerChangeCalc() {
         return ((preOperatingHoursInput * (prePowerConsumptionModeOnInput - postPowerConsumptionModeOnInput)) +
         (preOffHoursInput * (prePowerConsumptionStandbyModeInput - postPowerConsumptionModeOnInput)));
     }

     public static double energyTimeChangeCalc() {
         return (((preOperatingHoursInput-postOperatingHoursInput) * prePowerConsumptionModeOnInput) +
         ((preOffHoursInput-postOffHoursInput) * prePowerConsumptionStandbyModeInput));
     }

      public static double energyCalcTotal(double energyPowerChange, double energyTimeChange) {
          return (energyPowerChange * energyTimeChange);
      }

}
