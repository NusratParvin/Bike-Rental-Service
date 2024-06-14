import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalServices } from './rental.service';

const createRental = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const rentalData = {
    userId,
    ...req.body,
  };
  const newRental = await RentalServices.createRentalIntoDB(userId, rentalData);

  if (!newRental.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Failed to create rental record',
      data: newRental,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: newRental,
  });
});

const getUserRentals = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const rentals = await RentalServices.getUserRentalsFromDB(userId);

  if (!rentals.length) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'No Data Found',
      data: rentals,
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: rentals,
  });
});

const returnRental = catchAsync(async (req, res) => {
  const { id: rentalId } = req.params;

  const rental = await RentalServices.returnRentalIntoDB(rentalId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: rental,
  });
});

export const RentalControllers = {
  createRental,
  getUserRentals,
  returnRental,
};
