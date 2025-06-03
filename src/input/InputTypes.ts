export enum KEYBOARD_KEY {
    KEY_W = 'KeyW',
    KEY_A = 'KeyA',
    KEY_S = 'KeyS',
    KEY_D = 'KeyD',
    KEY_R = 'KeyR',
    UP = 'ArrowUp',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    RIGHT = 'ArrowRight',
    SPACE = 'Space',
    ENTER = 'Enter',
    ESCAPE = 'Escape',
    SHIFT_LEFT = 'ShiftLeft',
    CTRL_LEFT = 'ControlLeft',
    ALT_LEFT = 'AltLeft',
    BACKSPACE = 'Backspace',
    DELETE = 'Delete',
    TAB = 'Tab',
}
export enum MOUSE_BUTTON_KEY {
    MOUSE_LEFT = 'MouseLeft',
    MOUSE_MIDDLE = 'MouseMiddle',
    MOUSE_RIGHT = 'MouseRight',
}

export enum MOUSE_MOVEMENT_KEY {
    MOUSE_X = 'MouseX',
    MOUSE_Y = 'MouseY',
}

export type ANALOG_INPUT_KEY = MOUSE_MOVEMENT_KEY;
export type DIGITAL_INPUT_KEY = MOUSE_BUTTON_KEY | KEYBOARD_KEY;
export type INPUT_KEY = DIGITAL_INPUT_KEY | ANALOG_INPUT_KEY;