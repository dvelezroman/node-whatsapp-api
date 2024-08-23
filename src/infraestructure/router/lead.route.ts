import express, { Router } from "express";
import LeadController from "../controller/lead.controller";
import container from "../ioc";
import ImageController from "../controller/image.controller";
const router: Router = Router();

/**
 * @classdesc Controller for managing leads in the application.
 * @class
 * @name LeadCtrl
 */
const leadController: LeadController = container.get("lead.controller");
const imageController: ImageController = container.get("image.controller");
router.post("/", leadController.sendController);
router.get("/image", imageController.sendQRCodeController);

export { router };
