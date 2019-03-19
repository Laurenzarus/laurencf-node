let connection = new WebSocket('ws://laurencf-node.herokuapp.com');

connection.onopen = () => {
  console.log('connected from the frontend');
  //
  // connection.send('hello');
};

connection.onerror = () => {
  console.log('failed to connect from the frontend');
};

connection.onmessage = (event) => {
  console.log('received message', event.data);
  let li = document.createElement('li');
  li.innerText = event.data;
  document.querySelector('ul').append(li);
};

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();

  let message = document.querySelector('textarea').value;
  connection.send(message);
  document.querySelector('textarea').value = '';
});
