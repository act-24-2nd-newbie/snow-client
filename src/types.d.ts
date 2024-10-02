type Task = {
  id: number;
  contents: string;
  isDone: boolean;
  createdAt: number;
  modifiedAt: number;
};

type ExtendedTask = Task & {
  selected: boolean;
  changedContents?: string;
};

type DropdownItem = {
  label: string;
  value: string | number;
};
