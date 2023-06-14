// import { useEffect } from 'react';
// import Head from 'next/head';
// import gsap from 'gsap';
// import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';

// const Header = () => {
//   gsap.registerPlugin(ScrollTrigger);

//   const getScrollPercent = () => {
//     // Calculate the current scroll position and total page height
//     const scrollTop = window.scrollY;
//     const totalHeight = document.body.scrollHeight - window.innerHeight;
    
//     // Calculate the percentage of the page that has been scrolled
//     const scrollPercent = (scrollTop / totalHeight) * 100;
    
//     console.log(scrollPercent);
//   }

//   useEffect(() => {
//     gsap.fromTo(".header-text", {opacity: 0}, {opacity: 0.5, duration: 1});
//     // Add an event listener for the scroll event
//     window.addEventListener('scroll', getScrollPercent);
//     return () =>  window.removeEventListener('scroll', getScrollPercent);
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>{"Kjourneys"}</title>
//         <meta name="description" content="This is the header for Kjourneys." />
//       </Head>
//       <header>
//         <section className='h-screen w-screen flex items-center justify-center'>
//           <div className='overflow-auto'>
//             <h1 className='header-text font-sans text-[8rem]'>
//               Kjourneys
//             </h1>
//           </div>
//         </section>          
//       </header>
//     </>
//   );
// };

// export default Header;

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

const WordFill = () => {
  const wordRef = useRef(null);
  const timelineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const word = wordRef.current;
    const letters = word.textContent.split('');
    word.textContent = '';

    const timeline = gsap.timeline();

    letters.forEach((letter, index) => {
      const span = document.createElement('span');
      span.textContent = letter;
      span.style.display = 'inline-block';
      span.style.color = '#000';
      span.style.transition = 'color 0.3s ease-out';
      word.appendChild(span);

      timeline.to(span, {
        color: '#f00',
        duration: document.body.scrollHeight,
        ease: 'none',
        delay: index * 0.02,
      });
    });

    timelineRef.current = timeline;

    return () => {
      timeline.kill();
    };
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / totalHeight;

    timelineRef.current.seek(scrollPercent * timelineRef.current.duration());

    if (scrollPercent >= 0.2) {
      gsap.fromTo(
        containerRef.current,
        {
          x: 0,
          y: 0,
          top: '50%',
          left: '50%',
          // transform: 'translate(-50%, -50%)',
        },
        {
          x: 20,
          y: 20,
          top: 0,
          left: 0,
          duration: 5,
          ease: 'power2.out',
        }
      );
    } else {
      gsap.fromTo(
        containerRef.current,
        {
          x: 20,
          y: 20,
          top: 0,
          left: 0,
        },
        {
          x: 0,
          y: 0,
          top: '50%',
          left: '50%',
          duration: 1,
          ease: 'power2.out',
        }
      );
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Kjourneys Header</title>
        <meta name="description" content="This is the header for Kjourneys." />
      </Head>
      <header>
      <section className="h-screen flex items-center justify-center">
        <div ref={containerRef}>
          <h1 className="text-6xl font-medium text-gray-900">
            <p className='block'>K<span ref={wordRef}>armic</span></p>
            <p className='block relative left-6'>journeys</p>
          </h1>
        </div>
      </section>
      </header>
      
    </>
  );
};

export default WordFill;




