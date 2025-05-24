import { List, Avatar, Image, Button, Flex } from "antd";
import { useNavigate } from 'react-router'
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../hooks";
import { showCart } from "./slice";

const CartDrawer = () => {
    const navigate = useNavigate()
  const cartItems = useAppSelector(showCart);
  return (
    <div>
      <Flex>
        <Button onClick={() => navigate(-1)}><ArrowLeftOutlined/> Go Back</Button>
      </Flex>
      <List
        itemLayout="vertical"
        style={{ textAlign: "left", paddingTop: 50 }}
        size="large"
        dataSource={cartItems || []}
        renderItem={(item, index) => (
          <List.Item
            key={`cart-item-${index}-${item.itemName}`}
            actions={[
              <Button danger>
                <DeleteOutlined />
              </Button>,
            ]}
            extra={<Image src={item.thumbnail} width={100} />}
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.itemName}</a>}
              description={item.itemDesc}
            />
          </List.Item>
        )}
      ></List>
    </div>
  );
};

export default CartDrawer;
