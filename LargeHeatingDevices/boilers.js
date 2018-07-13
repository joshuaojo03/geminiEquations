public class Boilers{

    private static double preRuntimeInput = 10;
    private static double postRuntimeInput = 5;
    private static double preInputPowerInput = 10;
    private static double postInputPowerInput = 10;
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
         return ((preRuntimeInput * 52) * (preInputPowerInput - postInputPowerInput));
     }

     public static double energyTimeChangeCalc() {
         return (((preRuntimeInput-postRuntimeInput) * 52) * hourlyEnergyUseInput);
     }

     public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
         return (energyCalcPowerChange * energyCalcTimeChange);
     }

}
