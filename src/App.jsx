import { useState, useCallback } from "react";
import { map, first, isEmpty } from "lodash";
import { Input, Button, Flex, Tabs, Result, Avatar, Badge } from "antd";
import { ShoppingOutlined } from '@ant-design/icons'
import viteLogo from "/logo-h.png";
import "./App.css";

import { useTemplateGenerator } from "./hooks";
import ItemDrawer from "./ItemDrawer";

// const menuData = {
//   menu: [
//     {
//       tabName: "Main Course",
//       items: [
//         {
//           thumbnail: "image_url_of_cheeseburger",
//           itemName: "Cheeseburger",
//           itemDesc: "",
//           unitPrice: "$34"
//         },
//         {
//           thumbnail: "image_url_of_cheese_sandwich",
//           itemName: "Cheese sandwich",
//           itemDesc: "",
//           unitPrice: "$22"
//         },
//         {
//           thumbnail: "image_url_of_chicken_burgers",
//           itemName: "Chicken burgers",
//           itemDesc: "",
//           unitPrice: "$23"
//         },
//         {
//           thumbnail: "image_url_of_spicy_chicken",
//           itemName: "Spicy chicken",
//           itemDesc: "",
//           unitPrice: "$33"
//         },
//         {
//           thumbnail: "image_url_of_hot_dog",
//           itemName: "Hot dog",
//           itemDesc: "",
//           unitPrice: "$24"
//         }
//       ]
//     },
//     {
//       tabName: "Appetizers",
//       items: [
//         {
//           thumbnail: "image_url_of_fruit_salad",
//           itemName: "Fruit Salad",
//           itemDesc: "",
//           unitPrice: "$13"
//         },
//         {
//           thumbnail: "image_url_of_cocktails",
//           itemName: "Cocktails",
//           itemDesc: "",
//           unitPrice: "$12"
//         },
//         {
//           thumbnail: "image_url_of_nuggets",
//           itemName: "Nuggets",
//           itemDesc: "",
//           unitPrice: "$13"
//         },
//         {
//           thumbnail: "image_url_of_sandwich",
//           itemName: "Sandwich",
//           itemDesc: "",
//           unitPrice: "$13"
//         },
//         {
//           thumbnail: "image_url_of_french_fries",
//           itemName: "French Fries",
//           itemDesc: "",
//           unitPrice: "$15"
//         }
//       ]
//     },
//     {
//       tabName: "Beverages",
//       items: [
//         {
//           thumbnail: "image_url_of_milk_shake",
//           itemName: "Milk Shake",
//           itemDesc: "",
//           unitPrice: "$3"
//         },
//         {
//           thumbnail: "image_url_of_iced_tea",
//           itemName: "Iced Tea",
//           itemDesc: "",
//           unitPrice: "$2"
//         },
//         {
//           thumbnail: "image_url_of_orange_juice",
//           itemName: "Orange Juice",
//           itemDesc: "",
//           unitPrice: "$2"
//         },
//         {
//           thumbnail: "image_url_of_lemon_tea",
//           itemName: "Lemon Tea",
//           itemDesc: "",
//           unitPrice: "$3"
//         },
//         {
//           thumbnail: "image_url_of_coffee",
//           itemName: "Coffee",
//           itemDesc: "",
//           unitPrice: "$2"
//         }
//       ]
//     }
//   ]
// };

function App() {
  const [input, setInput] = useState("11347520-1a5a-4159-a056-a84591f6a827");
  const [response, setResponse] = useState([]);
  const [isError, setIsError] = useState(false);

  const { tabNames, tabs } = useTemplateGenerator(response);

  const handleFetchTemplate = useCallback(() => {
    fetch(`https://huddles.azurewebsites.net/food_cart/schema/${input}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) setResponse([]);
        setIsError(false);
        setResponse(data);
      })
      .catch((error) => {
        console.log(`Error --`, error);
        setIsError(true);
        setResponse([]);
      });
  }, [input]);

  return (
    <>
      <Flex vertical gap={40}>
        <Flex justify="flex-end">
          <Badge count={1}>
            <Avatar shape="square" size="large" icon={<ShoppingOutlined />} />
          </Badge>
        </Flex>
        <Flex gap={10} justify="center">
          <Input
            placeholder="holographic UUID"
            variant="filled"
            value={input}
            style={{ width: 450 }}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button color="pink" variant="solid" onClick={handleFetchTemplate}>
            Fetch Cart
          </Button>
        </Flex>
        <Flex justify="center">
          {!isEmpty(tabNames) && (
            <Tabs
              // onChange={onChange}
              type="card"
              items={map(tabNames, (tabName, index) => ({
                label: tabName,
                key: index,
                children: <ItemDrawer items={first(tabs[tabName])?.items} />,
              }))}
            />
          )}
          {isError && (
            <Result
              status="warning"
              title="There are some problems with GAIA operation."
              subTitle="GAIA was a hyper-powerful artificial intelligence that played a major role leading up to the events in Horizon Zero Dawn. The single most powerful, most advanced A.I. ever created capable of advanced planetary engineering, GAIA was Project Zero Dawns governing A.I. With its suite of nine subordinate functions, GAIA oversaw Zero Dawn’s successful restoration of life to Earth after its eradication by the Faro Plague."
              extra={
                <Button type="primary" key="console">
                  Email: Elisabet Sobeck
                </Button>
              }
            />
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default App;
