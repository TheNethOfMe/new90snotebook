import React from "react";
import PropTypes from "prop-types";

export default function SubMenu(noteBookTabs, tabSelect) {
  return (
    <div>
      {noteBookTabs.map(tab => {
        return (
          <div
            key={tab.title}
            className="sub-menu-tab"
            onClick={tabSelect(tab.link)}
          >
            <h5>tab.title</h5>
          </div>
        );
      })}
    </div>
  );
}

SubMenu.propTypes = {
  noteBookTabs: PropTypes.array.isRequired,
  tabSelect: PropTypes.func.isRequired
};
