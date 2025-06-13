import { authorizeApi } from "../../../middlewares";
import{
    deleteTestcasesByUsecase,
    generateTestcase
} from "./service";

module.exports= function(router:any) {
    router.post("/:space/:reference/generate/testcase", generateTestcase );
    router.delete("/:space/:domain/:usecaseId/testcase", deleteTestcasesByUsecase);
};