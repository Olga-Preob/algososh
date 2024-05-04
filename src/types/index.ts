import { ElementStates } from './element-states';


export type Element = {
  value: string;
  state: ElementStates;
};

export type LinkedListTempElement = Element & {
  headOrTailValue: string;
  hasHead: boolean;
  hasTail: boolean;
}
