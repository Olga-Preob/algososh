export const delay = (ms: number = 0, value: string | null, signal: AbortSignal) => {
  return new Promise((resolve, reject) => {
    const listener = () => {
      clearTimeout(timer);

      reject(new Error('Aborted'));
    }

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', listener);

      resolve(value);
    }, ms);

    if (signal?.aborted) listener();

    signal?.addEventListener('abort', listener);
  });
}
