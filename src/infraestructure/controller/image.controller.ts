import { Request, Response } from "express";
import path from "path";

class ImageController {
    constructor() {}

    public sendQRCodeController = async ({ body }: Request, res: Response) => {
        const svgPath = path.join(__dirname, '..', '..', '..', 'tmp', 'qr.svg');
console.log(svgPath);
        res.sendFile(svgPath, (error) => {
            if (error) {
                res.status(500).send('Error ocurred while serving the SVG image.')
            }
        });
    };
}

export default ImageController;
