export default function formatPrice ({ price }) {
  return Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(price)
}
