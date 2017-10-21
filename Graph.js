//"./"" indica que eles estao no mesmo diretorio
// push e o metodo do vetor que adiciona dentro do mesmo
import Edge from './Edge';
import Vertex from './Vertex';

class Graph {
    constructor(verterxes = [], edges = []) {
        this.verterxes = verterxes;
        this.edges = edges;
    }

    dfs(Vertex) {
        var v = new Graph;
        v.adjacencyList();
        v.verterxes.visited = true;
        v.forEach(edges);
        if (v.edges.status = "UNEXPLORED") {
            if (v.edges.destiny = "UNEXPLORED") {
                v.edges.status = "EXPLORED";
                v.edges.destiny.dfs();
            } else {
                v.edges.status = "return"
            }

        }
    }


    addVertex(key) {
        let nvertex = new Vertex(key);
        this.verterxes.push(nvertex);
        return nvertex;


    }
    addEdge(origin, destiny) {
        let nedge = new Edge(origin, destiny);
        this.edges.push(nedge);
        return nedge;
    }
    adjacencyList() {
        this.verterxes.forEach(
            v => list += " ->" + v.destiny.key);
    }


}
export default Graph;
