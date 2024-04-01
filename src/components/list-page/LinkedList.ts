import { LinkedListNode } from './LinkedListNode';


interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  addByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
  toArray: () => T[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  append = (element: T) => {
    this.addByIndex(element, this.size);
  }

  prepend = (element: T) => {
    this.addByIndex(element, 0);
  }

  addByIndex = (element: T, position: number) => {
    if (position < 0 || position > this.size) {
      console.log('Enter a valid index');

      return;
    }

    let newNode = new LinkedListNode(element);

    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let currentNode = this.head;
      let prevNode = null;

      let currIndex = 0;

      while (currIndex < position) {
        prevNode = currentNode;
        if (currentNode) currentNode = currentNode.next;

        currIndex++;
      }

      newNode.next = currentNode;
      if (prevNode) prevNode.next = newNode;
    }

    this.size++;
  }

  deleteByIndex = (position: number) => {
    if (position < 0 || position > this.size) {
      console.log('Enter a valid index');

      return;
    } else {
      let currentNode = this.head;
      let prevNode = currentNode;

      let currIndex = 0;

      if (position === 0) {
        if (currentNode) this.head = currentNode.next;
      } else {
        while (currIndex < position) {
          currIndex++;

          prevNode = currentNode;
          if (currentNode) currentNode = currentNode.next;
        }

        if (currentNode && prevNode) prevNode.next = currentNode.next;
      }

      this.size--;
    }
  }

  deleteHead = () => {
    this.deleteByIndex(0);
  }

  deleteTail = () => {
    this.deleteByIndex(this.size - 1);
  }

  getSize = () => {
    return this.size;
  }

  toArray = () => {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode.value);

      currentNode = currentNode.next;
    }

    return nodes;
  }
}
