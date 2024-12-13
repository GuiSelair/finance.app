import AppError from '@shared/errors/AppError';
import { z } from 'zod';

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
  if (!body?.[property]) {
    throw new AppError(`Property (${property}) not exists`);
  }
}

function throwIfPropertyMonthIsNotValid(month: number) {
  const monthSchema = z.number().min(0).max(11);

  if (!monthSchema.safeParse(month).success) {
    throw new AppError('Month number invalid, try a number between 0 and 11');
  }
}

function throwIfPropertyYearIsNotValid(year: number) {
  const yearSchema = z.number().min(2020);

  if (!yearSchema.safeParse(year).success) {
    throw new AppError(
      `Year number invalid, try a number greater than 2000`,
    );
  }
}

function throwIfPropertyIsNotUUID(uuid: string | null) {
  const uuidSchema = z.string().uuid();

  if (!uuid || !uuidSchema.safeParse(uuid).success) {
    throw new AppError('Invalid UUID', 400);
  }

  return false;
}

export const requestValidations = {
  throwIfEmptyBody,
  throwIfIsNaN,
  throwIfPropertyNotExists,
  throwIfPropertyMonthIsNotValid,
  throwIfPropertyYearIsNotValid,
  throwIfPropertyIsNotUUID,
};
