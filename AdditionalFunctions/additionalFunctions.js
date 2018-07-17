public class AdditionalFunctions{

      // //Each of the functions in this class should be viewed as independent. The main method is busy just to
      // show how the functions are supposed to work. But every placeholder is a value that should be calculated by another function.
      // It is a placeholder here just to show what is supposed to actually be passed into these functions. But they should be removed from the
      // main method, and calculated independently so that these functions can properly be called by the platform.

      //I need to double check the maintenance costs/equipment costs, and finish writing the energy equations for the devices; need to check if the device equations
      //calculate the change in energy usage or if they calculate the individual energy usage

       private static double preHoursOnPeakPricingInput = 10;
       private static double preHoursOnPartPeakPricingInput = 10;
       private static double preHoursOnOffPeakPricingInput = 10;
       private static double postHoursOnPeakPricingInput = 10;
       private static double postHoursOnPartPeakPricingInput = 10;
       private static double postHoursOnOffPeakPricingInput = 10;

       private static double peakPriceInput = 10;
       private static double partPeakPriceInput = 10;
       private static double offPeakPriceInput = 10;
       private static double idealRunHoursInput = 10;
       private static double idleEnergyRateInput = 10;
       private static double preheatEnergyInput = 10;
       private static double daysInOperationInput = 365;
       private static double winterRateInput = 10;
       private static double summerRateInput = 10;
       //from excel database
       private static double materialsCost = 100;
       private static double laborCosts = 100;
       //calculated from other class; these placeholders will be calculations from other classes. They are placeholders now
       //because I am not super comfortable creating different classes and calling these functions from different classes.
       private static double implementationCostsPlaceholder = 100;
       private static double totalEnergyCostSavingsPlaceholderYears = 2;
       private static double maintenanceCostSavings = 8;
       private static double otherEquipmentSavings = 9;
       private static double incentivesPlaceholder = 10;
       private static double preEnergyPlaceholder = 10;
       private static double postEnergyPlaceholder = 5;
       private static double dollarsPerKWHPlaceholder = 1;
       private static double dollarsPerKWPlaceholder = 1;
       private static double powerPlaceholder = 11;
       private static double hoursOfOperationInput = 10;
       private static double blendedRate = 10;
       //this will be something Binay gets. It is a string check right now.
       private static String getRateSchedule = "TOU";
       //this is a check for appliances to see if they also have gas components
       private static boolean checkForGas = true;
       //right here energy use will serve as a placeholder, but in general it will be a value derived from each individual device/retrofit
       // val energyUse = energyCalc(); this energyCalc() formula is device specific and is included in the different classes for devices
       private static double energyUse = 10;

       //checking for which input variable is changed regarding the time of use, will either be power, time, or both
       private static boolean powerChangeCheck = true;
       private static boolean timeChangeCheck = true;
       private static boolean bothPowerAndTimeCheck = true;
       private static boolean multiplePowerCheck = true;
       private static boolean multipleTimeCheck = true;
       private static boolean bothMultiplePowerandTimeCheck = true;
       //You have to get the rate schedule and determine whether or not it is a TOU rate schedule or a non-TOU rate schedule
       //The powerValue is returned from every device; for the power change and bothPowerAndTime change, the power value represents
       // the change in power. For the time change, the powerValue represents the prePower value

       public static void main(String []args){

         double[] powerValues = new double[3];
         powerValues[0] = 1;
         powerValues[1] = 2;
         powerValues[2] = 3;
         double powerValue = 10;
         double energyCostSavings = 10;
         double gasCostsSavings = 10;

         System.out.println(Arrays.toString(powerValues));
         System.out.println("fhjhrehjhhjjh");

         if (getRateSchedule == "TOU") {
             if (multiplePowerCheck == true) {
               double electricityCostsSummer = electricityCostsSummerCalcMultiplePowerChange(powerValues);
               double electricityCostsWinter = electricityCostsWinterCalcMultiplePowerChange(powerValues);
               energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter);
             } else if (multipleTimeCheck == true) {
               //the powervalues that are taken from the device should be for time change
               double electricityCostsSummer = electricityCostsSummerCalcMultipleTimeChange(powerValues);
               double electricityCostsWinter = electricityCostsWinterCalcMultipleTimeChange(powerValues);
               energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter);
             } else if (bothMultiplePowerandTimeCheck == true) {
               //the powervalues that are taken from the device should be for time change
               double electricityCostsSummer = electricityCostsSummerCalcMultipleTimeChange(powerValues);
               double electricityCostsWinter = electricityCostsWinterCalcMultipleTimeChange(powerValues);
               energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter);
             } else if (powerChangeCheck == true) {
               double electricityCostsSummer = electricityCostsSummerCalcPowerChange(powerValue);
               double electricityCostsWinter = electricityCostsWinterCalcPowerChange(powerValue);
               energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter);
             } else if (timeChangeCheck == true) {
               //the powervalues that are taken from the device should be for time change
               double electricityCostsSummer = electricityCostsSummerCalcTimeChange(powerValue);
               double electricityCostsWinter = electricityCostsWinterCalcTimeChange(powerValue);
               energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter);
             } else if (bothPowerAndTimeCheck == true) {
               //the powervalues that are taken from the device should be for time change
               double electricityCostsSummer = electricityCostsSummerCalcTimeChange(powerValue);
               double electricityCostsWinter = electricityCostsWinterCalcTimeChange(powerValue);
               energyCostSavings = findTOUCostSavings(electricityCostsSummer, electricityCostsWinter);
             }
           } else if (getRateSchedule == "NonTOU") {
             energyCostSavings = findNonTOUCostSavings(energyUse);
           } else if (checkForGas == true) {
             energyCostSavings = gasCostSavings(energyUse);
           } else {
             energyCostSavings = 0;
             gasCostsSavings = 0;
           }

         double demandCostSavings = demandCostSavingsYearCalc(energyCostSavings, hoursOfOperationInput);
         double implementationCosts = implementationCosts(materialsCost, laborCosts, incentivesPlaceholder);
         double totalCostSaved = totalCostSavedCalc(energyCostSavings, maintenanceCostSavings, otherEquipmentSavings, demandCostSavings, gasCostsSavings);
         double paybackPeriodMonths = calculatePaybackPeriodMonths(totalCostSaved, implementationCostsPlaceholder);
         double paybackPeriodYears = calculatePaybackPeriodYears(totalCostSaved, implementationCostsPlaceholder);
       }

       public static double implementationCosts(double materialsCost, double laborCosts, double incentivesPlaceholder) {
         return ((materialsCost + laborCosts) - incentivesPlaceholder);
       }
       public static double calculatePaybackPeriodMonths(double totalCostSaved, double implementationCosts) {
         return ((implementationCosts / totalCostSaved)/12);
       }
       public static double calculatePaybackPeriodYears(double totalCostSaved, double implementationCosts) {
         return (implementationCosts / totalCostSaved);
       }

       public static double totalCostSavedCalc(double energyCostSavings, double maintenanceCostSavings,
         double otherEquipmentCostSavings, double demandCostSavings, double gasCostsSavings) {
         return (energyCostSavings + maintenanceCostSavings + otherEquipmentCostSavings + demandCostSavings);
       }

       //might have to return electrical costs from each device separately and plug into equation, rather than plugging in directly here
       // public static double energyCostSavingsCalc(costSavingsEnergyYear) {
       //   return (costSavingsEnergyYear)
       // }
       // public static double costSavingsEnergyYearCalc(preEnergyPlaceholder, postEnergyPlaceholder, dollarsPerKWHPlaceholder) {
       //   return (((preEnergyPlaceholder - postEnergyPlaceholder) * dollarsPerKWHPlaceholder))
       // }
       // public static double costSavingsEnergyMonthsCalc(preEnergyPlaceholder, postEnergyPlaceholder, dollarsPerKWHPlaceholder) {
       //   return (((preEnergyPlaceholder - postEnergyPlaceholder) * dollarsPerKWHPlaceholder)/12)
       // }
       public static double demandCostSavingsYearCalc(double energyCostSavings, double hoursOfOperationInput) {
         return (energyCostSavings / hoursOfOperationInput);
       }

   //this power value will be returned from the equations for each device;
     public static double electricityCostsSummerCalcPowerChange(double powerValue) {
      return ((preHoursOnPeakPricingInput * powerValue * peakPriceInput) + (preHoursOnPartPeakPricingInput * powerValue * partPeakPriceInput)
       + (preHoursOnOffPeakPricingInput * powerValue * offPeakPriceInput));
      }
      public static double electricityCostsWinterCalcPowerChange(double powerValue) {
        return ((preHoursOnPartPeakPricingInput * powerValue * partPeakPriceInput) + (preHoursOnOffPeakPricingInput * powerValue * offPeakPriceInput));
      }

      public static double electricityCostsSummerCalcTimeChange(double powerValue) {
       return (((preHoursOnPeakPricingInput - postHoursOnPeakPricingInput) * powerValue * peakPriceInput) + ((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput)
       * powerValue * partPeakPriceInput) + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValue * offPeakPriceInput));
       }

       public static double electricityCostsWinterCalcTimeChange(double powerValue) {
         return (((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput) * powerValue * partPeakPriceInput)
         + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValue * offPeakPriceInput));
       }

      public static double findTOUCostSavings(double electricityCostsSummer, double electricityCostsWinter) {
        return (electricityCostsSummer + electricityCostsWinter);
      }
      public static double findNonTOUCostSavings(double energyUse) {
       return (((energyUse / 2) * summerRateInput) + ((energyUse / 2) * winterRateInput));
     }

       public static double gasCostSavings(double energyUse) {
       return (((energyUse)/99976.1) * ((winterRateInput + summerRateInput)/2));
     }

     //this is the equation for appliances where there is a days in operation value, as opposed to just timed hourly values. (pre-rinse sprays, water heaters,dishwashers, etc).
     //There is no real way for us to know when at what specific times a business is using their pre-rinses, dishwashers, water heaters, etc, but we do know how many hours they
     //are using them each day. So from this value we can get a total "days in operation" that we can use in the formula.
     //The blendedRate is a value from the database.
     public static double blendedRateCalc(double energyUse) {
       return (energyUse * blendedRate);
     }

     //This is the cost equation for televisions and other future appliances that function similarly
     //There will be an if-statement checking for these values
     //make for loops, fix bugs, and comment
     public static double electricityCostsSummerCalcMultiplePowerChange(double [] powerValues) {
       double electricitySummerCostsMultiplePowerChangeCalc = 0;
       for (int i = 0; i < powerValues.length; i++) {
           System.out.println(powerValues);
         electricitySummerCostsMultiplePowerChangeCalc += ((preHoursOnPeakPricingInput * ((Double)powerValues[i]) * peakPriceInput)
         + (preHoursOnPartPeakPricingInput * ((Double)powerValues[i]) * partPeakPriceInput)
          + (preHoursOnOffPeakPricingInput * ((Double)powerValues[i]) * offPeakPriceInput));
       }
      return (electricitySummerCostsMultiplePowerChangeCalc);
      }

      public static double electricityCostsWinterCalcMultiplePowerChange(double [] powerValues) {
        double electricityWinterCostsMultiplePowerChangeCalc = 0;
        for (int i = 0; i < powerValues.length; i++) {
          System.out.println(powerValues);
         electricityWinterCostsMultiplePowerChangeCalc += ((preHoursOnPartPeakPricingInput * powerValues[i] * partPeakPriceInput) +
         (preHoursOnOffPeakPricingInput * powerValues[i] * offPeakPriceInput));
        }
        return (electricityWinterCostsMultiplePowerChangeCalc);
      }

    public static double electricityCostsSummerCalcMultipleTimeChange(double [] powerValues) {
      double electricitySummerCostsMultipleTimeChangeCalc = 0;
        for (int i = 0; i < powerValues.length; i++) {
                    System.out.println(powerValues);
          electricitySummerCostsMultipleTimeChangeCalc += (((preHoursOnPeakPricingInput - postHoursOnPeakPricingInput) * powerValues[i] * peakPriceInput) + ((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput)
          * powerValues[i] * partPeakPriceInput) + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValues[i] * offPeakPriceInput));
        }
     return (electricitySummerCostsMultipleTimeChangeCalc);
     }

     public static double electricityCostsWinterCalcMultipleTimeChange(double [] powerValues) {
       double electricityWinterCostsMultipleTimeChangeCalc = 0;
                 System.out.println(powerValues);
         for (int i = 0; i < powerValues.length; i++) {
         electricityWinterCostsMultipleTimeChangeCalc += (((preHoursOnPartPeakPricingInput - postHoursOnPartPeakPricingInput) * powerValues[i] * partPeakPriceInput)
         + ((preHoursOnOffPeakPricingInput - postHoursOnOffPeakPricingInput) * powerValues[i] * offPeakPriceInput));
       }
       return (electricityWinterCostsMultipleTimeChangeCalc);
     }



  }
