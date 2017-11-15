//"./"" indica que arquivos estao no mesmo diretorio
// push e o metodo do vetor que adiciona dentro do mesmo
class Graph {
    constructor(vertexes = [], edges = []) {
        this.vertexes = vertexes;
        this.edges = edges;
    }

    bfSearch(vertex) {
        let current = null;
        vertex.level = 0;
        let queue = [];
        queue.push(vertex);
        while (queue.length > 0) {
            current = queue.shift();
            while (current.adjacency.forEach(e => {
                if (e.status == "UNEXPLORED") {
                    e.status = "DISCOVER";
                    current.level = e.destiny.level + 1;
                    queue.push(e.destiny);

                } else {
                    e.status = "CRUSADE";
                }
            }));
        }
        console.log(current);
    }

    dfs(vertex) {
        let v;
        this.v = vertex;
        v.vertex.visited = true;
        //estrturar cria variavel percursso e dps da seta condicao
        vertex.ajacency.forEach(edge => {
            if (edge.status == "UNEXPLORED") {
                if (edge.destiny.viseted == false) {
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
    addEdge(origin, destiny) {
        let nedge = new Edge(origin, destiny);
        this.edges.push(nedge);
        origin.adjacency.push(nedge);

        //cria o destiny quando nao e direcional, ja que a lista fica espelhada
        let nedge2 = new Edge(origin, destiny);
        destiny.adjacency.push(nedge2);
        return nedge;
    }
    adjacencyList() {
        this.vertexes.forEach(v => v.adjacencyList());
    }
}

class Vertex {
    constructor(key, viseted = false, level = null, adjacency = []) {
        this.key = key;
        this.viseted = viseted;
        this.level = level;
        this.adjacency = adjacency;
    }


    adjacencyList() {
        let list = this.key;
        /*for(let i = 0; i<this.adjacency.length;i++){
            list = list + " ->"+ this.adjacency[i].destiny.key;
        }*/
        this.adjacency.forEach(edge => list += " ->" + edge.destiny.key);
        console.log(list);
    }

}

class Edge {
    constructor(origin, destiny, weight = null, status = "UNEXPLORED") {
        this.origin = origin;
        this.destiny = destiny;
        this.weight = weight;
        this.status = status;
    }

}

let graph = new Graph();
let v1 = graph.addVertex('v1');
let v2 = graph.addVertex('v2');
let v3 = graph.addVertex('v3');
let v4 = graph.addVertex('v4)');

let a1 = graph.addEdge(v4, v1);
let a2 = graph.addEdge(v2, v4);
let a3 = graph.addEdge(v3, v3);
let a4 = graph.addEdge(v3, v4);
//let a5 = graph.addEdge(v5, v3);

//graph.adjacencyList();

graph.bfSearch(v1);