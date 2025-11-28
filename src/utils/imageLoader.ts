/**
 * Função helper para carregar imagens dinamicamente
 * Facilita a troca de imagens através do arquivo de configuração
 */
export function getImagePath(imageName: string): string {
  // Usa import.meta.url para resolver o caminho relativo corretamente
  return new URL(`../assets/${imageName}`, import.meta.url).href;
}

