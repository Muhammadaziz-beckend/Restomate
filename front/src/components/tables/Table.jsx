import { NavLink } from "react-router-dom";
import "../../static/css/table.css";

const Table4 = ({ num = 0 }) => {
  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="100"
        y="70"
        width="100"
        height="60"
        fill="#D2B48C"
        stroke="#8B4513"
        stroke-width="2"
        rx="8"
      />

      <text
        x="150"
        y="105"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="24"
        fill="#333"
        font-family="Arial"
      >
        {num}
      </text>

      <rect x="120" y="30" width="20" height="30" fill="#ccc" stroke="#333" />
      <rect x="160" y="30" width="20" height="30" fill="#ccc" stroke="#333" />

      <rect x="120" y="140" width="20" height="30" fill="#ccc" stroke="#333" />
      <rect x="160" y="140" width="20" height="30" fill="#ccc" stroke="#333" />
    </svg>
  );
};

const Table6 = ({ num = 0 }) => {
  return (
    <svg
      width="300"
      height="200"
      viewBox="0 0 300 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="100"
        y="70"
        width="100"
        height="60"
        fill="#D2B48C"
        stroke="#8B4513"
        stroke-width="2"
        rx="8"
      />

      <text
        x="150"
        y="105"
        text-anchor="middle"
        dominant-baseline="middle"
        font-size="24"
        fill="#333"
        font-family="Arial"
      >
        {num}
      </text>

      <rect x="120" y="30" width="20" height="30" fill="#ccc" stroke="#333" />
      <rect x="160" y="30" width="20" height="30" fill="#ccc" stroke="#333" />

      <rect x="120" y="140" width="20" height="30" fill="#ccc" stroke="#333" />
      <rect x="160" y="140" width="20" height="30" fill="#ccc" stroke="#333" />

      <rect x="70" y="85" width="30" height="20" fill="#ccc" stroke="#333" />

      <rect x="200" y="85" width="30" height="20" fill="#ccc" stroke="#333" />
    </svg>
  );
};

const Table = ({ seats, is_occupied, num = 1 }) => {
  return (
    <NavLink to={`${num}/`} className="table">
      <div className={`table_item ${is_occupied ? "red" : "grey"}`}>
        {seats >= 6 ? <Table6 num={num} /> : <Table4 num={num} />}
      </div>
    </NavLink>
  );
};

export default Table;
