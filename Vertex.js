class Vertex {
    constructor(key, adjacency = []) {
        this.key = key;
        this.adjacency = adjacency;
    }
    adjacencyList() {
        adjacency.forEach(
            e => list += "->" e.destiny.key);
        console.log(list);
    }
}

export default Vertex;