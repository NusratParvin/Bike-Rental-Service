import { Bike } from './bike.model';
import { TBike } from './bike.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bike.create(payload);

  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();

  return result;
};

const updateBikeIntoDB = async (bikeId: string, updateData: Partial<TBike>) => {
  const isBikeExists = await Bike.findById(bikeId);

  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const updatedBike = await Bike.findByIdAndUpdate(bikeId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBike) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Update Failed');
  }

  return updatedBike;
};

const deleteBikeFromDB = async (bikeId: string) => {
  const isBikeExists = await Bike.findById(bikeId);

  if (!isBikeExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Data Found');
  }

  const deletedBike = await Bike.findByIdAndUpdate(
    bikeId,
    { isAvailable: false },
    { new: true },
  );

  if (!deletedBike) {
    throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Delete Failed');
  }
  return deletedBike;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
