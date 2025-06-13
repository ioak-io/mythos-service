import { nanoid } from "nanoid";
import { getCollectionByName } from "../../../lib/dbutils";
import { getUseCaseGenPrompt } from "./prompt";
import { Gemini } from "aihub";
const {GEMINI_API_KEY} = require("../../../../env.js");

export const generateUsecase = async (
    domain: string,
    space: string,
    reference: string
) => {
    const requiredDomain = "requirement";
    const model = getCollectionByName(space, requiredDomain)
    const data = await model.findOne({ reference });
    const response = await Gemini.process(
        GEMINI_API_KEY, "/v1beta/models/gemini-1.5-flash:generateContent",
        getUseCaseGenPrompt(data.description),
        "list"
    )
    const response_list = response.responseList;
    const usecaseModel = getCollectionByName(
        space,
        domain
    )
    response_list.forEach((usecase: any) => {
        const body = { title: usecase.title, description: usecase.description, reference: nanoid(), requirement: reference };
        usecaseModel.create(body);
    });
    return response_list;
};

export const deleteUsecases = async(space: string, domain:string) =>{
    const usecaseModel = getCollectionByName(space, domain);
    await usecaseModel.deleteMany({});
    return { message: "All usecases deleted successfully." };
}