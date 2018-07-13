public class RefrigerationFanRetrofit{

    private static double preAnnualOperatingTimeInput = 10;
    private static double postAnnualOperatingTimeInput = 5;
    private static double preWattsInput = 10;
    private static double postWattsInput = 10;
    private static double fansPerEquipmentInput = 10;
    private static double numberOfEquipmentInput = 10;
    private static double preFanRuntimeInput = 10;
    private static double postFanRuntimeInput = 10;
    private static double eerInput = 10;
    private static double fanRuntimeInput = 10;
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
         return ((preWattsInput - postWattsInput) * fansPerEquipmentInput * (numberOfEquipmentInput/1000) * preFanRuntimeInput
       * (1 + (1/(eerInput/3.412))));
     }

     public static double energyTimeChangeCalc() {
       return (preWattsInput * fansPerEquipmentInput * (numberOfEquipmentInput/1000) * (preFanRuntimeInput - postFanRuntimeInput)
     * (1 + (1/(eerInput/3.412))));
     }

     public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
         return (energyCalcPowerChange * energyCalcTimeChange);
     }

}
