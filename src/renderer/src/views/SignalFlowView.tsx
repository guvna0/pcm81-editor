import { AlgorithmDefinition } from '../catalogue/schema';
import { SignalFlowDiagram } from '../components/SignalFlowDiagram';

export const SignalFlowView = ({ algorithm }: { algorithm: AlgorithmDefinition }): JSX.Element => (
  <SignalFlowDiagram algorithm={algorithm} />
);
