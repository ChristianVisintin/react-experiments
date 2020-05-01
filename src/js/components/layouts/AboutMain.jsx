import React from 'react';
import { Card } from 'react-bootstrap';
import styled from "styled-components";

//Main components
const MainCard = styled(Card)`
  margin-top: 3em;
  margin-bottom: 3em;
  margin-left: 2em;
  padding: 1em 4em 1em 4em;
  border: 2px solid #c0c0c0;
  text-align: center;
`;

export default function AboutMain() {
  return (
    <MainCard className="w-100">
      <Card.Body>
        <Card.Title>About Veeso</Card.Title>
        <Card.Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ultrices arcu at nisi rhoncus, et fringilla leo vestibulum. Nam a odio felis. Nam sit amet diam et dui semper suscipit. Phasellus blandit, nisl eu mollis luctus, dolor dui luctus sem, quis aliquet diam metus in dui. Duis eget placerat elit. Suspendisse vel lacinia arcu, sodales vestibulum ipsum. Mauris sit amet nibh quis tellus blandit ullamcorper. Phasellus molestie porttitor orci sollicitudin vestibulum. Cras nec massa nulla. Fusce eget erat in est hendrerit dignissim. Curabitur urna enim, cursus vel rhoncus at, convallis sit amet odio. Praesent bibendum congue dignissim. Nam gravida lacus ac lorem tincidunt, id dictum dolor porta. Suspendisse facilisis efficitur erat.</Card.Text>
        <hr/>
        <Card.Title>What do we offer?</Card.Title>
        <Card.Text className="align-items-center">
        Donec lacinia, metus vitae faucibus convallis, diam elit faucibus arcu, id tincidunt libero orci sit amet neque. Aliquam elementum sit amet sem eu tristique. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit elit, tempor quis euismod at, consequat eu velit. Praesent sit amet feugiat sem. Proin auctor in dolor id bibendum. Pellentesque interdum congue hendrerit. Integer at turpis volutpat, varius purus in, lobortis ante. Donec semper ex elit, ut sollicitudin risus interdum quis. Proin et consectetur arcu. Nullam non ligula in dui fringilla vehicula. Morbi efficitur in leo sit amet hendrerit. Nulla tincidunt arcu id vehicula porta.
        </Card.Text>
        <hr/>
        <Card.Title>Our project</Card.Title>
        <Card.Body>Donec lacinia, metus vitae faucibus convallis, diam elit faucibus arcu, id tincidunt libero orci sit amet neque. Aliquam elementum sit amet sem eu tristique. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elit elit, tempor quis euismod at, consequat eu velit. Praesent sit amet feugiat sem. Proin auctor in dolor id bibendum. Pellentesque interdum congue hendrerit. Integer at turpis volutpat, varius purus in, lobortis ante. Donec semper ex elit, ut sollicitudin risus interdum quis. Proin et consectetur arcu. Nullam non ligula in dui fringilla vehicula. Morbi efficitur in leo sit amet hendrerit. Nulla tincidunt arcu id vehicula porta.</Card.Body>
        <hr/>
        <Card.Title>Our Goals</Card.Title>
        <Card.Body>Sed placerat non enim id fermentum. Vestibulum blandit neque ligula. Ut ipsum diam, sollicitudin a iaculis sit amet, commodo vel tortor. Mauris ut ultricies erat, vel luctus dui. Ut elementum at augue quis sollicitudin. Praesent egestas urna a ipsum posuere malesuada vitae vel tortor. Sed odio magna, venenatis vitae mauris id, aliquam facilisis ante. Donec iaculis, nisi eget pulvinar venenatis, massa libero aliquam nibh, a hendrerit massa mauris id urna. Aliquam eu tellus laoreet, pellentesque mi eget, ultrices mauris. In porttitor justo ut risus finibus convallis. Ut eget accumsan erat. In aliquam dolor turpis, in interdum augue suscipit convallis. Vivamus pharetra purus vel mollis interdum. Aliquam ac purus eu enim convallis pellentesque vel nec lorem. Sed a tincidunt eros.</Card.Body>
      </Card.Body>
    </MainCard>
  )
}
