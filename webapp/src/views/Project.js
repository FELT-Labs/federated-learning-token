import React from "react";
import { useParams } from "react-router-dom";


function Project() {
  let { id } = useParams();

  return (
    <div>
      <h2>
        {id}
      </h2>
    </div>
  );
}

export default Project;