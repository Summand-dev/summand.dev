import axios from "axios";

export async function getRepo(repoName: string) {
  const response = await axios.get(`https://api.github.com/repos/${repoName}`);
  if (response.status === 200) {
    return response.data;
  }
}
export async function getRelease(repoName: string) {
  const response = await axios.get(
    `https://api.github.com/repos/${repoName}/releases`
  );
  if (response.status === 200) {
    return response.data;
  }
}
