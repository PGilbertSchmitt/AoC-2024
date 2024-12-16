const toParentIdx = (i: number) => ((i + 1) >>> 1) - 1;
const toLeftChildIdx = (i: number) => (i << 1) + 1;
const toRightChildIdx = (i: number) => (i + 1) << 1;

const ROOT_IDX = 0;

type Comparator<T> = (a: T, b: T) => boolean;

export class PriorityQueue<T> {
  private higherPriority: Comparator<T>;
  private heap: T[];

  constructor(higherPriority: Comparator<T>) {
    this.heap = [];
    this.higherPriority = higherPriority;
  }

  size() {
    return this.heap.length;
  }

  pop() {
    const bottom = this.bottomIdx();
    if (bottom > ROOT_IDX) {
      this.swap(bottom, ROOT_IDX);
    }
    const popped = this.heap.pop();
    this.siftToBottom();
    return popped;
  }

  push(v: T) {
    this.heap.push(v);
    this.siftToTop();
  }

  private peek() {
    return this.heap[ROOT_IDX];
  }

  private compare(i: number, j: number) {
    return this.higherPriority(this.heap[i], this.heap[j]);
  }

  private swap(i: number, j: number) {
    const tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }

  private siftToTop() {
    let curIdx = this.bottomIdx();
    let parentIdx = toParentIdx(curIdx);
    while (curIdx > ROOT_IDX && this.compare(curIdx, parentIdx)) {
      this.swap(curIdx, toParentIdx(curIdx));
      curIdx = parentIdx;
      parentIdx = toParentIdx(parentIdx);
    }
  }

  private siftToBottom() {
    let curIdx = ROOT_IDX;
    let left = toLeftChildIdx(curIdx);
    let right = toRightChildIdx(curIdx);
    while (
      (left < this.size() && this.compare(left, curIdx)) ||
      (right < this.size() && this.compare(right, curIdx))
    ) {
      const priorityChild =
        right < this.size() && this.compare(right, left) ? right : left;
      this.swap(curIdx, priorityChild);
      curIdx = priorityChild;
      left = toLeftChildIdx(curIdx);
      right = toRightChildIdx(curIdx);
    }
  }

  private bottomIdx() {
    return this.size() - 1;
  }
}
