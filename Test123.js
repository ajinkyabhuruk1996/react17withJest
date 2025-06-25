import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CategoryDialog from './CategoryDialog'; // adjust the path as needed

// Mock required props
const mockToggleDialog = jest.fn();
const mockSetting = {
  id: null,
  isDefault: false,
  name: '',
  shortName: '',
  riskArea: null,
};

const riskAreasMock = [
  { id: '1', displayName: 'Cybersecurity' },
  { id: '2', displayName: 'Compliance' },
];

// Create mock store
const mockStore = configureStore([]);
const store = mockStore({});

// Mock Mutation component from Apollo
jest.mock('@apollo/client/react/components', () => ({
  Mutation: ({ children }) => children(() => {}, { loading: false }),
}));

describe('CategoryDialog Component', () => {
  it('shows error if Risk Area is not selected on submit', () => {
    render(
      <Provider store={store}>
        <CategoryDialog
          open={true}
          toggleDialog={mockToggleDialog}
          setting={mockSetting}
          riskAreas={riskAreasMock}
          readOnly={false}
        />
      </Provider>
    );

    // Submit the form without selecting risk area
    const submitButton = screen.getByText(/Create/i);
    fireEvent.click(submitButton);

    // Check for the error
    const errorMessage = screen.getByText(/is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('clears error when Risk Area is selected', () => {
    render(
      <Provider store={store}>
        <CategoryDialog
          open={true}
          toggleDialog={mockToggleDialog}
          setting={mockSetting}
          riskAreas={riskAreasMock}
          readOnly={false}
        />
      </Provider>
    );

    // Select Risk Area
    const riskAreaSelect = screen.getByLabelText(/Risk Area/i);
    fireEvent.mouseDown(riskAreaSelect);

    const option = screen.getByText(/Cybersecurity/i);
    fireEvent.click(option);

    // Submit the form again
    const submitButton = screen.getByText(/Create/i);
    fireEvent.click(submitButton);

    // Should not show the error now
    expect(screen.queryByText(/is required/i)).not.toBeInTheDocument();
  });
});
