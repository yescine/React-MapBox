import React from 'react';
import {SvgIcon} from '@material-ui/core';

function SvgIconStyled (props) {
  const {viewBox, svg, fontSize,onClick} = props; 
  return (
    <SvgIcon 
      onClick={onClick}
      style={{fontSize:fontSize?fontSize:'2.2rem'}} 
      component={svg} 
      shapeRendering='geometricPrecision' 
      viewBox={viewBox?viewBox:'0 0 600 600'} 
    />
  );
}

export default SvgIconStyled;
