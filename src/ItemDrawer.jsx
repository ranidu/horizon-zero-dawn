import { map } from "lodash";
import { Card, Flex, Image } from "antd";
import thumb_1 from '/0.jpeg'

const ItemDrawer = ({ items }) => {
  const { Meta } = Card
  if (!items) return;

  return (
    <Flex gap={20} wrap>
      {map(items, (item, index) => (
        <Card
          key={`card-item-${index}`}
          hoverable
          style={{ width: 240 }}
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
        >
          <Meta title={`${item.itemName} - ${item.unitPrice}`} description={item.itemDesc} />
        </Card>
      ))}
    </Flex>
  );
};

export default ItemDrawer;
