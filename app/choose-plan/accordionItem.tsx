'use client'
import {useState} from "react";
import { IoIosArrowDown } from "react-icons/io";

export default function AccordionItem({title, content} : {title: string; content: string}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion__card">
      <div className="accordion__header" onClick={() => setIsOpen((prev) => !prev)}>
        <div className="accordion__title">
          {title}
        </div>
        <IoIosArrowDown className={`accordion__icon ${isOpen ? 'accordion__icon--rotate': ""}`}/>
      </div>
      <div className={`collapse ${isOpen ? 'show' : ''}`}>
        <div className="accordion__body--wrapper">
          <div className="accordion__body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
