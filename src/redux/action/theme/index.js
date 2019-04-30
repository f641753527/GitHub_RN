import * as Types from './types.js';

export function UPDATE_THEME(theme) {
  return {
    type: Types.UPDATE_THEME,
    theme,
  };
}