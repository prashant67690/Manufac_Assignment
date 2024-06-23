interface DataRow {
  Country: string;
  Year: string;
  "Crop Name": string;
  "Crop Production (UOM:t(Tonnes))": number | string;
  "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
  "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

interface YearlyProduction {
  year: string;
  maxProduction: { crop: string; production: number };
  minProduction: { crop: string; production: number };
}

interface CropAverage {
  cropName: string;
  averageYield: number;
  averageCultivationArea: number;
}

export const calculateYearlyProduction = (
  data: DataRow[]
): YearlyProduction[] => {
  const yearlyData: { [key: string]: DataRow[] } = {};

  // Group data by year
  data.forEach((row) => {
    const year = row.Year;
    if (!yearlyData[year]) {
      yearlyData[year] = [];
    }
    yearlyData[year].push(row);
  });

  // Calculate max and min production for each year
  const yearlyProduction: YearlyProduction[] = Object.keys(yearlyData).map(
    (year) => {
      const crops = yearlyData[year];
      let maxProduction = { crop: "", production: -Infinity };
      let minProduction = { crop: "", production: Infinity };

      crops.forEach((crop) => {
        const production =
          typeof crop["Crop Production (UOM:t(Tonnes))"] === "string"
            ? parseFloat(crop["Crop Production (UOM:t(Tonnes))"])
            : crop["Crop Production (UOM:t(Tonnes))"];

        if (production > maxProduction.production) {
          maxProduction = { crop: crop["Crop Name"], production };
        }
        if (production < minProduction.production) {
          minProduction = { crop: crop["Crop Name"], production };
        }
      });

      return {
        year,
        maxProduction,
        minProduction,
      };
    }
  );

  return yearlyProduction;
};

export const calculateCropAverages = (data: DataRow[]): CropAverage[] => {
  const cropData: {
    [key: string]: { totalYield: number; totalArea: number; count: number };
  } = {};

  data.forEach((row) => {
    const cropName = row["Crop Name"];
    const yieldOfCrops =
      typeof row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] === "string"
        ? parseFloat(row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"])
        : row["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"];

    const areaUnderCultivation =
      typeof row["Area Under Cultivation (UOM:Ha(Hectares))"] === "string"
        ? parseFloat(row["Area Under Cultivation (UOM:Ha(Hectares))"])
        : row["Area Under Cultivation (UOM:Ha(Hectares))"];

    if (!cropData[cropName]) {
      cropData[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
    }

    cropData[cropName].totalYield += yieldOfCrops;
    cropData[cropName].totalArea += areaUnderCultivation;
    cropData[cropName].count += 1;
  });

  const cropAverages: CropAverage[] = Object.keys(cropData).map((cropName) => ({
    cropName,
    averageYield: cropData[cropName].totalYield / cropData[cropName].count,
    averageCultivationArea:
      cropData[cropName].totalArea / cropData[cropName].count,
  }));

  return cropAverages;
};
