import { map } from "lodash";
import { Card, Flex } from "antd";
import thumb_1 from '/0.jpeg'

const ItemDrawer = ({ items }) => {
  const { Meta } = Card
  if (!items) return;

  return (
    <Flex gap={20}>
      {map(items, (item, index) => (
        <Card
          key={`card-item-${index}`}
          hoverable
          style={{ width: 240 }}
          cover={
            <img
              alt="example"
              src={thumb_1}
            />
          }
        >
          <Meta title={`${item.itemName} - ${item.unitPrice}`} description={item.itemDesc} />
        </Card>
      ))}
    </Flex>
  );
};

export default ItemDrawer;
