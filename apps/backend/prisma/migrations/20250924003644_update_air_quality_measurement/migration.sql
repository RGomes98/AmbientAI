/*
  Warnings:

  - You are about to drop the column `co2` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `humCompensated` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `tempCompensated` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `AirQualityMeasurement` table. All the data in the column will be lost.
  - Added the required column `atmp` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atmpCompensated` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm005Count` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm01Count` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm01Standard` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm02Compensated` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm02Count` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm02Standard` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm10Standard` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rco2` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rhum` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rhumCompensated` to the `AirQualityMeasurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AirQualityMeasurement" DROP COLUMN "co2",
DROP COLUMN "humCompensated",
DROP COLUMN "humidity",
DROP COLUMN "tempCompensated",
DROP COLUMN "temperature",
ADD COLUMN     "atmp" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "atmpCompensated" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm005Count" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm01Count" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm01Standard" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm02Compensated" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm02Count" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm02Standard" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "pm10Standard" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rco2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rhum" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "rhumCompensated" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "pm10" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "noxIndex" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "noxRaw" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pm003Count" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pm01" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "pm02" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tvocIndex" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "tvocRaw" SET DATA TYPE DOUBLE PRECISION;
