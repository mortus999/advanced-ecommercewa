import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import Home from "../components/Home1";


jest.mock("axios");

describe("Home Component Test", () => {
    test('adding product to the cart ', async () => {
        const mockResponse = { data: [
            { id: 12, image: "", title: "ps5 Controller", price: 70.99, category: "Gaming", description: "play playstation and get gaming"}
        ]};
        axios.get.mockResolvedValue(mockResponse);

        const { getByText } = render(<Home />);
        
        fireEvent.click(getByText("nike shoes"));

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith("https://fakestoreapi.com/products")
        })


    });
});