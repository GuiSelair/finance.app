import AppError from '@shared/errors/AppError';

function throwIfEmptyBody(body: object) {
  if (!body || Object.keys(body).length === 0) {
    throw new AppError('Empty request body', 400);
  }
  return false;
}

function throwIfIsNaN({ name, value }: { name: string; value: number }) {
  if (isNaN(value)) {
    throw new AppError(`Property (${name}) is not a number`, 400);
  }
}

function throwIfPropertyNotExists(body: object, property: string) {
  if (!!body?.[property]) {
    throw new AppError(`Property (${property}) not exists`);
  }
}

export const requestValidations = {
  throwIfEmptyBody,
  throwIfIsNaN,
  throwIfPropertyNotExists,
};
