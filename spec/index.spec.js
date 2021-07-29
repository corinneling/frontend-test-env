import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { getExampleDOM } from './spec-helper';
// this is the function i'll be testing
import { buttonHandler } from '../src/index';

describe('Carousel Navigation', () => {
  test('updates aria-hidden of next slide to false when next button is clicked', () => {
    // Creates the fake DOM
    getExampleDOM();
    // the function im testing which adds event listeners to buttons
    buttonHandler();
    // simulates a user clicking on the button with the text "Next Slide"
    userEvent.click(screen.getByText('Show Message'));
    expect(screen.getByTestId('message')).toHaveTextContent('Hello There');
  })
})
