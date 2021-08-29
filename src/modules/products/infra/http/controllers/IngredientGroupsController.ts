import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateIngredientGroupService from '@modules/products/services/CreateIngredientGroupService';

export default class IngredientGroupsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { description } = request.body;

    const createGroup = container.resolve(CreateIngredientGroupService);

    const group = await createGroup.execute({
      description,
    });

    return response.json(group);
  }
}
