import { useState, useEffect } from 'react';
import ClientOnlyPortal from './ClientOnlyPortal';

const btnRef = React.createRef();

export default function Modal({ buttonRef }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({});
  // const [onButton, setOnButton] = useState(false);
  // const [onTooltip, setOnTooltip] = useState(false);
  const [mouseTracked, setMouseTracked] = useState(false);

  const updateTooltipCoords = (button) => {
    const rect = button.getBoundingClientRect();
    setCoords({
      left: rect.x, // add half the width of the button for centering
      top: rect.y + window.scrollY + rect.height + -1, // add scrollY offset, as soon as getBountingClientRect takes on screen coords
    });
  };

  const trackMouse = (e) => {
    setMouseTracked(true);
    console.log('tracking mouse');
    console.log('mouseTracked : ' + mouseTracked);

    // if (!open) {
    // setOpen(true);
    // updateTooltipCoords(e.target);
    setOpen(true);
    console.log(open);
    // }
  };

  const untrackMouse = (e) => {
    setMouseTracked(false);

    console.log('leaving');
    console.log('mouseTracked : ' + mouseTracked);

    setTimeout(() => {
      if (!mouseTracked) {
        setOpen(false);
      }
    }, 100);

    // setTimeout(() => {
    //   // updateTooltipCoords(e.target);
    //   setOpen(!open);
    // }, 100);
  };

  return (
    <>
      {/* <button
        type='button'
        className='button'
        ref={buttonRef}
        onClick={(e) => {
          updateTooltipCoords(e.target);
          setOpen(!open);
        }}
        // onMouseEnter={(e) => {
        //   trackMouse();
        //   updateTooltipCoords(e.target);
        // }}
        // onMouseEnter={(e) => trackMouse(e)}
        // onMouseLeave={(e) => {
        //   setMouseTracked(false);
        //   untrackMouse();
        // }}
        // onMouseLeave={(e) => untrackMouse(e)}
      >
        Open Modal
      </button> */}
      {open && (
        <TooltipPopover
          coords={coords}
          updateTooltipCoords={() => updateTooltipCoords(btnRef.current)}
          toggle={() => setOpen(!open)}
          // track={trackMouse}
          // untrack={untrackMouse}
          // onMouseLeave={(e) => untrackMouse()}
        >
          Test!
        </TooltipPopover>
      )}
      <style jsx>{`
        :global(body) {
          overflow: initial;
        }
        .backdrop {
          position: fixed;
          background-color: rgba(0, 0, 0, 0);
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        .button,
        .buttonPrimary {
          font-weight: 500;
          border-radius: 0.3rem;
          margin: 0;
          cursor: pointer;
          font-size: 1rem;
          line-height: 1rem;
          padding: 0.5rem 0.7rem;
          position: relative;
          z-index: 10;
          box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.05),
            inset 0 0.1rem 0.2rem rgba(255, 255, 255, 0.15),
            inset 0 -0.1rem 0.1rem rgba(0, 0, 0, 0.05);
          background-color: #fff;
          border: 1px solid rgba(204, 204, 204, 0.7);
          color: #555;
          text-decoration: none;
          transition: all 200ms ease-in-out;
        }

        .button:hover {
          background-color: #fff;
          border-color: #aaa;
          color: #555;
        }
      `}</style>
    </>
  );
}

const TooltipPopover = ({ children, coords, updateTooltipCoords, toggle }) => {
  const updateCoords = updateTooltipCoords;

  useEffect(() => {
    window.addEventListener('resize', updateCoords);
    return () => window.removeEventListener('resize', updateCoords);
  }, []);

  return (
    // <div onMouseEnter={(e) => track(e)} onMouseLeave={(e) => untrack}>
    <div>
      {/* onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}> */}
      <ClientOnlyPortal selector='#modal'>
        <div className='modal'>
          {children}
          <br />
          <br />
          <button
            type='button'
            className='button'
            onClick={(e) => {
              toggle();
            }}
          >
            Close Modal
          </button>
        </div>
        <style jsx>{`
          .modal {
            background-color: #1d1e24;
            color: white;
            position: absolute;
            top: ${coords.top}px;
            left: ${coords.left}px;
            padding: 1rem 1.25rem;
            border: 1px solid #343741;
            width: 200px;
            z-index: 10;
            overflow: hidden;
            border-radius: 0.5rem;
            box-shadow: 0 0.15rem 0.3rem rgba(0, 0, 0, 0.2);
          }
          .button,
          .buttonPrimary {
            float: right;
            font-weight: 500;
            border-radius: 0.3rem;
            font-size: 0.8rem;
            margin: 0;
            cursor: pointer;
            line-height: 1rem;
            padding: 0.5em 0.7em;
            position: relative;
            z-index: 10;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 0.796875px 0.6666666865348816px
                0px,
              rgba(0, 0, 0, 0.075) 0px 2.296875px 2px 0px;
            background-color: #343741;
            border: 1px solid rgba(204, 204, 204, 0.5);
            border: 0;

            text-decoration: none;
            transition: all 150ms ease-in-out;
            color: #429cff;
            background-color: rgba(35, 140, 255, 0.2);
          }

          .button:hover {
            box-shadow: rgba(0, 0, 0, 0.25) 0px 1px 5px 0px,
              rgba(0, 0, 0, 0.176) 0px 3.5989582538604736px 13px 0px,
              rgba(0, 0, 0, 0.15) 0px 8.395833015441895px 23px 0px,
              rgba(0, 0, 0, 0.125) 0px 23px 35px 0px;
            text-decoration: underline;
            transform: translateY(-1px) rotateZ(0.01deg);
          }
        `}</style>
      </ClientOnlyPortal>
    </div>
  );
};
