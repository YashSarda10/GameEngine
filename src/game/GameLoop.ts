import { GameSystem } from '../system/GameSystem';

export class GameLoop {
    private systems: Map<string, GameSystem> = new Map();
    private isRunning: boolean = false;
    private isInitialized: boolean = false;

    public registerSystem(name: string, system: GameSystem): void {
        if (this.isInitialized) {
            throw new Error(`Cannot register system "${name}" after initialization.`);
        }
        if (this.systems.has(name)) {
            throw new Error(`System "${name}" is already registered.`);
        }
        this.systems.set(name, system);
    }

    public deregisterSystem(name: string): void {
        if (this.isInitialized) {
            throw new Error(`Cannot deregister system "${name}" after initialization.`);
        }
        this.systems.delete(name);
    }

    public async init(): Promise<void> {
        for (const system of this.systems.values()) {
            await system.init?.();
        }
        this.isInitialized = true;
    }

    public start(): void {
        if (!this.isInitialized) {
            throw new Error("GameLoop must be initialized before starting.");
        }
        if (this.isRunning) return;
        this.isRunning = true;
        this.loop();
    }

    public stop(): void {
        this.isRunning = false;
    }

    private loop = (timestamp?: DOMHighResTimeStamp): void => {
        if (!this.isRunning) return;
        for (const system of this.systems.values()) {
            system.update?.(timestamp);
        }
        requestAnimationFrame(this.loop);
    }
}
