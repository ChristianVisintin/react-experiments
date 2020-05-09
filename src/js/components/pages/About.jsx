import React, { useRef } from 'react';
import { Col, Container, Form } from 'react-bootstrap';
import styled from "styled-components";
import { animated, useSpring, useChain } from 'react-spring';
import { easeCubicInOut } from 'd3-ease';
import { FormattedMessage } from 'react-intl';

//Components

import ProfileSlideshow from '../layouts/ProfileSlideshow';
import AboutMain from "../layouts/AboutMain";

//AboutContainer
const AboutContainer = styled(Container)`
  background-image: url("/assets/images/gfx/fruits-eating-food-on-wood-326268.jpg");
`

//Titles
const Greeting = styled.h1`
  text-align: center;
  color: #F0F0F0;
  font-size: 5em;
`

const Welcome = styled.h2`
  text-align: center;
  color: #FFFFFF;
  font-size: 3em;
`

export default function About() {

  //Profiles
  const profiles = [
    {
      id: 0,
      name: "Christian",
      jobs: ['about.profiles.christian.amateurChef', 'about.profiles.christian.swdev', 'about.profiles.christian.techEnthusiast'],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/chris.jpg"
    },
    {
      id: 1,
      name: "Doggo",
      jobs: ["about.profiles.doggo.fullTimeDog", "about.profiles.doggo.foodCritic"],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/doggo.jpg"
    },
    {
      id: 2,
      name: "Charlie",
      jobs: ["about.profiles.charlie.chef", "about.profiles.charlie.author"],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/charlie.jpg"
    },
    {
      id: 3,
      name: "Sarah",
      jobs: ["about.profiles.sarah.socialMediaManager", "about.profiles.sarah.vegan", "about.profiles.sarah.environmentalist"],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/sarah.jpg"
    }
  ];

  //Animations
  //Welcome fade
  const fadeAnimationRef = useRef();
  const fadeAnimation = useSpring({opacity: 1, from: { opacity: 0 }, config: { duration: 700 }, ref: fadeAnimationRef});
  //Profile tab animation
  const profileTabAnimationRef = useRef();
  const profileTabAnimation = useSpring({from: {transform: "translate(-100%, 0)"}, to: {transform: "translate(5%, 0)"}, config: { duration: 700, easing: easeCubicInOut }, ref: profileTabAnimationRef});
  //Main tab
  const mainTabAnimationRef = useRef();
  //const mainTabAnimation = useSpring({opacity: 1, from: { opacity: 0 }, config: { duration: 1000 }, ref: mainTabAnimationRef});
  const mainTabAnimation = useSpring({from: {transform: "translate(120%, 0)"}, to: {transform: "translate(0%, 0)"}, config: { duration: 700, easing: easeCubicInOut }, ref: mainTabAnimationRef});
  //Chain animations
  useChain([fadeAnimationRef, profileTabAnimationRef, mainTabAnimationRef], [0, 0.5, 1]);
  
  return (
    <AboutContainer fluid className="w-100 row align-items-center">
      <Container className="w-50 col-md-6 offset-md-3">
        <animated.div style={fadeAnimation}>
          <Greeting>
            <FormattedMessage id="about.title" />
          </Greeting>
          <Welcome>
          <FormattedMessage id="about.subtitle" />
          </Welcome>
        </animated.div>
      </Container>
      <Container fluid className="w-100 row">
        <Col sm={3}>
          <animated.div style={profileTabAnimation}>
            <ProfileSlideshow profiles={profiles} />
          </animated.div>
        </Col>
        <Col sm={9}>
          <animated.div style={mainTabAnimation}>
            <AboutMain />
          </animated.div>
        </Col>
      </Container>
    </AboutContainer>
  )
}
