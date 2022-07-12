import { render, screen } from '@testing-library/react';
import App from './App';
import AlertTemplate from 'react-alert-template-basic'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './state managment/store';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
const options = {
  position: positions.TOP_CENTER,
  offset: '30px',
  transition: transitions.SCALE
}

test('renders learn react link', () => {
  render(
    <AlertProvider template={AlertTemplate} {...options}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </AlertProvider>
  );
  const linkElement = screen.getByText(/PokeDoList/i);
  expect(linkElement).toBeInTheDocument();
});
