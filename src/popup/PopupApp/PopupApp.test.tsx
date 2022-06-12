import ReactDOM from 'react-dom';
import PopupApp from '.';

describe('PopupApp', () => {
  test('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PopupApp />, div);
  });
});
