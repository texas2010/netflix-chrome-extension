import ReactDOM from 'react-dom';
import ContentScriptApp from '.';

describe('ContentScriptApp', () => {
  test('should renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ContentScriptApp />, div);
  });
});
