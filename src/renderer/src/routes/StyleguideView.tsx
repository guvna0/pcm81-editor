import { Button } from '../components/base/Button';
import { Card } from '../components/base/Card';
import { Input } from '../components/base/Input';

export const StyleguideView = (): JSX.Element => (
  <div className="styleguide">
    <h2>Styleguide</h2>
    <Card>
      <h3>Buttons</h3>
      <div className="row">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </Card>
    <Card>
      <h3>Input</h3>
      <Input placeholder="Program name" />
    </Card>
  </div>
);
