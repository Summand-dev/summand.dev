import axios from "axios";

export async function getRepo(repoName: string) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${repoName}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch {}
}
export async function getRelease(repoName: string) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${repoName}/releases`
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch {}
}
