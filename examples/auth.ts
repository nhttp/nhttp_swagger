import { Handler, HttpError } from "./deps.ts";

export const auth: Handler = ({ request }, next) => {
  const header = request.headers.get("authorization");
  if (header && header === "Bearer 1234") {
    return next();
  }
  throw new HttpError(401, "Unauthorized. please add token 1234");
};
