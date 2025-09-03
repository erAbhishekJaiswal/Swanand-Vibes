// Spinner.js
import React from 'react';
import './css/Spinner.css';

const Spinner = ({ 
  type = 'ring', 
  size = 'medium', 
  color = 'primary', 
  text = '',
  centered = true
}) => {
  const spinnerClass = `spinner spinner-${type} spinner-${size} spinner-${color} ${centered ? 'spinner-centered' : ''}`;
  
  return (
    <div className={spinnerClass}>
      <div className="spinner-inner">
        {type === 'ring' && <RingSpinner />}
        {type === 'dual-ring' && <DualRingSpinner />}
        {type === 'ellipsis' && <EllipsisSpinner />}
        {type === 'ripple' && <RippleSpinner />}
        {type === 'hourglass' && <HourglassSpinner />}
        {type === 'dots' && <DotsSpinner />}
        {type === 'cube' && <CubeSpinner />}
        {type === 'pulse' && <PulseSpinner />}
        {type === 'progress' && <ProgressSpinner />}
      </div>
      {text && <div className="spinner-text">{text}</div>}
    </div>
  );
};

// Individual spinner components
const RingSpinner = () => (
  <div className="ring"></div>
);

const DualRingSpinner = () => (
  <div className="dual-ring"></div>
);

const EllipsisSpinner = () => (
  <div className="ellipsis">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const RippleSpinner = () => (
  <div className="ripple">
    <div></div>
    <div></div>
  </div>
);

const HourglassSpinner = () => (
  <div className="hourglass"></div>
);

const DotsSpinner = () => (
  <div className="dots">
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const CubeSpinner = () => (
  <div className="cube-grid">
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
    <div className="cube"></div>
  </div>
);

const PulseSpinner = () => (
  <div className="pulse"></div>
);

const ProgressSpinner = () => (
  <div className="progress-spinner">
    <div className="progress-circle">
      <div className="progress-circle-inner"></div>
    </div>
  </div>
);

export default Spinner;