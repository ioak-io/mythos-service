import { authorizeApi } from "../../../middlewares";
import {
  deleteUsecases,
  generateUsecase
} from "./service";

module.exports = function (router: any) {
  router.post("/:space/:domain/:reference/generate", generateUsecase);
  router.delete("/:space/:domain", deleteUsecases);
};
