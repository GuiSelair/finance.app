import { Request, Response } from "express";
import { container } from "tsyringe";

import { requestValidations } from "@shared/helpers/requestValidations";
import { ModifyIncomeMonthService } from '@modules/Settings/domain/services/ModifyIncomeMonthService'
import { FindIncomeMonthService } from "@modules/Settings/domain/services/FindIncomeMonthService";

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

  public async find(request: Request, response: Response){
    requestValidations.throwIfPropertyNotExists(request.query, 'month');
    requestValidations.throwIfPropertyNotExists(request.query, 'year');
    requestValidations.throwIfPropertyMonthIsNotValid(Number(request.query?.month))
    requestValidations.throwIfPropertyYearIsNotValid(Number(request.query?.year))

    const { month, year } = request.query
    const user_id = request.user.id

    const findIncomeMonthService = container.resolve(FindIncomeMonthService)
    const serviceOutput = await findIncomeMonthService.execute({ month: Number(month), user_id, year: Number(year) })

    return response.status(200).json(serviceOutput)
  }
}
