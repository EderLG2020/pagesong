import { config } from '../../config/env'
import './SiteFooter.css'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} {config.brandName}. Todos los derechos reservados.
    </footer>
  )
}
