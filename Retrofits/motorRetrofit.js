public class MotorRetrofit{

    private static double preAnnualOperatingTimeInput = 10;
    private static double postAnnualOperatingTimeInput = 5;
    private static double preMotorEfficiencyInput = 10;
    private static double postMotorEfficiencyInput = 10;
    private static double motorPowerInput = 10;
    private static double averageMotorLoadInput = 10;
    private static double ratedMotorLoadInput = 10;
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
         return (motorPowerInput*(averageMotorLoadInput/ratedMotorLoadInput) * .746 *preAnnualOperatingTimeInput
         * ((100/preMotorEfficiencyInput) -(100/postMotorEfficiencyInput)));
     }

     public static double energyTimeChangeCalc() {
       return (motorPowerInput*(averageMotorLoadInput/ratedMotorLoadInput) * .746 * (preAnnualOperatingTimeInput-postAnnualOperatingTimeInput)
       * (100/preMotorEfficiencyInput));
     }

     public static double energyCalcTotal(double energyCalcPowerChange, double energyCalcTimeChange) {
         return (energyCalcPowerChange * energyCalcTimeChange);
     }

}
