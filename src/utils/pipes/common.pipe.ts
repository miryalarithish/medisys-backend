import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { Schema } from 'joi';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: Schema) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, _: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('No Data Submitted');
    }
    const { error, value: transformedValue } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: false,
      convert: true,
    });

    if (error) {
      throw new BadRequestException(error.message);
    }
    return transformedValue;
  }
}
