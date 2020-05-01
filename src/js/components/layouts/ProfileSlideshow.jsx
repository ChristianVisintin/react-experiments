import React, { useState, useRef } from "react";
import { Card, Carousel, Image } from "react-bootstrap";
import { animated, useChain, useSpring, useTransition } from "react-spring";
import styled from "styled-components";
import PropTypes from "prop-types";

import "../../../css/DarkCarousel.css";

//Profile components

const ProfileCard = styled(Card)`
  margin-top: 3em;
  margin-bottom: 3em;
  padding: 1em 2em 1em 2em;
  border: 1px solid #c0c0c0;
  text-align: center;
`;

const ProfilePicture = styled(Card.Img)`
  margin-left: 12.5%;
  width: 75%;
`;

const ProfileTitle = styled(Card.Title)`
  font-size: 2.5em;
`;

const Job = styled(Card.Title)`
  font-size: 1.1em;
  color: #808080;
`;

const ProfileDesc = styled(Card.Text)`
  text-align: justify;
`;

export default function ProfileSlideshow(props) {
  const [animatedProfile, setAnimatedProfile] = useState(0);

  const profilesObj = props.profiles.map((p) => {
    //Build job transition first
    const jobsTransitions = useTransition(p.jobs, p.key, {
      from: { overflow: "hidden", height: 0, opacity: 0 },
      enter: { height: 50, opacity: 1 },
      leave: { height: 0, opacity: 0 },
      trail: 250,
      reset: animatedProfile === p.id,
      reverse: animatedProfile !== p.id,
      config: { duration: 750 }
    });
    const descTransition = useSpring({opacity: 1, from: { opacity: 0 }, config: { duration: 700 }, delay: 750, reset: animatedProfile === p.id, reverse: animatedProfile !== p.id});
    
    //Then return carousel item
    return (
      <Carousel.Item key={p.id}>
        <ProfileCard className="w-100">
          <ProfileTitle>{p.name}</ProfileTitle>
          <ProfilePicture as={Image} src={p.img} roundedCircle />
          <Card.Body>
            <React.Fragment>
              {jobsTransitions.map(({ item, props, key }) => (
                <animated.div key={key} style={props}>
                  <Job>{item}</Job>
                </animated.div>
              ))}
            </React.Fragment>
            <animated.div style={descTransition}>
              <ProfileDesc>{p.body}</ProfileDesc>
            </animated.div>
          </Card.Body>
        </ProfileCard>
      </Carousel.Item>
    );
  });

  return (
    <Carousel className="d-block" interval="10000" onSlid={ev => setAnimatedProfile(ev)}>
      {profilesObj}
    </Carousel>
  );
}

ProfileSlideshow.propTypes = {
  profiles: PropTypes.array.isRequired,
};
