import { GameLoop } from './game/GameLoop';
import { InputSystem } from './system/InputSystem';
import { PhysicsSystem } from './system/PhysicsSystem';
import { RenderSystem } from './system/RenderSystem';
import {KEYBOARD_KEY, MOUSE_MOVEMENT_KEY} from "./input/InputTypes";

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
