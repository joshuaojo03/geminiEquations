public class HotFoodCabinets{

    private static double idealRunHoursInput = 10;
    private static double preEnergyUseInput = 10;
    private static double postEnergyUseInput = 10;
    private static double preTimeUseInput = 10;
    private static double postTimeUseInput = 5;
    private static double hourlyEnergyUseInput = 10;
    private static double energySavings;



     public static void main(String []args){
        System.out.println("Hello World");
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
         return (idealRunHoursInput * (preEnergyUseInput - postEnergyUseInput));
     }

     public static double energyTimeChangeCalc() {
         return ((preTimeUseInput-postTimeUseInput) * hourlyEnergyUseInput);
     }

     public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
         return (energyCalcPowerChange * energyCalcTimeChange);
     }

}
