import { expect } from 'chai';
import { DoublyLinkedList } from '../src/DoublyLinkedList';

describe('Doubly Linked List', () => {
    let list, data;
    beforeEach(() => {
        list = new DoublyLinkedList<string>();
        data = ['Node 0', 'Node 1', 'Node 2', 'Node 3', 'Node 4'];
    });

    it('head()', () => {
        for (let i = 0; i < 100; i++) {
            list.append(i.toString()).size();
        }
        expect(list.head()).to.not.equal(null);
        expect(list.head().data()).to.equal('0');
    });
    it('head() on empty list', () => {
        expect(list.head()).to.equal(null);
    });
    it('tail()', () => {
        for (let i = 0; i < 100; i++) {
            list.append(i.toString()).size();
        }
        expect(list.tail()).to.not.equal(null);
        expect(list.tail().data()).to.equal('99');
    });
    it('tail() on empty list', () => {
        expect(list.tail()).to.equal(null);
    });
    it('size()', () => {
        for (let i = 0; i < 100; i++) {
            expect(list.append(i.toString()).size()).to.equal(i + 1);
        }
    });
    it('node', () => {
        expect(list.append('1').node(0).data()).to.equal('1');
        expect(list.append('2').node(0).data()).to.equal('1');
        expect(list.prepend('3').node(0).data()).to.equal('3');
    });
    it('prepend', () => {
        for (let i = data.length - 1; i >= 0; i--) {
            list.prepend(data[i]);
        }

        for (let i = 0; i < data.length; i++) {
            expect(list.node(i).data()).to.equal(data[i]);
        }
    });
    it('append', () => {
        for (let i = 0; i < data.length; i++) {
            list.append(data[i]);
        }

        for (let i = 0; i < data.length; i++) {
            expect(list.node(i).data()).to.equal(data[i]);
        }
    });
    it('copy', () => {
        for (let i = data.length - 1; i >= 0; i--) {
            list.prepend(data[i]);
        }
        const copy = list.copy();
        for (let i = 0; i < data.length; i++) {
            expect(copy.node(i).data()).to.equal(list.node(i).data());
        }
    });
    it('prependNewHead', () => {
        for (let i = data.length - 1; i >= 0; i--) {
            list.prepend(data[i]);
        }
        const newList = list.prependNewHead('Node -1', 3);
        expect(newList.node(0).data()).to.equal('Node -1');
        expect(newList.node(1).data()).to.equal(data[3]);
        expect(newList.node(2).data()).to.equal(data[4]);
    });
    it('remove()', () => {
        for (let i = 0; i < data.length; i++) {
            list.append(data[i]);
        }

        expect(list.remove(2).data()).to.equal(data[2]);
    });
    it('remove() last item', () => {
        list.append(data[0]);
        expect(list.remove(0).data()).to.equal(data[0]);
        expect(list.size()).to.equal(0);
    });
    it('removeHead()', () => {
        for (let i = 0; i < data.length; i++) {
            list.append(data[i]);
        }

        expect(list.size()).to.equal(5);
        expect(list.removeHead().data()).to.equal(data[0]);
        expect(list.size()).to.equal(4);
    });
    it('removeTail()', () => {
        for (let i = 0; i < data.length; i++) {
            list.append(data[i]);
        }

        expect(list.size()).to.equal(5);
        expect(list.removeTail().data()).to.equal(data[4]);
        expect(list.size()).to.equal(4);
    });
});