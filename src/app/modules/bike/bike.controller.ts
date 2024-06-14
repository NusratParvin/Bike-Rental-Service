import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const bikeData = req.body;
  const result = await BikeServices.createBikeIntoDB(bikeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikeFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req, res) => {
  const bikeId = req.params.id;
  const updateData = req.body;
  const updatedBike = await BikeServices.updateBikeIntoDB(bikeId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike updated successfully',
    data: updatedBike,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const bikeId = req.params.id;
  const deletedBike = await BikeServices.deleteBikeFromDB(bikeId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike deleted successfully',
    data: deletedBike,
  });
});

export const BikeControllers = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
};
