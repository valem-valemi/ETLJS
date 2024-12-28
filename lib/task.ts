export default function Task(name: string): Task1 {
  return;
}

class Task1 {
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  cwd(path: string): Task1 {
  }

  currentWorkDirectory(path: string): Task1 {
    this.cwd(path);
  }
}
