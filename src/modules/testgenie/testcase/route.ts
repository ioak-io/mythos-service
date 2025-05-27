import { authorizeApi } from "../../../middlewares";
import{
    deleteTestcasesByUsecase,
    generateTestcase
} from "./service";

module.exports= function(router:any) {
    router.post("/:space/testcase/:reference/generate", generateTestcase );
    router.delete("/:space/:domain/:usecaseId/testcase", deleteTestcasesByUsecase);
};