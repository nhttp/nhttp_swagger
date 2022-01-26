## NHttp Swagger

[![License](https://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)

Swagger doc for [NHttp](https://github.com/nhttp/nhttp) framework based on OAS3.
Inspire [nestjs-swagger](https://github.com/nestjs/swagger) and
[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express).

> Requires [NHttp Controller](https://github.com/nhttp/nhttp_controller)

## Installation

### deno.land

```ts
import {...} from "https://deno.land/x/nhttp_swagger@0.0.1/mod.ts";
```

## Usage

```ts
import { NHttp } from "https://deno.land/x/nhttp@1.1.9/mod.ts";

import {
  addControllers,
  BaseController,
  Controller,
  Get,
} from "https://deno.land/x/nhttp_controller@0.8.0/mod.ts";

import {
  ApiDocument,
  ApiOperation,
  ApiResponse,
  DocumentBuilder,
  swagger,
} from "https://deno.land/x/nhttp_swagger@0.0.1/mod.ts";

@ApiDocument({
  name: "Doc user 1.0",
  description: "doc user description",
})
@Controller("/user")
class UserController extends BaseController {
  @ApiResponse(200, { description: "OK" })
  @ApiOperation({ summary: "get user" })
  @Get()
  getUser() {
    return "Hello";
  }
}

class Application extends NHttp {
  constructor() {
    super();
    this.use(addControllers([UserController]));

    // document builder
    const document = new DocumentBuilder()
      .setInfo({
        title: "Rest APIs for amazing app",
        version: "1.0.0",
        description: "This is the amazing app",
      })
      .addServer("http://localhost:8000")
      .build();

    // serve swagger
    swagger(this, "/api-docs", document);
  }
}

new Application().listen(8000, () => {
  console.log("Running on port 8000");
});

// serving on http://localhost:8000/api-docs
// lookup json http://localhost:8000/api-docs/json
```

## Run

```bash
deno run --allow-net application.ts
```

## Bearer Auth (JWT)

```ts
...
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiDocument,
    DocumentBuilder,
    swagger
} from "https://deno.land/x/nhttp_swagger@0.0.1/mod.ts";

@ApiBearerAuth()
@ApiDocument({
    name: "Doc user 1.0",
    description: "doc user description"
})
@Controller("/user")
class UserController extends BaseController {

    @ApiResponse(200, { description: "OK" })
    @ApiOperation({ summary: "get user" })
    @Get()
    getUser() {
        return "Hello";
    }
}

...

// builder
const document = new DocumentBuilder()
    .setInfo({
        title: "Rest APIs for amazing app",
        version: "1.0.0",
        description: "This is the amazing app",
    })
    .addServer("http://localhost:3000")
    // add this
    .addBearerAuth()
    .build()
```

## Params

```ts
...
import {
    ApiOperation,
    ApiResponse,
    ApiParameter,
    ApiDocument,
    DocumentBuilder,
    swagger
} from "https://deno.land/x/nhttp_swagger@0.0.1/mod.ts";

@ApiDocument({
    name: "Doc user 1.0",
    description: "doc user description"
})
@Controller("/user")
class UserController extends BaseController {

    @ApiParameter({
        name: "id",
        in: "path"
    })
    @ApiParameter({
        name: "name",
        in: "query"
    })
    @ApiResponse(200, { description: "OK" })
    @ApiOperation({ summary: "get user id" })
    @Get("/:id")
    getUserId() {
        return "Hello";
    }
}
...
```

## Request Body (Manual)

```ts
...
import {
    ApiOperation,
    ApiResponse,
    ApiRequestBody,
    ApiDocument,
    DocumentBuilder,
    swagger
} from "https://deno.land/x/nhttp_swagger@0.0.1/mod.ts";

@ApiDocument({
    name: "Doc user 1.0",
    description: "doc user description"
})
@Controller("/user")
class UserController extends BaseController {

    @ApiRequestBody({
        description: "Save User",
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        id: {
                            type: "integer"
                        }
                    }
                }
            }
        }
    })
    @ApiResponse(201, { description: "Created" })
    @ApiOperation({ summary: "save user" })
    @Post()
    save() {
        return "Success";
    }
}
...
```

## Request Body (auto generate)

```ts
...
import {
    ApiOperation,
    ApiResponse,
    ApiRequestBody,
    ApiDocument,
    DocumentBuilder,
    swagger
} from "https://deno.land/x/nhttp_swagger@0.0.1/mod.ts";

// import class validator
import {
  IsNumber,
  IsString
} from "https://cdn.skypack.dev/class-validator?dts";

// import class-validator-jsonschema
import { validationMetadatasToSchemas } from "https://cdn.skypack.dev/class-validator-jsonschema?dts";

class UserCreateDto {
  @IsString()
  name!: string;

  @IsNumber()
  id!: number;
}

@ApiDocument({
    name: "Doc user 1.0",
    description: "doc user description"
})
@Controller("/user")
class UserController extends BaseController {

    @ApiRequestBody({
        description: "Save User",
        required: true,
        schema: UserCreateDto
    })
    @ApiResponse(201, { description: "Created" })
    @ApiOperation({ summary: "save user" })
    @Post()
    save() {
        return "Success";
    }
}
...

// add to options
swagger(this, "/api-docs", document, { validationMetadatasToSchemas });
```

## License

[MIT](LICENSE)
