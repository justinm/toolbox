type Callback<T> = () => T;

export function tryOrUndefined<T>(callback: Callback<T>) {
  try {
    return callback();
  } catch (err) {
    return undefined;
  }
}
