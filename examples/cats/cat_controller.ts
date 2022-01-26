import {
  ApiBearerAuth,
  ApiDocument,
  ApiOperation,
  ApiParameter,
  ApiRequestBody,
  ApiResponse,
  BaseController,
  Controller,
  Get,
  Inject,
  Post,
  Status,
} from "../deps.ts";
import { CatSchema } from "./cat_schema.ts";
import CatService from "./cat_service.ts";

@ApiBearerAuth()
@ApiDocument({
  name: "Cat",
  description: "Sample doc cat",
})
@Controller("/cat")
class CatController extends BaseController {
  @Inject(CatService)
  private readonly catService!: CatService;

  @ApiResponse(200, { description: "OK" })
  @ApiResponse(401, { description: "Unauthorized" })
  @ApiOperation({ summary: "findAll cat" })
  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @ApiParameter({
    name: "id",
    in: "path",
    required: true,
  })
  @ApiResponse(200, { description: "OK" })
  @ApiResponse(401, { description: "Unauthorized" })
  @ApiOperation({ summary: "find by id cat" })
  @Get("/:id")
  findById() {
    const { params } = this.requestEvent;
    return this.catService.findById(params.id);
  }

  @ApiRequestBody(CatSchema)
  @ApiResponse(201, { description: "Created" })
  @ApiResponse(401, { description: "Unauthorized" })
  @ApiOperation({ summary: "save cat" })
  @Status(201)
  @Post()
  save() {
    return this.catService.save();
  }
}

export default CatController;
