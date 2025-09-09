/*
  Warnings:

  - You are about to drop the column `airQuality` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `co` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `no2` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `pm25` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `populationDensity` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `proximityToIndustrialAreas` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `so2` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to alter the column `humidity` on the `AirQualityMeasurement` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `pm10` on the `AirQualityMeasurement` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `co2` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humCompensated` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noxIndex` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noxRaw` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm003Count` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm01` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm02` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempCompensated` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvocIndex` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tvocRaw` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AirQualityMeasurement" DROP COLUMN "airQuality",
DROP COLUMN "co",
DROP COLUMN "no2",
DROP COLUMN "pm25",
DROP COLUMN "populationDensity",
DROP COLUMN "proximityToIndustrialAreas",
DROP COLUMN "so2",
ADD COLUMN     "co2" INTEGER NOT NULL,
ADD COLUMN     "humCompensated" INTEGER NOT NULL,
ADD COLUMN     "noxIndex" INTEGER NOT NULL,
ADD COLUMN     "noxRaw" INTEGER NOT NULL,
ADD COLUMN     "pm003Count" INTEGER NOT NULL,
ADD COLUMN     "pm01" INTEGER NOT NULL,
ADD COLUMN     "pm02" INTEGER NOT NULL,
ADD COLUMN     "tempCompensated" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tvocIndex" INTEGER NOT NULL,
ADD COLUMN     "tvocRaw" INTEGER NOT NULL,
ALTER COLUMN "humidity" SET DATA TYPE INTEGER,
ALTER COLUMN "pm10" SET DATA TYPE INTEGER;
