import { render, screen } from "@testing-library/react";
import ListContainer from "../TodoList";
import { Provider } from "react-redux";
import { store } from "../../../../../../state managment/store";
import {useDispatch} from 'react-redux'
import {addTodoAction} from '../../../../../../state managment/actions/todo-actions'

import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const items = [
  {
    id: 56,
    itemName: "Take dog out for a walk",
    status: false,
    isPokemon: false,
  },
  {
    id: 32,
    itemName: "Do the dishes",
    status: true,
    isPokemon: false,
  },
  
];

describe("ListContainer", () => {
  test("should render both items (one done and one not)", () => {
    const Mock = () =>{
        const dispatch = useDispatch();
        dispatch(addTodoAction(items))
    }
// optional configuration
const options = {
    position: positions.TOP_CENTER,
    offset: '30px',
    transition: transitions.SCALE
  }
    render(
        <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
       <Mock/>
        <ListContainer />
      </Provider>
      </AlertProvider>
    );

    // TODO: test that both items are rendered at the list
    const linkElement = screen.getByText(/Take dog out for a walk/i);
    const linkElement2 = screen.getByText(/Do the dishes/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement2).toBeInTheDocument();
  });
});