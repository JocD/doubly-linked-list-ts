export class Node<T> {
    private _data: T;
    private _next?: Node<T>;
    private _prev?: Node<T>;

    constructor(data: T) {
        this._data = data;
        this._next = null;
        this._prev = null;
    }

    data(): T {
        return this._data;
    }

    next(): Node<T> {
        return this._next;
    }

    prev(): Node<T> {
        return this._prev;
    }

    prepend(node: Node<T>): Node<T> {
        const left = this._prev;
        const right = this;

        right._prev = node;
        node._next = right;
        if (left !== null) {
            left._next = node;
            node._prev = left;
        }
        return node;
    }

    append(node: Node<T>): Node<T> {
        const left = this;
        const right = this._next;

        left._next = node;
        node._prev = left;
        if (right !== null) {
            right._prev = node;
            node._next = right;
        }
        return node;
    }

    remove(): Node<T> {
        const left = this._prev;
        const right = this._next;

        this._next = null;
        this._prev = null;

        // If left is not null, set the preceding node _next to point to following node
        if (left) {
            left._next = right;
        }

        // If right is not null, set the following node _prev to point to previous node
        if (right) {
            right._prev = left;
        }

        return this;
    }
}

export default Node;