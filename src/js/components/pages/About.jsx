import React, { useRef } from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import styled from "styled-components";
import { animated, useSpring, useChain } from 'react-spring';
import { easeCubicInOut } from 'd3-ease';

//Components

import ProfileSlideshow from '../layouts/ProfileSlideshow';

//Titles

const Greeting = styled.h1`
  text-align: center;
  color: #606060;
`

const Welcome = styled.h2`
  text-align: center;
  color: #A0A0A0
`

//Main components

const MainCard = styled(Card)`
  margin-top: 3em;
  margin-bottom: 3em;
  margin-left: 2em;
  padding: 1em 4em 1em 4em;
  border: 2px solid #c0c0c0;
  text-align: center;
`;

export default function About() {

  //Profiles
  const profiles = [
    {
      id: 0,
      name: "Christian",
      jobs: ['Amateur Chef', 'Software Developer', 'Tech enthusiast'],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/chris.jpg"
    },
    {
      id: 1,
      name: "Doggo",
      jobs: ["Full-time Dog", "Food critic"],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/doggo.jpg"
    },
    {
      id: 2,
      name: "Charlie",
      jobs: ["Chef", "Cookbooks author"],
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.",
      img: "/assets/images/about/charlie.jpg"
    },
    {
      id: 3,
      name: "Sarah",
      jobs: ["Social media manager", "Environmentalist", "Vegan"],
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

  //Build profiles
  
  
  return (
    <Container fluid className="w-100 row align-items-center">
      <Container className="w-50 col-md-6 offset-md-3">
        <animated.div style={fadeAnimation}>
          <Greeting>Hi There!</Greeting>
          <Welcome>Welcome to Veeso</Welcome>
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
            <MainCard className="w-100">

            </MainCard>
          </animated.div>
        </Col>
      </Container>
    </Container>
  )
}
