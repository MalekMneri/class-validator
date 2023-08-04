import { ValidationOptions } from '../ValidationOptions';
import { buildMessage, ValidateBy } from '../common/ValidateBy';

export const IS_POSITIVE = 'isPositive';

/**
 * Checks if the value is a positive number greater than zero.
 */
export function isPositive(value: unknown, options: { allowsZeros: boolean }): boolean {
  const { allowsZeros } = options;
  if (typeof value !== 'number') {
    return false;
  }
  return allowsZeros ? value >= 0 : value > 0;
}

/**
 * Checks if the value is a positive number greater than zero.
 *
 * To allow zeros, you can specify allowsZeros as true
 */
export function IsPositive({ allowsZeros = false } = {}, validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_POSITIVE,
      validator: {
        validate: (value, args): boolean => isPositive(value, { allowsZeros }),
        defaultMessage: buildMessage(
          eachPrefix => eachPrefix + '$property must be a positive number',
          validationOptions
        ),
      },
    },
    validationOptions
  );
}
