import * as Helper from "./helper";

export const generateUsecase = async (req: any, res: any) => {
    const domain = req.params.domain;
    const space = req.params.space;
    const reference = req.params.reference;
    const response: any = await Helper.generateUsecase(domain, space, reference);
    res.status(200);
    res.send(response);
    res.end();
};

export const deleteUsecases = async (req: any, res: any) => {
    const space = req.params.space;
    const domain = req.params.domain;
    const response: any = await Helper.deleteUsecases(space, domain);
    res.status(200);
    res.send(response);
    res.end();
}
