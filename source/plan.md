You are a Senior Backend Engineer.

Analyze the entire Frontend source code inside the techzone folder and build a complete Backend inside the server folder based strictly on what the Frontend is already using.

Critical Requirements:

Do NOT redesign business flow or data structure if the Frontend already defines them.
All APIs, models, entities, and response structures must map exactly to the current Frontend implementation.
Before implementing anything, thoroughly analyze the existing Backend source code to understand:
project architecture
coding style
naming conventions
package/module organization
existing patterns (service, repository, dto, mapper, io, exception, validation, auth, etc.)
response/error handling conventions
All newly implemented code must follow the exact same conventions and architecture so the entire project looks like it was developed by the same team.

Implementation Requirements

Analyze the Frontend (techzone)
Scan the entire Frontend source including:
pages
components
hooks
services/api
store/state management
constants
mock data
routing

Identify:

all business flows
all APIs required by the FE
request/response structures
model/entity structures
validation rules
pagination/filter/search/sort logic
authentication/authorization flow
cart/order/payment flow (if any)
admin flow (if any)
Analyze the Existing Backend
Read and analyze the current Backend implementation before coding.

Understand:

package structure
base entity
generic response structure
exception handling
security configuration
JWT/authentication flow
repository pattern
service pattern
mapper/converter usage
DTO/IO naming conventions
config management
logging
utility/helper classes
transaction handling

All new code must strictly follow the existing project conventions.

Build the Backend Completely
Implement all required layers including:
controller
service
service implementation
repository
entity
dto/io/request/response
mapper
validation
exception handling
pagination
search/filter/sort
authentication/authorization
upload handling (if required by FE)
database relationships
migration/init seed data if needed
Accurate FE Mapping
Database entities must map exactly to the data rendered by the Frontend.
API responses must keep the same field naming currently used by the FE.
Avoid changing naming conventions that would require major FE refactoring.
If the FE currently uses mock data, convert those mocks into real database entities and APIs.
Code Quality Requirements
The code must be:
clean architecture
maintainable
production-ready
free of duplicated logic
properly layered
SOLID-compliant
consistently named
properly validated
equipped with proper exception handling
optimized to avoid issues like N+1 queries
reusable where appropriate through base classes/shared services
Implementation Process
Before coding:
list existing features
list missing features
list APIs that need to be created
describe entity relationships

Then implement feature-by-feature end-to-end.

Important:

Do NOT generate pseudo code.
Do NOT leave fake TODOs.
All generated code must be runnable.
If Anything Is Unclear
Do NOT guess important business logic.
Ask for clarification before implementing uncertain requirements.
