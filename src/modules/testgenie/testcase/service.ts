import * as Helper from "./helper";

export const generateTestcase = async(req: any, res: any) => {
    try {
        const space = req.params.space;
        const reference = req.params.reference;
        const response: any = await Helper.generateTestcase(space, reference);
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error: any) {
        console.error("Error generating testcase:", error.message); 
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

export const deleteTestcasesByUsecase = async(req: any, res: any) => {
    try {
        const space = req.params.space;
        const usecaseId = req.params.usecaseId;
        const domain = req.params.domain;
        const response: any = await Helper.deleteTestcasesByUsecase(space, usecaseId, domain);
        res.status(200).json({
            success: true,
            data: response
        });
    } catch (error: any) {
        console.error("Error deleting testcases by usecase:", error.message);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};