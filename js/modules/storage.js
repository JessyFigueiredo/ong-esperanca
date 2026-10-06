const VOLUNTEERS_KEY = "ong-esperanca:voluntarios:v1";

export function saveVolunteer(volunteer) {
  try {
    const saved = localStorage.getItem(VOLUNTEERS_KEY);
    const volunteers = saved === null ? [] : JSON.parse(saved);

    if (!Array.isArray(volunteers)) {
      throw new Error("Os dados locais de voluntários estão em um formato inválido.");
    }

    volunteers.push(volunteer);
    localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Os dados salvos neste navegador estão corrompidos. Limpe os dados locais do site e tente novamente.");
    }

    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new Error("O armazenamento deste navegador está cheio. Libere espaço e tente novamente.");
    }

    throw error;
  }
}
