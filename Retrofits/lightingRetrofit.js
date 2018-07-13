public class LightingRetrofit{

    private static double preHoursOnPerYearInput = 10;
    private static double postHoursOnPerYearInput = 5;
    private static double preWattsInput = 10;
    private static double postWattsInput = 10;
    private static double numberOfLampsInput = 10;
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
         return ((preWattsInput-postWattsInput) * numberOfLampsInput * preHoursOnPerYearInput);
     }

     public static double energyTimeChangeCalc() {
       return (preWattsInput * numberOfLampsInput * (preHoursOnPerYearInput - postHoursOnPerYearInput));
     }

     public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
         return (energyCalcPowerChange * energyCalcTimeChange);
     }

}
