import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  create,
  deleteOne,
  getMeta,
  getOne,
  inferTypes,
  patch,
  search,
  update,
} from "./service";
import { authorizeApi } from "../../../middlewares";

const router = express.Router();
// middleware/transformDomain.ts
function kebabToCamelCase(kebab: string): string {
  return kebab.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
}

export const transformDomain = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params && req.params.domain) {
    req.params.domain = kebabToCamelCase(req.params.domain);
  }
  next();
};

module.exports = function (router: any) {
  router
    .route("/:space/:domain")
    .get( transformDomain, getMeta)
    .post( transformDomain, create);

  router
    .route("/:space/:domain/:reference")
    .get( transformDomain, getOne)
    .put( transformDomain, update)
    .patch( transformDomain, patch)
    .delete( transformDomain, deleteOne);

  router.post("/:space/:domain/search",  transformDomain, search);

  router.get("/inference/resources", inferTypes);
}