-- CreateTable
CREATE TABLE "AirQualityMeasurement" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperature" DOUBLE PRECISION NOT NULL,
    "humidity" DOUBLE PRECISION NOT NULL,
    "pm25" DOUBLE PRECISION NOT NULL,
    "pm10" DOUBLE PRECISION NOT NULL,
    "no2" DOUBLE PRECISION NOT NULL,
    "so2" DOUBLE PRECISION NOT NULL,
    "co" DOUBLE PRECISION NOT NULL,
    "proximityToIndustrialAreas" DOUBLE PRECISION NOT NULL,
    "populationDensity" INTEGER NOT NULL,
    "airQuality" TEXT NOT NULL,

    CONSTRAINT "AirQualityMeasurement_pkey" PRIMARY KEY ("id")
);
