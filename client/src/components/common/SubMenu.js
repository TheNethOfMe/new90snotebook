import React from "react";
import PropTypes from "prop-types";

export default function SubMenu({ notebookTabs, tabSelect, selected }) {
  return (
    <div className="submenu">
      {notebookTabs.map((tab, idx) => {
        const btnClass = `submenu__item-${idx}`;
        const selectedClass =
          selected === tab.link ? "submenu__item-select" : "submenu__item";
        return (
          <div
            className={btnClass}
            key={idx}
            onClick={() => tabSelect(tab.link)}
          >
            <h5 className={selectedClass}>{tab.title}</h5>
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
