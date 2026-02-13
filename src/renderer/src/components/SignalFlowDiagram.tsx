import { AlgorithmDefinition } from '../catalogue/schema';

type Props = {
  algorithm: AlgorithmDefinition;
};

export const SignalFlowDiagram = ({ algorithm }: Props): JSX.Element => {
  if (!algorithm.topologyVerified) {
    return (
      <section className="panel">
        <h2>Signal Flow</h2>
        <p>Topology is not verified for {algorithm.displayName}. Rendering Generic Signal Flow fallback.</p>
        <div className="generic-flow">Input → Processing Block(s) → Mix → Output</div>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Signal Flow · {algorithm.displayName}</h2>
      <div className="flow-grid">
        {algorithm.blocks.map((block, index) => (
          <div key={block.id} className="flow-node">
            {block.label}
            {index < algorithm.blocks.length - 1 && <span className="flow-arrow">→</span>}
          </div>
        ))}
      </div>
    </section>
  );
};
