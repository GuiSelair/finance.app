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
  if (!!body?.[property]) {
    throw new AppError(`Property (${property}) not exists`);
  }
}

function throwIfPropertyMonthIsNotValid(month: number) {
  const monthSchema = z.number().min(1).max(12);

  if (!monthSchema.safeParse(month).success) {
    throw new AppError('Month number invalid, try a number between 1 and 12');
  }
}

function throwIfPropertyYearIsNotValid(year: number) {
  const yearSchema = z.number().min(2020).max(new Date().getFullYear());

  if (!yearSchema.safeParse(year).success) {
    throw new AppError(
      `Year number invalid, try a number between 2000 and ${new Date().getFullYear()}`,
    );
  }
}

export const requestValidations = {
  throwIfEmptyBody,
  throwIfIsNaN,
  throwIfPropertyNotExists,
  throwIfPropertyMonthIsNotValid,
  throwIfPropertyYearIsNotValid,
};
