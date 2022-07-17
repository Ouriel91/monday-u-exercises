import React from "react";
import renderer from "react-test-renderer";
import TodoItem from "../TodoItem"
import { Provider } from "react-redux";
import { store } from "../../../../../../state-managment/store";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

describe("Jest Snapshot testing suite", () => {
    const options = {
        position: positions.TOP_CENTER,
        offset: '30px',
        transition: transitions.SCALE
    }

    const item = {
            id: 56,
            itemName: "Take dog out for a walk",
            status: false,
            isPokemon: false,
    }

    const item2 = {
        id: 100,
        itemName: "pok1",
        status: false,
        isPokemon: true,
    }
        
    it("change switch between item and item2 to see if Snapshot change", () => {
        const domTree = renderer.create(
            <AlertProvider template={AlertTemplate} {...options}>
                <Provider store={store}>
                    <TodoItem todo={item}/>
                </Provider>
            </AlertProvider>
        ).toJSON();
        expect(domTree).toMatchSnapshot();
    });
});