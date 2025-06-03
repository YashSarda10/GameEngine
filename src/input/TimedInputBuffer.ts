export interface TimedInputBufferConfig {
    digitalFieldCount: number;   // Number of digital input fields
    analogFieldCount: number;    // Number of analog input fields
    bufferSize: number;          // Size of the buffer in number of events
    resolutionMs: number;        // Time resolution of the buffer in milliseconds
}

export interface InputEvent {
    timestamp: number;          // Timestamp of the event
    digital: number;            // Bitmask for digital inputs
    analog: number[];          // Array of analog input values
}

export class TimedInputBuffer {

    private readonly bufferSize: number;
    private readonly digitalFieldCount: number;
    private readonly analogFieldCount: number;

    private readonly timestamp: Uint32Array;
    private readonly digital: Uint32Array;
    private readonly analog: Int16Array[];

    constructor(config: TimedInputBufferConfig) {
        this.digitalFieldCount = config.digitalFieldCount;
        this.analogFieldCount = config.analogFieldCount;
        this.bufferSize = config.bufferSize;

        this.timestamp = new Uint32Array(this.bufferSize);
        this.digital = new Uint32Array(this.bufferSize);
        this.analog = Array.from({ length: this.analogFieldCount }, () =>
            new Int16Array(this.bufferSize)
        );
    }

    writeAnalogEvent(timeStamp:number, analogEvent: number, analogEventIndex: number) {
        const index = timeStamp % this.bufferSize;
        if(this.timestamp[index] <= timeStamp){
            this.analog[analogEventIndex][index] = analogEvent || 0;
        }
    }

    writeDigitalEvent(timeStamp:number, bitPosition: number, bitValue: boolean) {
        const index = timeStamp % this.bufferSize;

        if (this.timestamp[index] <= timeStamp) {
            if (bitValue) {
                // Set the bit at bitPosition
                this.digital[index] = this.digital[index] | (1 << bitPosition);
            } else {
                // Clear the bit at bitPosition
                this.digital[index] = this.digital[index] & ~(1 << bitPosition);
            }
        }
    }

    //TODO: remove new array creation
    readEventsBetween(startTime: number, endTime: number) {
        const events: InputEvent[] = [];

        for (let offset = 0; offset <= endTime - startTime; offset++) {
            const t = startTime + offset;
            const index = t % this.bufferSize;
            const storedTimestamp = this.timestamp[index];

            if (storedTimestamp === t) {
                events.push({
                    timestamp: t,
                    digital: Number(this.digital[index]),
                    analog: this.analog.map(arr => arr[index]),
                });
            }
        }

        return events;
    }
}
