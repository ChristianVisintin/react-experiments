/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React, { useState } from "react";
import { Card, Carousel, Image } from "react-bootstrap";
import { animated, useSpring, useTransition } from "react-spring";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

//Classes
import Profile from "../lib/misc/profile";

import "../../css/DarkCarousel.scss";

//Profile components

const ProfileCard = styled(Card)`
  margin-top: 3em;
  margin-bottom: 3em;
  padding: 1em 2em 1em 2em;
  border: 1px solid #c0c0c0;
  text-align: center;
  min-height: 75vh;
`;

const ProfilePicture = styled(Image)`
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

export interface ProfileSlideshowProps {
  profiles: Array<Profile>;
}

export default function ProfileSlideshow(props: ProfileSlideshowProps) {
  const [animatedProfile, setAnimatedProfile] = useState(0);

  const profilesObj = props.profiles.map((p, index) => {
    //Build job transition first
    const jobsTransitions = useTransition(p.jobs, index, {
      from: { overflow: "hidden", height: 0, opacity: 0 },
      enter: { height: 50, opacity: 1 },
      leave: { height: 0, opacity: 0 },
      trail: 250,
      reset: animatedProfile === p.id,
      reverse: animatedProfile !== p.id,
      config: { duration: 750 },
    });
    const descTransition = useSpring({
      opacity: 1,
      from: { opacity: 0 },
      config: { duration: 700 },
      delay: 750,
      reset: animatedProfile === p.id,
      reverse: animatedProfile !== p.id,
    });

    //Then return carousel item
    return (
      <Carousel.Item key={p.id.toString()}>
        <ProfileCard className="w-100">
          <ProfileTitle>{p.name}</ProfileTitle>
          <ProfilePicture src={p.img} roundedCircle />
          <Card.Body>
            <React.Fragment>
              {jobsTransitions.map(({ item, props, key }) => (
                <animated.div key={key} style={props}>
                  <Job>
                    <FormattedMessage id={item} />
                  </Job>
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
    <Carousel
      className="d-block dark-carousel"
      interval={10000}
      onSlid={(ev: React.SetStateAction<number>) => setAnimatedProfile(ev)}
    >
      {profilesObj}
    </Carousel>
  );
}

ProfileSlideshow.propTypes = {
  profiles: PropTypes.array.isRequired,
};
