import ReactDOM from 'react-dom';
import { OptionsApp } from '.';

describe('OptionsApp component', () => {
  test('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OptionsApp />, div);
  });
});
