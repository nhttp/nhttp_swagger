import { auth } from "./auth.ts";
import CatController from "./cats/cat_controller.ts";
import { addControllers, DocumentBuilder, NHttp, swagger } from "./deps.ts";

export class Application extends NHttp {
  constructor() {
    super();
    this.use(auth, addControllers([CatController]));
    const doc = new DocumentBuilder()
      .setInfo({
        title: "This amazing cat examples",
        version: "1.0.0",
        description:
          "This is a sample server Cat server. please add authorize **1234**",
      })
      .addBearerAuth()
      .addSchemes("http")
      .addServer("http://localhost:8000")
      .build();

    swagger(this, "/api-docs", doc);
  }
}
