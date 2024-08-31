import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalServices } from './rental.service';

const createRental = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const rentalData = {
    ...req.body,
  };

  try {
    // Call service to create rental
    const newRental = await RentalServices.createRentalIntoDB(
      userId,
      rentalData,
      req.body.transactionId,
    );

    if (!newRental || newRental.length === 0) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Failed to create rental record',
        data: newRental,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Rental created successfully',
        data: newRental,
      });
    }
  } catch (error) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'An error occurred while creating the rental',
      data: error,
    });
  }
});

const getUserRentals = catchAsync(async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const rentals = await RentalServices.getUserRentalsFromDB(userId);
  console.log(rentals);
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

const completeRentalPayment = catchAsync(async (req, res) => {
  const { id: rentalId } = req.params;
  const { transactionId, amount, bikeId, userId, email } = req.body;
  console.log(rentalId, req.body);
  const paymentRecord = await RentalServices.completeRentalPaymentIntoDB(
    rentalId,
    {
      transactionId,
      amount,
      bikeId,
      userId,
      email,
    },
  );
  console.log(paymentRecord);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment completed successfully, rental moved to Paid',
    data: paymentRecord,
  });
});

export const RentalControllers = {
  createRental,
  getUserRentals,
  returnRental,
  completeRentalPayment,
};
