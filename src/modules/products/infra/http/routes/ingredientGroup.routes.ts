import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import IngredientGroupsController from '@modules/products/infra/http/controllers/IngredientGroupsController';

const ingredientGroupsRouter = Router();
const ingredientGroupsController = new IngredientGroupsController();

ingredientGroupsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
    },
  }),
  ingredientGroupsController.create,
);

export default ingredientGroupsRouter;
