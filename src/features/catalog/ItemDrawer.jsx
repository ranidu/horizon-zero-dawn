import { map } from "lodash";
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Flex, Image, Button } from "antd";
import thumb_1 from '/0.jpeg'

const ItemDrawer = ({ items, handleAdd }) => {
  const { Meta } = Card
  if (!items) return;

  return (
    <Flex gap={20} wrap>
      {map(items, (item, index) => (
        <Card
          key={`card-item-${index}`}
          hoverable
          style={{ width: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          cover={
            <div style={{ height: 250, overflow: 'hidden' }}>
            <Image
              alt="example"
              src={item?.thumbnail}
              fallback={thumb_1}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            </div>
          }
          actions={[<Flex justify="flex-end" align="center" style={{ paddingRight: '10px'}}><Button onClick={() => handleAdd(item)} type="primary" icon={<ShoppingCartOutlined />} /></Flex>]}
        >
          <Meta title={`${item.itemName} - ${item.unitPrice}`} description={item.itemDesc} />
        </Card>
      ))}
    </Flex>
  );
};

export default ItemDrawer;
