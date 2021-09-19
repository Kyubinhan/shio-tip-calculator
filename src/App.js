import AppBar from 'src/components/AppBar';
import Form from 'src/components/RFF/Form';

function App() {
  return (
    <div className="app">
      <AppBar />
      <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
        <Form />
      </div>
    </div>
  );
}

export default App;
