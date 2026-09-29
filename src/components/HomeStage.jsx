import React from 'react';
import HomeBackground from './HomeBackground';
import Hero from './Hero';
import Stats from './Stats';
import '../styles/HomeStage.css';

const HomeStage = () => (
  <div className="home-stage">
    <HomeBackground />
    <Hero />
    <Stats />
  </div>
);

export default HomeStage;
