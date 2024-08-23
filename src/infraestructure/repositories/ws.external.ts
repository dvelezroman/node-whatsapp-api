import { Client, LocalAuth } from "whatsapp-web.js";
import { image as imageQr } from "qr-image";
import LeadExternal from "../../domain/lead.external.repository";

/**
 * Represents a Whatsapp transporter class.
 *
 * @extends Client
 * @implements LeadExternal
 */
class WsTransporter extends Client implements LeadExternal {
    private status = false;

    /**
     * Creates a new instance of the constructor.
     *
     * Constructs a new object with the provided authentication strategy and puppeteer configuration.
     * It initializes the object by calling the `initialize` method.
     * It sets up event listeners for the "ready", "auth_failure", and "qr" events.
     *
     * @constructor
     */
    constructor() {
        super({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: [
                    "--disable-setuid-sandbox",
                    "--unhandled-rejections=strict",
                ],
            },
        });

        console.log("Loading....");

        this.initialize();

        this.on("ready", () => {
            this.status = true;
            console.log("LOGIN_SUCCESS");
        });

        this.on("auth_failure", () => {
            this.status = false;
            console.log("LOGIN_FAIL");
        });

        this.on("qr", (qr) => {
            console.log("Scan the QRcode located in /tmp folder");
            this.generateImage(qr);
        });
    }

    /**
     * Sends a message to a specified phone number.
     * @param {Object} lead - The lead object containing the message and phone number.
     * @param {string} lead.message - The message to send.
     * @param {string} lead.phone - The phone number to send the message to.
     * @return {Promise} - A Promise that resolves with the response or an error object.
     *                    The response object contains the ID of the sent message.
     *                    The error object contains the error message.
     */
    async sendMsg(lead: { message: string; phone: string }): Promise<any> {
        try {
            if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
            const { message, phone } = lead;
            const response = await this.sendMessage(`${phone}@c.us`, message);
            return { id: response.id.id };
        } catch (e: any) {
            return Promise.resolve({ error: e.message });
        }
    }

    /**
     * Retrieves the current status of an object.
     *
     * @returns {boolean} The status of the object.
     */
    getStatus(): boolean {
        return this.status;
    }

    /**
     * Generates an image for the given base64 string.
     *
     * @param {string} base64 - The base64 string to generate the image from.
     * @returns {void}
     */
    private generateImage = (base64: string) => {
        const path = `${process.cwd()}/tmp`;
        let qr_svg = imageQr(base64, { type: "svg", margin: 4 });
        qr_svg.pipe(require("fs").createWriteStream(`${path}/qr.svg`));
        console.log(`⚡ Recuerda que el QR se actualiza cada minuto ⚡'`);
        console.log(`⚡ Actualiza F5 el navegador para mantener el mejor QR⚡`);
    };
}

export default WsTransporter;
