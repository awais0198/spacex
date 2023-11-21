import { render, screen } from '@testing-library/react';
import Modal from "react-modal";
import '@testing-library/jest-dom/extend-expect';
import useFetch from './hooks/useFetch';
import { Rockets } from './pages';

jest.mock('./hooks/useFetch');
jest.mock("react-modal");

beforeEach(() => {
  Modal.setAppElement(document.createElement('div'));
});

test('displays loading state before data is fetched', async () => {
  useFetch.mockReturnValue([null]);

  render(<Rockets />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('displays rockets after fetching', async () => {
  const mockData = [{ id: 'falcon1', name: 'Falcon 1', flickr_images: ['img_url'], description: 'Description here' }];
  useFetch.mockReturnValue([mockData]);
  
  render(<Rockets />);
  
  const rocketName = await screen.findByText('Falcon 1');
  expect(rocketName).toBeInTheDocument();
});
