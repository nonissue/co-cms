// Externals
import React, { useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './dropdown.module.css';

const propTypes = {
  content: PropTypes.node.isRequired,
  position: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// Content is the content to be revealed when dropdown controller is pressed
// position isn't currently implemented
// children is the 'controller' that will allow the user to reveal/hide dropdown content

const Dropdown = ({ content, position, children }) => {
  const node = useRef();
  const [isVisible, setVisible] = useState(false);

  // handle click outside dropdown
  const onWindowClick = useCallback(
    (ev) => {
      if (node.current.contains(ev.target)) {
        // inside click
        console.log('inside click');
        return;
      }
      // outside click
      setVisible(false);
    },
    [isVisible]
  );

  // handle esc pressed
  const onEsc = useCallback(
    (ev) => {
      if (ev.keyCode === 27 && isVisible === true) {
        setVisible(false);
      }
    },
    [isVisible]
  );

  // add listener for clicks
  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', onWindowClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener('mousedown', onWindowClick);
    };
  }, []);

  // add listener for keyup
  useEffect(() => {
    window.addEventListener('keyup', onEsc);
    return () => window.removeEventListener('keyup', onEsc);
  }, []);

  return (
    <div
      className={styles['dropdown-container']}
      data-testid='dropdown'
      ref={node}
      onClick={() => setVisible(!isVisible)}
    >
      <div data-testid='dropdown-placeholder'>{children}</div>
      {isVisible && (
        <div
          className={styles['dropdown-content']}
          data-testid='dropdown-content'
        >
          {content}
        </div>
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  position: 'right',
};

Dropdown.propTypes = propTypes;

export default Dropdown;
