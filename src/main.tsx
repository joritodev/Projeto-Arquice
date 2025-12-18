import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'
import { FAVICON_PATH } from './config/siteConfig.ts'

// Atualiza o favicon dinamicamente usando a configuração do siteConfig
const updateFavicon = () => {
  // Remove todos os favicons existentes para evitar cache
  const existingLinks = document.querySelectorAll('link[rel*="icon"]')
  existingLinks.forEach(link => link.remove())

  // Determina o tipo MIME baseado na extensão do arquivo
  const getFaviconType = (path: string): string => {
    if (path.endsWith('.svg')) return 'image/svg+xml'
    if (path.endsWith('.png')) return 'image/png'
    if (path.endsWith('.jpg') || path.endsWith('.jpeg')) return 'image/jpeg'
    return 'image/x-icon' // padrão para .ico
  }

  // Cria o novo elemento de favicon com timestamp para evitar cache
  const link = document.createElement('link')
  link.rel = 'icon'
  link.type = getFaviconType(FAVICON_PATH)
  // Adiciona timestamp para forçar atualização e evitar cache
  link.href = `${FAVICON_PATH}?v=${Date.now()}`
  link.id = 'favicon-link'
  document.head.appendChild(link)

  // Também adiciona apple-touch-icon para melhor suporte em dispositivos móveis
  const appleLink = document.createElement('link')
  appleLink.rel = 'apple-touch-icon'
  appleLink.href = `${FAVICON_PATH}?v=${Date.now()}`
  document.head.appendChild(appleLink)
}

// Atualiza o favicon ao carregar a aplicação
updateFavicon()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
