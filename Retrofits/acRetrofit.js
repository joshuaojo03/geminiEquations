public class ACRetrofit{

    private static double preHoursOnPerYearInput = 10;
    private static double postHoursOnPerYearInput = 5;
    private static double preSEERInput = 10;
    private static double postSEERInput = 10;
    private static double nominalCapacityInput = 10;
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
         return ((nominalCapacityInput / preSEERInput*preHoursOnPerYearInput) - (nominalCapacityInput / preSEERInput*preHoursOnPerYearInput));
     }

     public static double energyTimeChangeCalc() {
       return ((nominalCapacityInput / preSEERInput)*(preHoursOnPerYearInput-postHoursOnPerYearInput));
     }

     public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
         return (energyCalcPowerChange * energyCalcTimeChange);
     }

}
