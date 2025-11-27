/**
 * Затримує виконання коду на вказану кількість мілісекунд (ms).
 * Ця функція використовує Promise, що дозволяє використовувати її з async/await.
 *
 * @param ms - Час затримки в мілісекундах.
 * @returns Promise, який вирішується після закінчення часу затримки.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
