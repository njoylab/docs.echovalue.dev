---
weight: 45
title: OpenAPI Specification
---

# OpenAPI Specification

The EchoValue API is fully documented using the **OpenAPI 3.0** specification format.

## Download Specification

📥 **[Download openapi.yaml](/openapi.yaml)**

## View & Test

### Swagger Editor
Open the specification in Swagger Editor to explore and test the API:

🔗 [Open in Swagger Editor](https://editor.swagger.io/?url=https://docs.echovalue.dev/openapi.yaml)

### Swagger UI
View the interactive API documentation:

🔗 [Open in Swagger UI](https://petstore.swagger.io/?url=https://docs.echovalue.dev/openapi.yaml)

## Use Cases

### Generate Client SDKs

Use tools like [OpenAPI Generator](https://openapi-generator.tech/) to generate client libraries:

```shell
# Generate JavaScript client
openapi-generator-cli generate \
  -i https://docs.echovalue.dev/openapi.yaml \
  -g javascript \
  -o ./echovalue-client

# Generate Python client
openapi-generator-cli generate \
  -i https://docs.echovalue.dev/openapi.yaml \
  -g python \
  -o ./echovalue-client

# Generate Go client
openapi-generator-cli generate \
  -i https://docs.echovalue.dev/openapi.yaml \
  -g go \
  -o ./echovalue-client
```

### Import into API Tools

Import the OpenAPI specification into your favorite API development tool:

- **Postman**: File → Import → Link → Paste OpenAPI URL
- **Insomnia**: Create → Import From → URL → Paste OpenAPI URL
- **Paw**: File → Import → Paste OpenAPI URL
- **HTTPie Desktop**: Import → OpenAPI → Paste OpenAPI URL

### API Validation

Use the specification for request/response validation in your tests:

```javascript
// Example with jest-openapi
const jestOpenAPI = require('jest-openapi');
jestOpenAPI('https://docs.echovalue.dev/openapi.yaml');

test('GET /default/mykey returns valid response', async () => {
  const response = await fetch('https://api.echovalue.dev/default/mykey', {
    headers: { 'x-token': 'mytoken' }
  });
  expect(response).toSatisfyApiSpec();
});
```

### Mock Server

Create a mock API server for testing:

```shell
# Using Prism
npx @stoplight/prism-cli mock \
  https://docs.echovalue.dev/openapi.yaml

# Mock server will run on http://127.0.0.1:4010
```

## Specification Details

The OpenAPI specification includes:

✅ All API endpoints (Key-Value Operations, Token Management, Logs)
✅ Request/response schemas
✅ Authentication requirements
✅ Error responses
✅ Parameter validation rules
✅ Examples for all operations
✅ Rate limits and cost information

## Keep Updated

The OpenAPI specification is automatically updated with each documentation release. Always use the latest version from:

**https://docs.echovalue.dev/openapi.yaml**

<aside class="notice">
The OpenAPI specification is version-controlled alongside the documentation. Check the <a href="https://github.com/njoylab/docs.echovalue.dev">GitHub repository</a> for the history of changes.
</aside>
