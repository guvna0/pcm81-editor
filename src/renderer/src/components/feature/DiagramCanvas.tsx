import type { AlgorithmNode } from '../../mock/algorithmTemplates';
import { Dial } from './Dial';

type Edge = { id: string; from: string; to: string };

type Props = {
  nodes: AlgorithmNode[];
  edges: Edge[];
  selectedNodeId: string;
  parameterValues: Record<string, number>;
  onSelectNode: (id: string) => void;
  onChangeParameter: (parameterId: string, value: number) => void;
};

export const DiagramCanvas = ({ nodes, edges, selectedNodeId, parameterValues, onSelectNode, onChangeParameter }: Props): JSX.Element => {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  return (
    <div className="diagram-canvas">
      <svg className="diagram-canvas__edges" viewBox="0 0 900 420" role="img" aria-label="Algorithm flow diagram">
        {edges.map((edge) => {
          const from = byId.get(edge.from);
          const to = byId.get(edge.to);
          if (!from || !to) return null;
          return <line key={edge.id} x1={from.x + 80} y1={from.y + 20} x2={to.x} y2={to.y + 20} />;
        })}
      </svg>
      {nodes.map((node) => (
        <div key={node.id}>
          <button
            className={`diagram-node ${selectedNodeId === node.id ? 'is-selected' : ''}`}
            style={{ left: node.x, top: node.y }}
            onClick={() => onSelectNode(node.id)}
          >
            {node.label}
          </button>
          <div className="diagram-node__dial" style={{ left: node.x - 10, top: node.y + 60 }}>
            <Dial
              label={node.label}
              value={parameterValues[node.parameterId] ?? 0}
              isPro={Boolean(node.pro)}
              onChange={(value) => onChangeParameter(node.parameterId, value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
