import React, { useState, useEffect, useRef } from 'react'

const Dropdown = ({label, options, selected, onSelectedChange}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        document.body.addEventListener('click', (event) => {
           // console.log('BODY CLICK!'); 1st log before adding event above
           // console.log(event.target); 2nd log after adding event
           if (ref.current && ref.current.contains(event.target)) {
               return;
           }
            setOpen(false);
        }, {capture: true});
    }, []);

    const renderedOptions = options.map((option) => {
        if (option.value === selected.value) {
            return null;
        }
        return (
            <div 
                key={option.value} 
                className="item"
                onClick={() => {
                   // console.log('ITEM CLICKED');
                    onSelectedChange(option);
                }}    
            >
                {option.label}
            </div>
        );
    });

    // console.log(ref.current);

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className='Label'>{label}</label>
                <div onClick={() => {
                    // console.log('DROPDOWN CLICKED');
                    setOpen(!open)
                    }} 
                    className= {`ui selection dropdown ${open ? 'visible active' : ''}`} 
                >
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className= {`menu ${open ? 'visible transition' : ''}`} >
                        {renderedOptions}
                    </div>
                </div>
            </div>
            {/* <div style={{color: selected.value}} >
                {`The text is ${selected.value}`}
            </div> */}
        </div>
    )
}

export default Dropdown
