import { GameLoop } from './game/GameLoop.js';
import { InputSystem } from './system/InputSystem.js';
import { PhysicsSystem } from './system/PhysicsSystem.js';
import { RenderSystem } from './system/RenderSystem.js';
import {KEYBOARD_KEY, MOUSE_MOVEMENT_KEY} from "./input/InputTypes.js";

const loop = new GameLoop();

const inputSystem = new InputSystem();
// Bind some common keys for demo
inputSystem.bindDigitalKey(KEYBOARD_KEY.KEY_W);
inputSystem.bindDigitalKey(KEYBOARD_KEY.KEY_A);
inputSystem.bindDigitalKey(KEYBOARD_KEY.KEY_S);
inputSystem.bindDigitalKey(KEYBOARD_KEY.KEY_D);
inputSystem.bindAnalogKey(MOUSE_MOVEMENT_KEY.MOUSE_X);
inputSystem.bindAnalogKey(MOUSE_MOVEMENT_KEY.MOUSE_Y);

loop.registerSystem('input', inputSystem);
loop.registerSystem('physics', new PhysicsSystem());
loop.registerSystem('render', new RenderSystem());

loop.init().then(() => {
    loop.start();
    // Start polling and printing input events
    inputSystem.printInputEventsDemo(500);
});
