import React, { useState, useRef } from "react";
import "./styles.css";
import { Flex, HStack, Tag } from "@chakra-ui/react";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

type Props = {};

export default function AppChip({}: Props) {
  let scrl = useRef<any>(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift: any) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      scrl.current &&
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  //Anim
  //   const anim = (e) => {
  //     gsap.from(e.target, { scale: 1 });
  //     gsap.to(e.target, { scale: 1.5 });
  //   };
  //   const anim2 = (e) => {
  //     gsap.from(e.target, { scale: 1.5 });
  //     gsap.to(e.target, { scale: 1 });
  //   };

  const scrollCheck = () => {
    if (scrl.current) {
      setscrollX(scrl.current.scrollLeft);
      if (
        Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
        scrl.current.offsetWidth
      ) {
        setscrolEnd(true);
      } else {
        setscrolEnd(false);
      }
    }
  };

  const rowData = [
    "PredictorConfig.",
    "Candidate Algorithm Config.",
    "Other Config",
    "Predictor Config.",
    "Candidate Algorithm Config.",
    "Other Config",
  ];

  return (
    <Flex>
      {scrollX !== 0 && (
        <button
          className="prev"
          onClick={() => slide(-50)}
          onMouseEnter={(e) => {}}
          onMouseLeave={(e) => {}}
        >
          <FiArrowLeft />
        </button>
      )}
      <ul ref={scrl} onScroll={scrollCheck}>
        <HStack spacing={4}>
          {rowData.map((d, i) => (
            <Tag as="li" key={i} variant="solid" colorScheme="teal">
              {d}
            </Tag>
          ))}
        </HStack>
      </ul>
      {!scrolEnd && (
        <button
          className="next"
          onClick={() => slide(+50)}
          onMouseEnter={(e) => {}}
          onMouseLeave={(e) => {}}
        >
          <FiArrowRight />
        </button>
      )}
    </Flex>
  );
}
