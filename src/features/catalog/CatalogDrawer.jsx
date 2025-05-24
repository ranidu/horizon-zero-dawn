import { useParams } from "react-router";
import { Flex, Result, Button, Tabs, Spin } from 'antd'
import { isEmpty, map, first } from "lodash";
import { useEffect, useState } from "react";
import { useTemplateGenerator, useAppDispatch} from '../../hooks'
import { addToCart } from '../cart'
import ItemDrawer from "./ItemDrawer";

const CatalogDrawer = () => {
  const { catalogId } = useParams();
  const dispatch = useAppDispatch()

  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false);

  const { tabNames, tabs } = useTemplateGenerator(catalog);

  useEffect(() => {
    setIsLoading(true)
    fetch(`https://huddles.azurewebsites.net/food_cart/schema/${catalogId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) setCatalog([]);
        setIsError(false);
        setCatalog(data);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(`Error --`, error);
        setIsError(true);
        setCatalog([]);
        setIsLoading(false)
      });
  }, [catalogId]);

    const handleAddToCart = (item) => {
      if(!item) return
      dispatch(addToCart(item))
    }
  
  if(isLoading) return <Flex justify="center" align="center" style={{ height: 500 }}><Spin size="large" /> </Flex> 

  return (
    <div>
      <h1>Food Catalog</h1>
      <Flex justify="center">
        {!isEmpty(tabNames) && (
          <Tabs
            // onChange={onChange}
            type="card"
            items={map(tabNames, (tabName, index) => ({
              label: tabName,
              key: index,
              children: (
                <ItemDrawer
                  items={first(tabs[tabName])?.items}
                  handleAdd={handleAddToCart}
                />
              ),
            }))}
          />
        )}
        {isError && (
          <Result
            status="error"
            title="Something went wrong!"
            subTitle="There are some problems with fetching Catalog."
            extra={
              <Button type="primary" key="console">
                Retry
              </Button>
            }
          />
        )}
      </Flex>
    </div>
  );
};

export default CatalogDrawer;
