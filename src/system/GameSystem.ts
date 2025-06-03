export interface GameSystem {
    init?(): Promise<void> | void;
    update?(deltaTime?: number): void;
}