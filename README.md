src/

├── components/                # Definitions of all ECS components
│   ├── PhysicsComponent.ts
│   ├── RenderComponent.ts
│   ├── NetworkComponent.ts
│   ├── InputComponent.ts
│   ├── TagComponent.ts
│   └── RelationshipComponent.ts
│   ├── ComponentTypes.ts       # Enum-like mapping of component IDs

├── entity/                    # Entity definitions and ECS metadata
│   ├── Entity.ts
│   ├── EntityManager.ts
│   └── EntityComponentMasks.ts

├── input/                     # Input system: event handling and buffering
│   ├── InputHandler.ts         # Listens to raw browser input (DOM events)
│   ├── InputProcessor.ts       # Converts raw events to game input commands
│   ├── InputBuffer.ts          # Time-indexed storage of processed input events
│   ├── InputCleaner.ts         # Cleans old input data from buffers
│   ├── InputTypes.ts           # Input enums, key definitions
│   └── InputSnapshot.ts        # Optional: per-frame aggregation of inputs

├── physics/                   # Physics simulation and collision systems
│   ├── PhysicsEngine.ts        # Core physics stepping
│   ├── Collider.ts             # Collision bounds, AABB, etc.
│   ├── RigidBody.ts            # Velocity, acceleration, mass, etc.
│   └── PhysicsTypes.ts         # Physics enums, constants

├── render/                    # Rendering systems and visual abstractions
│   ├── Renderer.ts             # Core rendering loop
│   ├── RenderComponents.ts     # Shape, texture, sprite data
│   ├── Animation.ts            # MVP+ animation utilities
│   └── Shader.ts               # MVP+ shader support

├── network/                   # Networking logic (MVP++)
│   ├── NetworkManager.ts       # Client/server logic, sync state
│   ├── NetworkTypes.ts         # Network message enums
│   └── NetworkBuffer.ts        # Incoming/outgoing packet buffers

├── system/                    # ECS Systems (operate on components)
│   ├── InputSystem.ts
│   ├── PhysicsSystem.ts
│   ├── RenderSystem.ts
│   ├── NetworkSystem.ts
│   ├── RelationshipSystem.ts

├── game/                      # Game-specific logic, scene init
│   ├── GameLoop.ts             # Central fixed-timestep loop controller
│   ├── GameState.ts            # High-level game state manager
│   └── GameEntities.ts         # Entity creation factory

├── utils/                     # General-purpose helpers and perf-optimized structures
│   ├── RingBuffer.ts           # Fixed-size buffer (input or network)
│   ├── Timer.ts                # DeltaTime, FPS, tick counters
│   ├── EventQueue.ts           # Basic queue for discrete events
│   ├── MathUtils.ts            # Common math helpers (vec2, clamp, lerp)
│   ├── Logger.ts               # Configurable logger
│   └── MiscHelpers.ts          # Fallback / formatting utils

├── tests/                     # Unit and integration test suites

├── docs/                      # Internal dev logs, architecture discussions
│   └── system_design.md        # Dev log or copy from Google Docs

├── package.json
├── tsconfig.json
└── README.md
