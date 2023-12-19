/**
 * 等待异步函数完成并至少延迟幾秒的函数
 * @param asyncFunction 要等待的异步函数
 * @param delayMs 延遲秒數，預設為 300 毫秒
 * @returns 异步函数的结果
 */
export async function delayAsyncFunc<T>(asyncFunction: Promise<T>, delayMs: number = 300): Promise<T> {
  const start = Date.now();
  const result = await asyncFunction;
  const elapsedTime = Date.now() - start;
  const additionalDelay = Math.max(0, delayMs - elapsedTime);
  await new Promise((resolve) => setTimeout(resolve, additionalDelay));
  return result;
}
