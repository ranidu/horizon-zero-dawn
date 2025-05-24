import { Outlet, Link, useParams } from "react-router";
import { size } from "lodash";
import { Flex, Avatar, Badge } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { useAppSelector } from "../hooks";
import { showCart } from "../features/cart";

const HomeLayout = () => {
  const { catalogId } = useParams()  
  const cartItems = useAppSelector(showCart);

  return (
    <div>
      <Flex justify="flex-end">
        <Badge count={size(cartItems)}>
          <Link to={`/${catalogId}/cart`}>
            <Avatar shape="square" size="large" icon={<ShoppingOutlined />} />
          </Link>
        </Badge>
      </Flex>
      <Outlet />
    </div>
  );
};

export default HomeLayout;
