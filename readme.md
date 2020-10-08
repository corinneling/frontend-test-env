# How to set up frontend testing env for a JS project with Jest & @testing-library

1. Install dev dependencies with `npm i --save-dev`
   * `@testing-library/dom`
   * `@testing-library/jest-dom`
   * `@testing-library/user-event`
   * `@babel/preset-env`
   * `babel-jest`
   * `jest`

2. Add `jest.config.js` to the root of your project
   ```js
    module.exports = {
      collectCoverage: true,
      collectCoverageFrom: [
        '<rootDir>/src/*.js',
      ],
      moduleFileExtensions: ['js'],
      testPathIgnorePatterns: [
        '/node_modules/',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      verbose: true,
    };
   ```

3. Add `.babelrc` file to the root of your project with the following code.
   ```js
   {
    "presets": ["@babel/preset-env"]
   }
   ```
  
3. Add a test script to your package.json
   * `"test": "jest ./src/spec/*.spec.js"`
   * this example is for a project with a separate spec folder for test files

4. Set up a `spec-helper.js` file
   * add `import '@testing-library/jest-dom'` to the top of the file.
      * we only need to import this package once in our project
   * setup a function for creating a fake DOM to test with. This function(s) will be imported into our individual test files. It could look something like this:
      ```js
      export function exampleDOM() {
        return document.body.innerHTML = `
          <div id="whirli-carousel">
            <div data-testid="slide-one" aria-hidden="false">
              <h2>sldie one</h2>
            </div>
            <div data-testid="slide-two"aria-hidden="true">
              <h2>sldie two</h2>
            </div>
            <button>Previous Slide</button>
            <button>Next Slide</button>
          </div>
        `;
      }
      ```
  
  5. Create a test file and import the following dependencies
     ```js
     import userEvent from '@testing-library/user-event';
     import { screen } from '@testing-library/dom';
     import { exampleDOM } from './spec-helper';
     // this is the function i'll be testing
     import { handleButtonNavigation } from '../navigation';
     ```

  6. Write a test! here's an example from another project
  ```js
  describe('Carousel Navigation', () => {
    test('updates aria-hidden of next slide to false when next button is clicked', () => {
      // Creates the fake DOM
      getCarouselDOM();
      // the function im testing which adds event listeners to buttons
      handleButtonNavigation();
      // simulates a user clicking on the button with the text "Next Slide"
      userEvent.click(screen.getByText('Next Slide'))
      expect(screen.getByTestId('slide-one')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByTestId('slide-two')).toHaveAttribute('aria-hidden', 'false');
    })
  })
  ```