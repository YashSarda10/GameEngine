/src

    /core                     # Core engine systems & utilities

    /entity                 # Entity management
        Entity.ts
        EntityManager.ts
        EntityComponentMasks.ts

    /component              # Component definitions & enums
        ComponentTypes.ts

    components/           # Individual component interfaces & implementations
        PhysicsComponent.ts
        RenderComponent.ts
        NetworkComponent.ts
        InputComponent.ts
        TagComponent.ts
        RelationshipComponent.ts

    /system                 # Systems that operate on components/entities
        PhysicsSystem.ts
        RenderSystem.ts
        NetworkSystem.ts
        InputSystem.ts
        RelationshipSystem.ts

    /utils                  # Utility functions, helpers
        RingBuffer.ts
        Timer.ts
        EventQueue.ts
    
    /input                    # Input handling subsystem
        InputBuffer.ts          # Ring buffer or event buffer for input events
        InputCleaner.ts         # Cleans up old buffers/events
        InputHandler.ts         # Event listeners, raw event capture
        InputProcessor.ts       # Converts raw events into game input commands
        InputTypes.ts           # Input event & key enums/types
        InputSnapshot.ts        # Snapshot/aggregation of inputs per frame (if needed)
    
    /render                   # Rendering subsystem
        Renderer.ts             # Main rendering controller
        RenderComponents.ts     # Definitions for render components (shapes, textures, lights)
        Animation.ts            # Animation related logic
        Shader.ts               # Shaders (MVP+)
    
    /physics                  # Physics subsystem
        PhysicsEngine.ts        # Physics loop and core computation
        Collider.ts             # Collider definitions and handling
        RigidBody.ts            # Rigid body data
        PhysicsTypes.ts         # Enums and types for physics properties
    
    /network                  # Networking subsystem
        NetworkManager.ts       # Manages connections, protocols
        NetworkTypes.ts         # Enums and types for network data
        NetworkBuffer.ts        # Buffer for network packets/events
    
    /game                     # Game-specific logic (MVP & beyond)
        GameLoop.ts             # Main game loop controller
        GameState.ts            # Current state of the game world
        GameEntities.ts         # Game entity initialization & management
    
    /tests                      # Unit & integration tests for all subsystems
    
    /docs                       # Design docs, dev log, architecture notes (mirroring Google Docs)

    package.json
    tsconfig.json
    README.md