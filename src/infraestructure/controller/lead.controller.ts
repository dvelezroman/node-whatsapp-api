import { Request, Response } from "express";
import { LeadCreate } from "../../application/lead.create";

class LeadController {
    constructor(private readonly leadCreator: LeadCreate) {}

    public sendController = async ({ body }: Request, res: Response) => {
        const { message, phone } = body;
        const response = await this.leadCreator.sendMessageAndSave({ message, phone })
        res.send(response);
    };
}

export default LeadController;