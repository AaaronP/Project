import { List, ListItem } from '@tremor/react'
import { DEFAULT_VALUE } from '../contants'
import formatPrice from '../data/priceFormat'

export default function DeviceDetailCard ({ device }) {
  const { price, emailOwner, installationDate, lastRead, id, chemicalLevel } = device

  return (
      <div>
        <List>
            <ListItem>
                <span>Id</span>
                <span>{id}</span>
            </ListItem>
            <ListItem>
                <span>Comprador</span>
                <span>{emailOwner ?? DEFAULT_VALUE.text}</span>
            </ListItem>
            <ListItem>
                <span>Precio</span>
                <span>{price ? formatPrice({ price }) : DEFAULT_VALUE.text}</span>
            </ListItem>
            <ListItem>
                <span>Fecha de installación</span>
                <span>{installationDate?.toDate().toLocaleDateString() ?? DEFAULT_VALUE.date}</span>
            </ListItem>
            <ListItem>
                <span>Nivel Químico</span>
                <span>{chemicalLevel ?? DEFAULT_VALUE.date}</span>
            </ListItem>
            <ListItem>
                <span>Última lectura</span>
                <span>{lastRead?.toDate().toLocaleDateString() ?? DEFAULT_VALUE.date}</span>
            </ListItem>
        </List>
      </div>
  )
}
