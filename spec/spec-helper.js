import '@testing-library/jest-dom'

export function getExampleDOM() {
  return document.body.innerHTML = `
    <button class="button-test">Show Message</button>
    <div class="message-container" data-testid="message"></div>
  `;
}
