import { Mode } from "./enums";

export const mode = process.env.MODE ?? Mode.development;
export function isDevelopmentMode() {
    return mode == Mode.development;
}
