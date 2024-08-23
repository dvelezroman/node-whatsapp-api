import { readdirSync } from "fs";
import express, { Router } from "express";
const router: Router = Router();

const PATH_ROUTES = __dirname;

/**
 * Removes the file extension from the given filename.
 *
 * @param {string} fileName - The name of the file including the extension.
 * @return {string} The filename without the extension.
 */
function removeExtension(fileName: string): string {
    const cleanFileName = <string>fileName.split(".").shift();
    return cleanFileName;
}

/**
 * Loads a router module dynamically based on the given file name.
 * Adds the router module to the main router under a specific path.
 *
 * @param {string} file - The file name of the router module to load.
 * @return {void}
 */
function loadRouter(file: string): void {
    const name = removeExtension(file);
    if (name !== "index") {
        import(`./${file}`).then((routerModule) => {
            console.log("loaded", name);
            router.use(`/${name}`, routerModule.router);
        });
    }
}

readdirSync(PATH_ROUTES).filter((file) => loadRouter(file));

export default router;
