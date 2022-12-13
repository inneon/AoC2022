export class Queue<T> {
  private readonly _list: T[] = []
  constructor(initial?: T[]) {
    if (initial) {
      this._list = initial
    }
  }

  enqueue(obj: T) {
    this._list.unshift(obj)
  }
  dequeue(): T {
    const res = this._list.pop()
    if (!res) throw Error("Queue is empty")
    return res
  }

  get length(): number {
    return this._list.length
  }
}
