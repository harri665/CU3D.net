import React, { useState, useRef } from 'react';

const HistoryBlock = ({ bgClass, years, title, isActive, onClick }) => {
  return (
    <div
      className={`relative w-full ${isActive ? 'h-[400px]' : 'h-[150px]'} 
      bg-gray-400 mb-4 shadow-lg cursor-pointer transition-all duration-200 ${bgClass} bg-cover`}
      onClick={onClick}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 transition-background duration-500"></div>
      <div className="absolute top-4 left-4 text-white font-bold text-2xl">{years}</div>
      <div className={`absolute top-16 left-4 text-white text-sm ${isActive ? 'w-[80%]' : 'w-[60%]'} transition-all duration-200`}>
        {title}
      </div>
      {isActive && (
        <div className="absolute bottom-4 left-4 text-white text-lg">
          <ul className="space-y-2">
            {years.split(' - ').map((year, index) => (
              <li key={index} className="relative">
                <span className="hover:text-yellow-400 transition-all duration-500">{year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const timelineRef = useRef(null);

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div 
      id="container" 
      className="relative w-full bg-gray-300 overflow-hidden mt-8 flex flex-col items-center"
      ref={timelineRef}
    >
      <div
        id="thumbs"
        className="flex flex-col w-full p-4 transition-all duration-300"
      >
        {[
          { bgClass: 'bg-[url("http://www.unido.org/uploads/tx_templavoila/history_07.jpg")]', years: '1966 - 1976', title: 'Lorem ipsum dolor sit amet...' },
          { bgClass: 'bg-[url("http://austria-forum.org/attach/Wissenssammlungen/Bibliothek/Wien_mit_den_Augen_des_Adlers/Wien_der_Moderne/UNO-City,_Austria_Center_Vienna/dkaiser_hav_25.jpg")]', years: '1976 - 1986', title: 'Lorem ipsum dolor sit amet...' },
          { bgClass: 'bg-[url("https://upload.wikimedia.org/wikipedia/commons/e/e8/Power_Plant_(Tianjin,_China).jpg")]', years: '1986 - 1996', title: 'Lorem ipsum dolor sit amet...' },
          { bgClass: 'bg-[url("http://www.oxfordbusinessgroup.com/sites/default/files/styles/chapter_header__710x233_/public/chapter_headers/ind1_2.png?itok=uxI_081i&c=af7608f5f35cf219c326e9b6e6a7d34c")]', years: '1996 - 2006', title: 'Lorem ipsum dolor sit amet...' },
          { bgClass: 'bg-[url("http://www.3adi.org/tl_files/3ADIDocuments/Pictures/Greenshot_2014-01-08_18-32-54.jpg")]', years: '2006 - 2016', title: 'Lorem ipsum dolor sit amet...' },
          { bgClass: 'bg-[url("https://i.dailymail.co.uk/i/pix/2012/07/23/article-0-142DF918000005DC-387_468x665.jpg")]', years: 'FUTURE', title: 'To our bright future!!! :)' },
        ].map((block, index) => (
          <HistoryBlock
            key={index}
            bgClass={block.bgClass}
            years={block.years}
            title={block.title}
            isActive={index === activeIndex}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
