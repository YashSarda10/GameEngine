import {
    ANALOG_INPUT_KEY,
    DIGITAL_INPUT_KEY,
    INPUT_KEY,
    KEYBOARD_KEY,
    MOUSE_BUTTON_KEY,
    MOUSE_MOVEMENT_KEY
} from "./InputTypes.js";


export class InputEventListener {
    private readonly registeredEventTypes: Set<INPUT_KEY>;
    private listening: boolean = false;
    private handlerMap: Map<string, (event: any) => void> = new Map();
    private readonly digitalEventCallback?: (timeStamp: number, key: DIGITAL_INPUT_KEY, value: boolean) => void;
    private readonly analogEventCallback?: (timeStamp: number, key: ANALOG_INPUT_KEY, value: number) => void;

    constructor(
        options: {
            digitalEventCallback?: (timeStamp: number, key: DIGITAL_INPUT_KEY, value: boolean) => void,
            analogEventCallback?: (timeStamp: number, key: ANALOG_INPUT_KEY, value: number) => void,
            registeredKeys: INPUT_KEY[],
        }
    ) {
        if (!options.digitalEventCallback && !options.analogEventCallback) {
            throw new Error("At least one of digitalEventCallback or analogEventCallback must be provided.");
        }
        if (!options.registeredKeys || options.registeredKeys.length === 0) {
            throw new Error("At least one key must be registered.");
        }
        this.digitalEventCallback = options.digitalEventCallback;
        this.analogEventCallback = options.analogEventCallback;
        this.registeredEventTypes = new Set(options.registeredKeys);
    }

    public startListening() {
        if (this.listening) {
            console.warn("InputEventListener is already listening.");
            return;
        }

        this.listening = true;
        this.setupKeyboardListeners();
        this.setupMouseButtonListeners();
        this.setupMouseMoveListener();
    }

    public stopListening() {
        for (const [type, handler] of this.handlerMap.entries()) {
            window.removeEventListener(type, handler);
        }
        this.handlerMap.clear();
        this.listening = false;
    }

    private setupKeyboardListeners() {
        if(!this.digitalEventCallback || !Array.from(this.registeredEventTypes).some(k => Object.values(KEYBOARD_KEY).includes(k as any))) {
            return; // Only add keyboard listeners if any digital keyboard keys are registered
        }

        this.handlerMap.set('keydown', (event: KeyboardEvent) => {
            const code = event.code as KEYBOARD_KEY;
            console.log('[InputEventListener] keydown event:', code);
            if (this.registeredEventTypes.has(code)) {
                this.digitalEventCallback!(event.timeStamp,code, true);
            }
        });
        this.handlerMap.set('keyup', (event: KeyboardEvent) => {
            const code = event.code as DIGITAL_INPUT_KEY;
            console.log('[InputEventListener] keyup event:', code);
            if (this.registeredEventTypes.has(code)) {
                this.digitalEventCallback!(event.timeStamp,code, false);
            }
        });

        window.addEventListener('keydown', this.handlerMap.get('keydown')!);
        window.addEventListener('keyup', this.handlerMap.get('keyup')!);
    }

    private setupMouseButtonListeners() {
        if(!this.digitalEventCallback || !Array.from(this.registeredEventTypes).some(k => Object.values(MOUSE_BUTTON_KEY).includes(k as any))) {
            return; // Only add mouse button listeners if any digital mouse keys are registered
        }

        const mouseKeys: Record<number, DIGITAL_INPUT_KEY> = {
            0: MOUSE_BUTTON_KEY.MOUSE_LEFT,
            1: MOUSE_BUTTON_KEY.MOUSE_MIDDLE,
            2: MOUSE_BUTTON_KEY.MOUSE_RIGHT,
        };

        this.handlerMap.set('mousedown', (event: MouseEvent) => {
            const code = mouseKeys[event.button];
            console.log('[InputEventListener] mousedown event:', code);
            if (code && this.registeredEventTypes.has(code)) {
                this.digitalEventCallback!(event.timeStamp,code, true);
            }
        });
        this.handlerMap.set('mouseup', (event: MouseEvent) => {
            const code = mouseKeys[event.button];
            console.log('[InputEventListener] mouseup event:', code);
            if (code && this.registeredEventTypes.has(code)) {
                this.digitalEventCallback!(event.timeStamp,code, false);
            }
        });

        window.addEventListener('mousedown', this.handlerMap.get('mousedown')!);
        window.addEventListener('mouseup', this.handlerMap.get('mouseup')!);
    }

    private setupMouseMoveListener() {
        if(!this.analogEventCallback || !Array.from(this.registeredEventTypes).some(k => Object.values(MOUSE_MOVEMENT_KEY).includes(k as any))) {
            return; // Only add mousemove listener if any analog mouse keys are registered
        }

        this.handlerMap.set('mousemove', (event: MouseEvent) => {
            console.log('[InputEventListener] mousemove event:', event.movementX, event.movementY);
            if (this.registeredEventTypes.has(MOUSE_MOVEMENT_KEY.MOUSE_X)) {
                this.analogEventCallback!(event.timeStamp,MOUSE_MOVEMENT_KEY.MOUSE_X, event.movementX);
            }
            if (this.registeredEventTypes.has(MOUSE_MOVEMENT_KEY.MOUSE_Y)) {
                this.analogEventCallback!(event.timeStamp,MOUSE_MOVEMENT_KEY.MOUSE_Y, event.movementY);
            }
        });

        window.addEventListener('mousemove', this.handlerMap.get('mousemove')!);
    }
}
