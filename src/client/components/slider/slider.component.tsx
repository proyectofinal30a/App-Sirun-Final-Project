import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import styles from "./style/slider.module.css";

const swipeConfidenceThreshold = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const Slider = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const images: string[] = [
    "https://images.unsplash.com/photo-1615837197154-2e801f4bd294?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1612201143788-b15844da6606?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FrZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1542826438-bd32f43d626f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1601740982034-56bc80e986ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGN1cGNha2V8ZW58MHx8MHx8&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1582461833047-2aeb4f8af173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHRhcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1892&q=80",
    "https://images.unsplash.com/photo-1503485838016-53579610c389?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHRhcnRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1892&q=80",
  ];

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPage([page + 1, direction]);
    }, 5000);

    return () => clearInterval(interval);
  });

  return (
    <div className={styles.slider__container}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          className={styles.img}
          key={page}
          src={images[imageIndex]}
          custom={direction}
          // variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>

      <div className={styles.actions}>
        <div
          className={styles.next}
          onClick={() => setTimeout(() => paginate(1), 200)}
        >
          {"‣"}
        </div>

        <div
          className={styles.prev}
          onClick={() => setTimeout(() => paginate(-1), 200)}
        >
          {"‣"}
        </div>
      </div>
    </div>
  );
};

export default Slider;
