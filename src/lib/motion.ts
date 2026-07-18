// Shared easing curves — stronger than the built-in CSS/Framer defaults.
// See: https://easing.dev
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

// Applied to any pressable element (button, link-as-button, card) for tactile feedback.
export const PRESS = 'transition-transform duration-150 active:scale-[0.97]';
