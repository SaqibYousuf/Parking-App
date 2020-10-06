import React, { useEffect, useState } from "react";
import "./../main.scss";

function Options(props) {
  return props.areas.map((a, i) => {
    return (
    <option>{a}</option>);
  });
}
export default Options;
