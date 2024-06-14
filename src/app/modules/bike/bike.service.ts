import { Bike } from './bike.model';
import { TBike } from './bike.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();

  return result;
};

const updateBikeIntoDB = async (bikeId: string, updateData: Partial<TBike>) => {
  const updatedBike = await Bike.findByIdAndUpdate(bikeId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedBike) {
    throw new Error('Bike not found');
  }
  return updatedBike;
};

const deleteBikeFromDB = async (bikeId: string) => {
  const deletedBike = await Bike.findByIdAndUpdate(
    bikeId,
    { isAvailable: false },
    { new: true },
  );

  if (!deletedBike) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Bike not found');
  }
  return deletedBike;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
