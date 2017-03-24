import Node from './Node';

const clamp = (val: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, val));
};

export class DoublyLinkedList<T> {
    private _size: number;
    private _head: Node<string | T>;
    private _tail: Node<string | T>;

    constructor() {
        this._size = 0;
        this._head = new Node<string | T>('__HEAD__');
        this._tail = new Node<string | T>('__TAIL__');

        this._head.append(this._tail)
    }

    /**
     * Return the first item in the list
     * Return null if the list is empty
     * */
    head() {
        const head = this._head.next();
        return this._size === 0 ? null : head;
    }

    /**
     * Return the last item in the list
     * Return null if the list is empty
     * */
    tail() {
        const tail = this._tail.prev();
        return this._size === 0 ? null : tail;
    }

    /**
     * Return the size of the list
     * */
    size(): number {
        return this._size;
    }

    /**
     * Return the node at a given index
     * */
    node(index: number) {
        const size = this._size;
        if (size === 0) {
            return null;
        }

        const localIndex = clamp(index, 0, size - 1);
        let current = this._head;
        for (let i = 0; i <= localIndex; i++) {
            current = current.next() !== this._tail ? current.next() : null;
        }
        return current;
    }

    /**
     * Add a value to the beginning of the list
     * */
    prepend(data: T): DoublyLinkedList<T> {
        const head = this._head;
        const node = new Node<T>(data);
        head.append(node);
        this._size += 1;
        return this;
    }

    /**
     * Add a value to the end of the list
     * */
    append(data: T): DoublyLinkedList<T> {
        const tail = this._tail;
        const node = new Node<T>(data);
        tail.prepend(node);
        this._size += 1;
        return this;
    }

    /** Remove a value from the list */
    remove(index: number) {
        if (this._size === 0) {
            return null;
        }
        const node = this.node(index).remove();
        this._size -= 1;
        return node;
    }

    /** Remove a value from the beginning of the list */
    removeHead() {
        if (this._size === 0) {
            return null;
        }
        return this.remove(0);
    }

    /** Remove a value from the end of the list */
    removeTail() {
        if (this._size === 0) {
            return null;
        }
        return this.remove(this._size - 1);
    }
}

export default DoublyLinkedList;