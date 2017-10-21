class Edge {
    constructor(origin, destiny, weight = null, status = "UNEXPLORED") {
        this.origin = origin;
        this.destiny = destiny;
        this.weight = weight;
        this.status = status;
    }
    adjacencyList() {
        this.vertexes.forEach(v => v.adjacencyList());
    }

}

export default Edge;