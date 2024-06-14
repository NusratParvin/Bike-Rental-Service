import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TRental } from './rental.interface';
import { Rental } from './rental.model';
import { Bike } from '../bike/bike.model';
import mongoose from 'mongoose';

const createRentalIntoDB = async (userId: string, payload: TRental) => {
  //Check the bike's existence and availability
  const bike = await Bike.findById(payload.bikeId);

  if (!bike || !bike.isAvailable) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike not available');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // 1st transaction=>Update bike's availability status

    const rentedBike = await Bike.findByIdAndUpdate(
      bike._id,
      { isAvailable: false },
      { session, new: true },
    );

    if (!rentedBike) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        `Failed to update bike's availability`,
      );
    }
    // 2nd transaction=> Create rental

    const rentalData = {
      userId,
      bikeId: payload.bikeId,
      startTime: payload.startTime,
      returnTime: null,
      totalCost: 0,
      isReturned: false,
    };

    const rentalResult = await Rental.create([rentalData], { session });

    await session.commitTransaction();
    session.endSession();

    return rentalResult;
  } catch (err: any) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(err);
  }
};

const returnRentalIntoDB = async (rentalId: string) => {
  // Check rental existence
  const rental = await Rental.findById(rentalId);

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental info not found');
  } else if (rental.isReturned) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike is returned');
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Calculate the total cost
    const returnTime = new Date();
    console.log(returnTime.getTime());
    const rentalDuration =
      (returnTime.getTime() - rental.startTime.getTime()) / (1000 * 60 * 60);
    const bike = await Bike.findById(rental.bikeId).session(session);
    if (!bike) {
      throw new AppError(httpStatus.NOT_FOUND, 'Bike not found');
    }
    const totalCost = Number((rentalDuration * bike.pricePerHour).toFixed(2));

    // Update the rental info
    rental.returnTime = returnTime;
    rental.totalCost = totalCost;
    rental.isReturned = true;
    await rental.save({ session });

    // Update the bike's availability status
    await Bike.findByIdAndUpdate(
      rental.bikeId,
      { isAvailable: true },
      { session, new: true },
    );

    await session.commitTransaction();
    session.endSession();

    return rental;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getUserRentalsFromDB = async (userId: string) => {
  const rentals = await Rental.find({ userId });
  return rentals;
};

export const RentalServices = {
  createRentalIntoDB,
  getUserRentalsFromDB,
  returnRentalIntoDB,
};
