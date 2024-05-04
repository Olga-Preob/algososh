interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  peak: () => T | null;
  isEmpty: () => boolean;
  getElements: () => T[];
  getHead: () => number;
  getTail: () => number;
}

export class Queue<T> implements IQueue<T> {
  private container: T[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    this.container[(this.tail % this.size)] = item;

    this.tail++;
    this.length = this.tail - this.head;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    delete this.container[(this.head % this.size)];

    this.head++;
    this.length = this.tail - this.head;
  };

  clear = () => {
    while (this.tail > this.head) {
      this.dequeue();
    }

    this.head = 0;
    this.tail = 0;
    this.length = this.tail - this.head;
  }

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  getElements = () => this.container;

  getHead = () => this.head;

  getTail = () => this.tail;
}
