import React from "react";
import { Button, Accordion, ListGroup, Badge } from "react-bootstrap";
import styles from "./styles.module.css";
const SideBar = () => {
  return (
    <div className={`${styles.container} `}>
      <h3 className={styles.header}>Categories</h3>
      <Accordion
        className={styles.accordian}
        defaultActiveKey={["0"]}
        alwaysOpen
      >
        <Accordion.Item className={styles.accordion} eventKey='0'>
          <Accordion.Header>Woman</Accordion.Header>
          <Accordion.Body>
            <ListGroup className={styles.list} as='ol' numbered>
              <ListGroup.Item as='li'>T-shirt</ListGroup.Item>
              <ListGroup.Item as='li'>lala</ListGroup.Item>
              <ListGroup.Item as='li'>blabla</ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className={styles.accordion} eventKey='1'>
          <Accordion.Header>Man</Accordion.Header>
          <Accordion.Body>
            <ListGroup className={styles.list} as='ol' numbered>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
              <ListGroup.Item as='li'>Cras justo odio</ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    // <div>
    //   <div className={styles.category}>
    //     <div className={styles.title}>
    //       <h3>Categories</h3>
    //     </div>
    //     <div className={styles.categoryAccordian}>
    //       <div className={styles.accordian}>
    //         <div className={styles.card}>
    //           <div className={styles.cardHeading}>
    //             <a>Woman</a>
    //           </div>
    //           <div className={styles.cardBody}>
    //             <ul>
    //               <li>
    //                 <a href='#'>Coats</a>
    //               </li>
    //               <li>
    //                 <a href='#'>Jacketss</a>
    //               </li>
    //               <li>
    //                 <a href='#'>Dresses</a>
    //               </li>
    //               <li>
    //                 <a href='#'>Shitrts</a>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SideBar;
