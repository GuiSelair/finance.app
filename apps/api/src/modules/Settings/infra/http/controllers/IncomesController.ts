import { Request, Response } from "express";
import { container } from "tsyringe";

import { requestValidations } from "@shared/helpers/requestValidations";
import { ModifyIncomeMonthService } from '@modules/Settings/domain/services/ModifyIncomeMonthService'

export class IncomesController {
  public async createUpdate(request: Request, response: Response) {
    requestValidations.throwIfEmptyBody(request.body);

    const { month, year, income } = request.body;
    const { id } = request.user;

    const modifyIncomeMonthService = container.resolve(ModifyIncomeMonthService)
    const serviceOutput = await modifyIncomeMonthService.execute({
      user_id: id,
      month,
      year,
      income
    });

    return response.status(200).json(serviceOutput);
  }
}
