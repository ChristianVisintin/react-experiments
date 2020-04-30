import React from 'react';
import { Card, Container, Image } from 'react-bootstrap';
import Anime from 'react-anime';
import styled from "styled-components";

import { getWidth } from '../../utils';

const Greeting = styled.h1`
  text-align: center;
  color: #606060;
`

const Welcome = styled.h2`
  text-align: center;
  color: #A0A0A0
`

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
`

const ProfileDesc = styled(Card.Text)`
  text-align: justify;
`

export default function About() {

  const jobs = ['Software Developer', 'Tech enthusiast', 'Amateur Chef'];
  
  return (
    <Container fluid className="w-100 row align-items-center">
      <Container className="w-50 col-md-6 offset-md-3">
        <Anime opacity={[0,1]} duration={1000} easing="easeInQuart">
          <Greeting>Hi there!</Greeting>
          <Welcome>Welcome to Veeso</Welcome>
        </Anime>
      </Container>
      <Anime translateX={[-1024, 64]} duration={1000} delay={1000} easing="easeInBounce">
        <ProfileCard className="w-25">
          <ProfileTitle>Christian Visintin</ProfileTitle>
          <ProfilePicture as={Image} src="/assets/images/about/photo.jpg" roundedCircle />
          <Card.Body>
            <Anime opacity={[0, 1]} translateY={[-64, 0]} delay={(el, i) => (i * 200) + 1000} duration={1200} easing="easeInBounce">
              {jobs.map((j, i) => <Job key={i}>{j}</Job>)}
            </Anime>
            <ProfileDesc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut volutpat vestibulum lacus, id pulvinar odio interdum ut. Pellentesque sollicitudin efficitur augue, quis gravida sapien auctor non. Etiam sapien nulla, ornare ut augue.
            </ProfileDesc>
          </Card.Body>
        </ProfileCard>
      </Anime>
    </Container>
  )
}
