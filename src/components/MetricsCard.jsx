import { Card, Metric, Text } from '@tremor/react'
import formatPrice from '../data/priceFormat'

export default function MetricsCard ({ sales }) {
  return (
    <>
        <Card>
          <Text>Ventas</Text>
          <Metric>
            { formatPrice({ price: sales }) }
          </Metric>
        </Card>
    </>
  )
}
