function showMessage() {
	const messageContainer = document.querySelector('.message-container');
  messageContainer.innerHTML = 'Hello There';
}

export function buttonHandler() {
  const button = document.querySelector('.button-test');
  button.addEventListener('click', showMessage)
}
