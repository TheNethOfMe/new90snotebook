import React from "react";
import PropTypes from "prop-types";

export default function SubMenu({ notebookTabs, tabSelect, selected }) {
  return (
    <div>
      {notebookTabs.map(tab => {
        return (
          <div key={tab.title} onClick={() => tabSelect(tab.link)}>
            <h5>
              {selected === tab.link && <span>* </span>}
              {tab.title}
            </h5>
          </div>
        );
      })}
    </div>
  );
}

SubMenu.propTypes = {
  notebookTabs: PropTypes.array.isRequired,
  tabSelect: PropTypes.func.isRequired
};
