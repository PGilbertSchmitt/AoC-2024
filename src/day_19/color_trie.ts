import { ColorList } from "./color_list";
import { Color } from "./colors";

type TrieChild = TrieNode | null;
type ChildNodes = [TrieChild, TrieChild, TrieChild, TrieChild, TrieChild];
type TrieNode = {
  end: boolean;
  // Index of a color is the color's index defined in the Colors enum
  children: ChildNodes;
}

export class ColorTrie {
  private root: TrieNode;

  constructor() {
    this.root = {
      end: false,
      children: this.newChildList(),
    };
  }

  addPattern(pattern: Color[]) {
    let node = this.root;
    for (const color of pattern) {
      node = node.children[color] || this.newChild(node, color);
    }
    node.end = true;
  }

  allMatches(sequence: ColorList): [boolean, Array<ColorList>] {
    let curNode = this.root;
    let curSeq = sequence;

    const matches: Array<ColorList> = [];
    while (true) {
      const child = curNode.children[curSeq.color];
      if (child === null) {
        // Looking for a subnode that doesn't exist, sequence continues
        return [false, matches];
      }

      if (curSeq.next === null) {
        // Sequence is over, so it matches if we're at a terminal node
        return [true, matches];
      }

      if (child.end) {
        // Sequence is not over, but could start from here
        matches.push(curSeq.next);
      }

      curNode = child;
      curSeq = curSeq.next;
    }
  }

  private newChildList(): ChildNodes {
    return [null, null, null, null, null];
  }

  private newChild(node: TrieNode, color: Color): TrieNode {
    const child = {
      end: false,
      children: this.newChildList(),
    };
    node.children[color] = child;
    return child;
  }
}
