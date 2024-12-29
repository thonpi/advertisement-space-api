import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import Joi from 'joi';
import { validateJoiSchema } from '../../utils/joi';
import rentalSpaceService from '../../services/rentalSpace';

const rentalSpaceSchema = Joi.object({
  id: Joi.string().required(),
});

const getRentalSpaceById = catchAsync(async (req: Request, res: Response) => {
  try {
    const validatedBody = validateJoiSchema(rentalSpaceSchema, req.body);
    const resData = await rentalSpaceService.findOneOrNotFoundById(
      validatedBody.id
    );
    res.status(200).json({
      code: 200,
      message: 'Get rental space by id successfully',
      data: resData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

export default getRentalSpaceById;
