export enum ObsDictEventType {
  add = "Add",
  delete = "Delete",
  modify = "Modify",
  reset = "Reset",
}

export type ObsDictEvent = {
  type: ObsDictEventType;
  keys: string[];
};
