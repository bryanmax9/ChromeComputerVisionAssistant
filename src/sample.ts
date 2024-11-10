import { PythonShell } from 'python-shell';

// Set up and execute the Python script
const pyshell = new PythonShell('src/sample.py', { mode: 'text' });

// Listen for messages from the Python script
pyshell.on('message', (message) => {
  console.log('Python script output:', message);
});

// End the Python shell and handle the results
pyshell.end((err, code, signal) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Python script finished with code:', code, 'and signal:', signal);
  }
});
