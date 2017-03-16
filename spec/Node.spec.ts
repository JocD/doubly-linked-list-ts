import { expect } from 'chai';
import { Node } from '../src/Node';

describe('Node', () => {
    let data, nodes;

    beforeEach(() => {
        data = ['Node 0', 'Node 1', 'Node 2', 'Node 3', 'Node 4'];
        nodes = data.map(d => new Node<string>(d));
    });

    it('data()', () => {
        const node1 = nodes[1];
        expect(node1.data()).to.equal(data[1]);
    });
    it('next()', () => {
        const node1 = nodes[1];
        expect(node1.next()).to.equal(null);
    });
    it('prev()', () => {
        const node1 = nodes[1];
        expect(node1.prev()).to.equal(null);
    });
    it('prepend() when previous node is null', () => {
        const node0 = nodes[0];
        const node1 = nodes[1];
        expect(node1.prepend(node0)).to.equal(node0);
        expect(node0.next()).to.equal(node1);
        expect(node1.prev()).to.equal(node0);
    });
    it('prepend() when previous node is not null', () => {
        const node0 = nodes[0];
        const node1 = nodes[1];
        const node2 = nodes[2];
        expect(node2.prepend(node0)).to.equal(node0);
        expect(node0.next()).to.equal(node2);
        expect(node2.prev()).to.equal(node0);

        expect(node2.prepend(node1)).to.equal(node1);
        expect(node0.next()).to.equal(node1);
        expect(node1.prev()).to.equal(node0);

        expect(node1.next()).to.equal(node2);
        expect(node2.prev()).to.equal(node1);
    });
    it('append() when next node is null', () => {
        const node0 = nodes[0];
        const node1 = nodes[1];
        expect(node0.append(node1)).to.equal(node1);
        expect(node1.prev()).to.equal(node0);
        expect(node0.next()).to.equal(node1);
    });
    it('append() when next node is not null', () => {
        const node0 = nodes[0];
        const node1 = nodes[1];
        const node2 = nodes[2];
        expect(node0.append(node2)).to.equal(node2);
        expect(node0.next()).to.equal(node2);
        expect(node2.prev()).to.equal(node0);

        expect(node0.append(node1)).to.equal(node1);
        expect(node0.next()).to.equal(node1);
        expect(node1.prev()).to.equal(node0);

        expect(node1.next()).to.equal(node2);
        expect(node2.prev()).to.equal(node1);
    });
    it('remove()', () => {
        const node0 = nodes[0];
        const node1 = nodes[1];
        const node2 = nodes[2];

        node0.append(node1).append(node2);
        node1.remove();
        expect(node0.next()).to.equal(node2);
        expect(node2.prev()).to.equal(node0);
    });
    it('remove() when there is no preceding node', () => {
        const node1 = nodes[1];
        const node2 = nodes[2];

        node1.append(node2);
        node1.remove();
        expect(node2.next()).to.equal(null);
        expect(node2.prev()).to.equal(null);
    });
    it('remove() when there is no following node', () => {
        const node0 = nodes[0];
        const node1 = nodes[1];

        node0.append(node1);
        node1.remove();
        expect(node0.next()).to.equal(null);
        expect(node0.prev()).to.equal(null);
    });
});