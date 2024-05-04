interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  clear: () => void;
  getSize: () => number;
  getElements: () => T[];
}


export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peak = (): T | null => {
    if (this.container[this.container.length - 1]) {
      return this.container[this.container.length - 1];
    }
    return null;
  };

  clear = (): void => {
    for (let i = this.container.length - 1; i >= 0; i--) {
      this.pop();
    }
  }

  getSize = () => this.container.length;

  getElements = () => this.container;
}
