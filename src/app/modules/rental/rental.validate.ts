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
  // returnTime: z.date({ required_error: 'Return time is required' }),
  // totalCost: z
  //   .number()
  //   .positive({ message: 'Total cost must be a positive number' }),
  // isReturned: z.boolean().optional().default(false),
});

const updateRentalValidationSchema = z.object({
  userId: z.string().nonempty({ message: 'User ID is required' }).optional(),
  bikeId: z.string().nonempty({ message: 'Bike ID is required' }).optional(),
  startTime: z.date({ required_error: 'Start time is required' }).optional(),
  returnTime: z.date({ required_error: 'Return time is required' }).optional(),
  totalCost: z
    .number()
    .positive({ message: 'Total cost must be a positive number' })
    .optional(),
  isReturned: z.boolean().optional(),
});

export const RentalValidation = {
  createRentalValidationSchema,
  updateRentalValidationSchema,
};
