import React, { useState } from "react";
import { Link } from "react-router-dom";
import EquipmentDataService from "../services/equipment";

const AddEquipment = (props) => {
  let initialEquipmentState = "";

  let editing = false;

  if (props.location.state && props.locations.state.currentEquipment) {
    editing = true;
    initialEquipmentState = props.locations.state.currentEquipment.text;
  }

  const [equipment, setEquipment] = useState(initialEquipmentState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setEquipment(event.target.value);
  };

  const saveEquipment = () => {
    var data = {
      name: equipment,
      user_name: props.user.name,
      user_id: props.user.id,
    };
  };

  if (editing) {
    data.review_id = props.location.state.currentEquipment._id;
    EquipmentDataService.updateEquipment(data)
      .then((res) => {
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    EquipmentDataService.createEquipment(data)
      .then((res) => {
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {props.user ? (
        <div>
          {submitted ? (
            <div>
              <h4>You submitted a new equipment!</h4>
              <Link to={"/equipment/"}>Back to equipment list</Link>
            </div>
          ) : (
            <div>
              <div>
                <label htmlFor="description">
                  {editing ? "Edit" : "Create"} Equipment
                </label>
                <input
                  type="text"
                  id="text"
                  required
                  value={equipment}
                  onChange={handleInputChange}
                  name="text"
                />
              </div>
              <button onClick={saveReview}>Submit</button>
            </div>
          )}
        </div>
      ) : (
        <div>Please Login</div>
      )}
    </div>
  );
};

export default AddEquipment;
