import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import './App.css';

export default function FreshIdeaTesting() {
  useEffect(() => {
    gsap.config({ trialWarn: false });
    gsap.registerPlugin(ScrollTrigger);

    const split = new SplitType('#target', { type: 'chars' }); // Use SplitType

      const anim = gsap.to(split.chars, {
        //   delay: 1,
        color: 'red', // Change color to white
        stagger: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: ".parent",
          start: 'top center',
          end: 'bottom center',
          scrub: true,
          markers: false,

        },
      });
  }, []);

  return (
   <>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
     <div className="parent">
      <div className="child">
        <h2 id="target" className="heading2 transparent">
          &#42;
          <br />
          To solve modern business challenges, we have{' '}
          <span>fresh ideas</span>, innovative tools,
          and a different outlook on creativity.
        </h2>
      </div>
      {/* Rest of your code */}
    </div>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1> <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
    <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
            <h1>Hello</h1>
   </>
  );
}
