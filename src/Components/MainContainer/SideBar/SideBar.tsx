import { stringify } from "querystring";
import React, { useEffect } from "react";
import { Button, Accordion, ListGroup, Badge } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import styles from "./styles.module.css";
const SideBar = () => {
  const { categories } = useAppSelector((state) => state.product);
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
              key={e.name}
              className={styles.accordion}
              eventKey={`${i}`}
            >
              <Accordion.Header>{e.name}</Accordion.Header>
              <Accordion.Body>
                <ListGroup className={styles.list} as='ol' numbered>
                  {e.nestedCategories!.map((e) => {
                    return (
                      <ListGroup.Item key={e} as='li'>
                        {e}
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
