import { Gemini } from "aihub";
import { getTestCaseGenPrompt } from "./prompt";
import { getCollectionByName } from "../../../lib/dbutils";
import { nanoid } from "nanoid";

const {GEMINI_API_KEY} = require("../../../../env.js");

export const generateTestcase = async (
    space: string,
    // domain: string,
    reference: string
) => {
    const requiredDomain = "usecase";
    const domain = "testcase"
    
    const testcaseModel = getCollectionByName(space, domain);
    const usecaseModel = getCollectionByName(space, requiredDomain);
    const result: any = await usecaseModel.findOne({ reference });
    
    if (!result) {
        throw new Error(`No usecase found with reference: ${reference}`);
    }
    if (!result.description) {
        throw new Error("Usecase found but missing description property");
    }
    
    const response = await Gemini.process(
        GEMINI_API_KEY,
        "/v1beta/models/gemini-1.5-flash:generateContent",
        getTestCaseGenPrompt(result.description),
        "list"
    );
    
    const response_list = response.responseList;
    response_list.forEach((testcase: any) => {
        const body = {
            description: {
                overview: testcase.description.overview,
                steps: testcase.description.steps || [], 
                expectedOutcome: testcase.description.expectedOutcome || "", 
            },
            summary: testcase.summary || "", 
            priority: testcase.priority || "", 
            comments: testcase.comments || "", 
            components: testcase.components || "", 
            label: testcase.label || "",
            usecase: reference,
            reference: nanoid()
        };
        testcaseModel.create(body);
    });
    
    return response_list;
};

export const deleteTestcasesByUsecase = async (space: string, usecaseId: string, domain:string) => {
    const testcaseModel = getCollectionByName(space, domain);
    await testcaseModel.deleteMany({ usecaseId });
    return { message: "All testcases deleted successfully for usecase." };
}