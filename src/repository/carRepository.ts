import prisma from "../config/database.js";
import { carSchema } from "../schemas/carSchema.js";

async function getCars() {
  const data = await prisma.cars.findMany()
  return data;
}

async function getCar(id: number) {
  const data = await prisma.cars.findFirst({where: {id}});
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data = await prisma.cars.findFirst({where: {licensePlate}});
  return data;
}

// Rota createCar (insert)
// async function createCar(model: string, licensePlate: string, year: number, color: string) {
//   await prisma.cars.create({ data: {
//     model,
//     color,
//     licensePlate,
//     year
//   }});
// }

// Atualização da rota createCar para rota createUpdateCar (upsert)
async function createCar(model: string, licensePlate: string, year: number, color: string) {
  await prisma.cars.upsert({
    where: {id: 1},
    create: {model, licensePlate, year, color},
    update: {model, licensePlate, year, color}
  });
}

async function deleteCar(id: number) {
  await prisma.cars.delete({where: {id}});
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar
}

export default carRepository;