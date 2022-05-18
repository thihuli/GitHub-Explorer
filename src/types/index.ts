export type RepositoryItemProps = {
  repository: {
    name: string;
    description: string;
    html_url: string;
  }
}

export type Repository = {
  name: string;
  id: string;
  description: string;
  html_url: string;
}