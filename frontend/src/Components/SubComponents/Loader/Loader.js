import React from 'react';
import './Loader.css';

export default function Loader(props){
  return (
    <div className="col-12">
      <div className="absolute w-1/4 top-50 text-center">
        <div class="lds-circle"><div></div></div>
        <div>Loading...</div></div>
    </div>
  );
}

