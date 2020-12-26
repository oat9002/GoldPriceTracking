import axios from "axios";
import childProcess from "child_process";
import { mapDockerWebHook } from "../models/DockerWebHook";
import { STATUS_CODE } from "../util/enums";

const exec = childProcess.exec;

export async function validateDeploymentRequest(req: any) {
    const dockerWebHook = mapDockerWebHook(req);
    const response = await axios.post(dockerWebHook.callbackUrl, dockerWebHook);

    if (
        response.status === STATUS_CODE.OKAY &&
        response.data.state === "success"
    ) {
        return true;
    }

    return false;
}

export function deploy() {
    const result = exec("sh ../../../../deploy.sh");

    if (result.exitCode === 0) {
        return true;
    }

    return false;
}
