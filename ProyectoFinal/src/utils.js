import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));
export const convBoolean = (data) => {
  if (data === "true") return true;
  if (data === "false") return false;
  return null;
};
