import { TimedInputBuffer } from '../input/TimedInputBuffer.js';
import { GameSystem } from "./GameSystem.js";
import { ANALOG_INPUT_KEY, DIGITAL_INPUT_KEY, INPUT_KEY } from "../input/InputTypes.js";
import { InputEventListener } from '../input/InputEventListener.js';

const MINIMUM_RESOLUTION = 1;
const BUFFER_SIZE = 2000;

export class InputSystem implements GameSystem {
    private buffer?: TimedInputBuffer;
    private inputEventListener?: InputEventListener;
    private digitalEventToBitMap: Map<DIGITAL_INPUT_KEY, number> = new Map();
    private analogEventsToIndexMap: Map<ANALOG_INPUT_KEY, number> = new Map();
    private isInitialized: boolean = false;
    private printIntervalId?: number;
    private lastPrintTimestamp: number = 0;

    private handleDigitalEvent = (timeStamp : number, key: DIGITAL_INPUT_KEY, value: boolean) => {
        const bit = this.digitalEventToBitMap.get(key);
        if (bit !== undefined && this.buffer) {
            this.buffer.writeDigitalEvent(timeStamp, bit, value);
        }
    };

    private handleAnalogEvent = (timeStamp : number, key: ANALOG_INPUT_KEY, value: number) => {
        const index = this.analogEventsToIndexMap.get(key);
        if (index !== undefined && this.buffer) {
            this.buffer.writeAnalogEvent(timeStamp, value, index);
        }
    };

    init(): void {

        this.buffer = new TimedInputBuffer({
            digitalFieldCount: this.digitalEventToBitMap.size,
            analogFieldCount: this.analogEventsToIndexMap.size,
            bufferSize: BUFFER_SIZE,
            resolutionMs: MINIMUM_RESOLUTION
        });

        const registeredKeys: INPUT_KEY[] = [...this.digitalEventToBitMap.keys(), ...this.analogEventsToIndexMap.keys()];

        this.inputEventListener = new InputEventListener({
            digitalEventCallback: this.handleDigitalEvent,
            analogEventCallback: this.handleAnalogEvent,
            registeredKeys: registeredKeys
        });
        this.inputEventListener.startListening();
        this.isInitialized = true;
    }

    bindDigitalKey(code: DIGITAL_INPUT_KEY): void {
        if (this.isInitialized) return;
        if (!this.digitalEventToBitMap.has(code)) {
            this.digitalEventToBitMap.set(code, this.digitalEventToBitMap.size);
        }
    }

    unbindDigitalKey(code: DIGITAL_INPUT_KEY): void {
        if (this.isInitialized) return;

        if (this.digitalEventToBitMap.delete(code)) {
            this.reindexDigitalMap();
        }
    }

    bindAnalogKey(code: ANALOG_INPUT_KEY): void {
        if (this.isInitialized) return;
        if (!this.analogEventsToIndexMap.has(code)) {
            this.analogEventsToIndexMap.set(code, this.analogEventsToIndexMap.size);
        }
    }

    unbindAnalogKey(code: ANALOG_INPUT_KEY): void {
        if (this.isInitialized) return;

        if (this.analogEventsToIndexMap.delete(code)) {
            this.reindexAnalogMap();
        }
    }

    private reindexDigitalMap(): void {
        let i = 0;
        for (const key of this.digitalEventToBitMap.keys()) {
            this.digitalEventToBitMap.set(key, i++);
        }
    }

    private reindexAnalogMap(): void {
        let i = 0;
        for (const key of this.analogEventsToIndexMap.keys()) {
            this.analogEventsToIndexMap.set(key, i++);
        }
    }

    /**
     * Periodically prints input events between last poll and now.
     * Call this once to start polling.
     */
    printInputEventsDemo(pollMs: number = 500) {
        if (!this.buffer) {
            console.warn('InputSystem: Buffer not initialized.');
            return;
        }
        if (this.printIntervalId) return; // Already running
        this.lastPrintTimestamp = Date.now();
        this.printIntervalId = window.setInterval(() => {
            const now = Date.now();
            const events = this.buffer!.readEventsBetween(this.lastPrintTimestamp, now);
            if (events.length > 0) {
                console.log('Polled input events:', events);
            }
            this.lastPrintTimestamp = now;
        }, pollMs);
    }
}
