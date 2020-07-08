import React, { useRef, useEffect } from "react";
import gigStyle from "./Gigs.module.scss";
import GigMap from "./GigMap";
import { addRef, setCurrent, setActive } from "../../actions/refs";
import { connect } from "react-redux";
import IntersectionObserver from "intersection-observer-polyfill";
import { gigs } from "./gigArray";
const Gigs = ({ addRef, setCurrent, setActive }) => {
  const gigsRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCurrent("gigs");
        }
      },
      { rootMargin: "-200px 0px -200px 0px", threshold: 0.2 }
    );
    if (gigsRef.current) {
      observer.observe(gigsRef.current);
    }
    if (gigsRef.current !== null) addRef(gigsRef);
  }, [addRef, gigsRef, setCurrent, setActive]);

  return (
    <section className={gigStyle.section}>
      <div className={gigStyle.heading} ref={gigsRef} id="gigs">
        <h2>Upcoming Gigs</h2>
        <div className={gigStyle.decorator}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <GigMap gigs={gigs} />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    refs: state.refs,
  };
};

export default connect(mapStateToProps, { addRef, setCurrent, setActive })(
  Gigs
);
