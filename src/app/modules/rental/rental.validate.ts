import { z } from 'zod';

const createRentalValidationSchema = z.object({
  // userId: z.string().nonempty({ message: 'User ID is required' }),
  bikeId: z.string().nonempty({ message: 'Bike ID is required' }),
  // startTime: z.date({ required_error: 'Start time is required' }),
  startTime: z
    .string()
    .nonempty({ message: 'Start time is required' })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Expected date, received string',
    }),
});

export const RentalValidation = {
  createRentalValidationSchema,
};
