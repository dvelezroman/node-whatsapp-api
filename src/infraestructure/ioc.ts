import { ContainerBuilder } from "node-dependency-injection";
import { LeadCreate } from "../application/lead.create";
import LeadController from "./controller/lead.controller";
import MockRepository from "./repositories/mock.repository";
import WsTransporter from "./repositories/ws.external";
import ImageController from "./controller/image.controller";

const container = new ContainerBuilder();

/**
 * Initialize service of WS / Bot / Twilio
 */
container.register("ws.transporter", WsTransporter);
const wsTransporter = container.get("ws.transporter");

container.register("db.repository", MockRepository);
const dbRepository = container.get("db.repository");

container
    .register("lead.creator", LeadCreate)
    .addArgument([dbRepository, wsTransporter]);

const leadCreator = container.get("lead.creator");

container.register("lead.controller", LeadController).addArgument(leadCreator);
container.register("image.controller", ImageController);

export default container;
