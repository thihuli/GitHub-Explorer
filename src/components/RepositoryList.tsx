import { useState, useEffect } from 'react';
import { RepositoryItem } from "./RepositoryItem";
import { Repository } from '../types'

import '../styles/repositories.scss'

const url = 'https://api.github.com/orgs/rocketseat/repos';

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]); // <> representa generics no typescript

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setRepositories(data))
  },[])
  
  return (
    <section className="repository-list">
      <h1>Lista de Repositórios</h1>

      <ul>
      {repositories.map((item) => (
          <RepositoryItem key={item.id} repository={item} />
      ))}
      </ul>
    </section>
  )
}