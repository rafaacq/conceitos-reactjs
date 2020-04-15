import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositores(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Meu Novo Projeto ${Date.now()}`,
      url: "github.com",
      techs: ["Node", "Python"]
    });

    const repository = response.data;
    setRepositores([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositoryArray = repositories.filter(repository => repository.id !== id);
    setRepositores(newRepositoryArray);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            <div className="repository-title">
              {repository.title}
            </div>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>
      
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
