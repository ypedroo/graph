//"./"" indica que eles estao no mesmo diretorio
// push e o metodo do vetor que adiciona dentro do mesmo
import Edge from './Edge';
import Vertex from './Vertex';

class Graph {
    constructor(verterxes = [], edges = []) {
        this.verterxes = verterxes;
        this.edges = edges;
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
    adjacencyList(){
        let list = this.list;
        adjacency.forEach(e => list += "->" e.destiny.key);
        
    }

}
export default Graph;
