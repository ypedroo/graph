class Graph {
    constructor(vertexes = [], edges = []) {
        this.vertexes = vertexes;
        this.edges = edges;
    }

    getOpen() {
        let open = this.vertexes.filter(v => {
            if (v.status == "OPEN") {
                return v;
            }
        });
        return open;
    }

    hasOpenVertexes() {
        return this.getOpen().length > 0;

    }

    shortPath(vertex) {
        vertex.estimate = 0;

        while (this.hasOpenVertexes()) {
            let minimum = this.findOpenMinimum();
            minimum.status = "CLOSED";

            minimum.adjacency.forEach(e => e.relaxation());
        }
    }

    findOpenMinimum() {
        let open = this.getOpen();
        let minimum = open[0];

        open.forEach(v => {
            if (v.estimate < minimum.estimate) {
                minimum = v;
            }
        });
        return minimum;
    }
    bfSearch(vertex) {
        let current = vertex;
        vertex.level = 0;
        let queue = [];
        queue.push(vertex);
        while (queue.length > 0) {
            current = queue.shift();
            //tres iguais por que verifica tipo e valor
            current.adjacency.forEach(edge => {
                if (edge.isUnexplored()) {
                    if (!edge.hasDestinyVertexBeenVisited()) {
                        edge.status = "DISCOVERED";
                        edge.destiny.level = edge.origin.level + 1;
                        //current.level = edge.destiny.level + 1;
                        queue.push(edge.destiny);
                    } else {
                        edge.status = "CROSSED";
                    }

                }
            });
        }
    }

    dfs(vertex) {
        vertex.visited = true;
        vertex.adjacency.forEach(edge => {
            if (edge.status == "UNEXPLORED") {
                if (edge.destiny.visited == false) {
                    edge.status = "DISCOVER";
                    dfs(edge.destiny);
                } else {
                    edge.status = "RETURN";
                }
            }
        });

    }


    addVertex(key) {
        let nvertex = new Vertex(key);
        this.vertexes.push(nvertex);
        return nvertex;


    }
    addEdge(origin, destiny, weight) {
        let nedge = new Edge(origin, destiny, weight);
        this.edges.push(nedge);
        origin.adjacency.push(nedge);
        //nedge indica que ele nao é digrafo
        let nedge2 = new Edge(origin, destiny, weight);
        destiny.adjacency.push(nedge2);
        return nedge;
    }
    adjacencyList() {
        this.vertexes.forEach(v => v.adjacencyList());
    }
}

class Vertex {
    constructor(key, viseted = false, level = null, adjacency = [],
        status = "OPEN", estimate = Number.POSITIVE_INFINITY, predecessor = null) {
        this.key = key;
        this.viseted = false;
        this.level = null;
        this.adjacency = adjacency;
        this.status = status;
        this.estimate = estimate;
        this.predecessor = predecessor;

    }

    toString() {
        return this.key;
    }

    adjacencyList() {
        let list = this.key;
        this.adjacency.forEach(edge => list += " ->" + edge.destiny.key);
        console.log(list);
    }
    isVisited() {
        return (this.level !== null);
    }
}

class Edge {
    constructor(origin, destiny, weight = null, status = "UNEXPLORED") {
        this.origin = origin;
        this.destiny = destiny;
        this.weight = weight;
        this.status = status;
    }
    isUnexplored() {
        return (this.status === "UNEXPLORED");

    }

    hasDestinyVertexBeenVisited() {
        return this.destiny.isVisited();
    }

    relaxation() {
        let newEstimate = this.origin.estimate + this.weight;
        if (newEstimate < this.destiny.estimate &&
            this.destiny.status == "OPEN") {
            this.destiny.estimate = newEstimate;
            this.destiny.predecessor = this.origin;
        }
    }
}

let graph = new Graph();
let a = graph.addVertex('A');
let b = graph.addVertex('B');
let c = graph.addVertex('C');
let d = graph.addVertex('D');
let e = graph.addVertex('E');
let f = graph.addVertex('F');

let ab = graph.addEdge(a, b, 4);
let ac = graph.addEdge(a, c, 2);
let bc = graph.addEdge(b, c, 1);
let bd = graph.addEdge(b, d, 5);
let ce = graph.addEdge(c, e, 10);
let cd = graph.addEdge(c, d, 8);
let de = graph.addEdge(d, e, 2);
let df = graph.addEdge(d, f, 6);
let ef = graph.addEdge(e, f, 2);


console.log("Lista de adjacencias")
graph.adjacencyList();

console.log("Executando busca em produndidade");
graph.dfs(a);
graph.edges.forEach (e => 
    console.log(`${e.origin.key} ->  ${e.destiny.key}  ${e.status}`));

console.log("Excecutando ShortPath(Djkistra)");
graph.shortPath(a);
graph.vertexes.forEach(v => {
    console.log(`${v.key}: [${v.predecessor}, ${v.estimate}] `)
});

console.log("Excecutando Busca em Largura");
graph.bfSearch(c);
graph.vertexes.forEach(v => {
    console.log(`${v.key} | ${v.level}`);
});
console.log("Exibindo o estado das arestas da busca");
graph.edges.forEach(e => {
    console.log(`${e.origin.key} - ${e.destiny.key} | ${e.status}`);
});