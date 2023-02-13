import { stringify } from "querystring";
import React, { useEffect } from "react";
import { Button, Accordion, ListGroup, Badge } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import styles from "./styles.module.css";
const SideBar = () => {
  const { categories } = useAppSelector((state) => state.product);
  console.log(categories);

  return (
    <div className={`${styles.container} `}>
      <h3 className={styles.header}>Categories</h3>
      <Accordion
        className={styles.accordian}
        defaultActiveKey={["0"]}
        alwaysOpen
      >
        {categories.map((e, i) => {
          return (
            <Accordion.Item
              key={e.id}
              className={styles.accordion}
              eventKey={`${i}`}
            >
              <Accordion.Header>{e.category}</Accordion.Header>
              <Accordion.Body>
                <ListGroup className={styles.list} as='ol' numbered>
                  {e.subCategory.map((e) => {
                    return (
                      <ListGroup.Item key={e.id} as='li'>
                        {e.name}
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SideBar;
