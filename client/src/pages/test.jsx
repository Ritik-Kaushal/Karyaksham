import React, { useState } from 'react';
import Datetime from 'react-datetime';

import moment from 'moment';
var yesterday = moment().subtract( 1, 'day' );
var valid = function( current ){
    return current.isAfter( yesterday );
};



export default function test() {
    return <Datetime renderInput={renderInput } isValidDate={ valid } />;
}

function renderInput( props, openCalendar, closeCalendar ){
    function clear(){
        props.onChange({target: {value: ''}});
    }
    return (
        <div>
            <input {...props} />
            <button onClick={openCalendar}>open calendar</button>
            <button onClick={closeCalendar}>close calendar</button>
            <button onClick={clear}>clear</button>
        </div>
    );
}