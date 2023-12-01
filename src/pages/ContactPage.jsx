import { Badge, Card, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow, Text, Title } from '@tremor/react'
import { DEFAULT_VALUE } from '../contants'
import { contacts } from '../data/contacts.json'

export default function Contactos () {
  return (
    <Card>
        <Title className='inline-block'>Lista de contactos</Title>
        <Badge className='ml-2'>{contacts.length}</Badge>

        <Table className="mt-5">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nombre</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Tel</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              contacts
                ? contacts.map(contact => (
                <TableRow key={contact?.email ?? crypto.randomUUID()}>
                  <TableCell>{contact?.name ?? DEFAULT_VALUE.text}</TableCell>
                  <TableCell>
                    <Text>{contact?.email ?? DEFAULT_VALUE.text}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{contact?.tel ?? DEFAULT_VALUE.text}</Text>
                  </TableCell>
                </TableRow>
                ))
                : null
            }
          </TableBody>
        </Table>
      </Card>
  )
}
