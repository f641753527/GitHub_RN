import * as Types from './types.js';

console.log(Types);

export function UPDATE_THEME(theme) {
  return {
    type: Types.UPDATE_THEME,
    theme,
  };
}