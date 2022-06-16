import ReactDOM from 'react-dom';

import { PopupApp } from '.';

describe('PopupApp component', () => {
  test('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PopupApp />, div);
  });
});
