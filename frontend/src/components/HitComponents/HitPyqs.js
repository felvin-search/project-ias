import axios from "axios";
import React, { useEffect, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { toast } from "react-toastify";
import { USER_MAINS_URL } from "../../constants/constants";
import {
  findRevisionInterval,
  hasRevisedChecker,
} from "../../helpers/spacedRepetition";
import { isPremiumUser } from "../../helpers/subscription";

export default function HitPyqs(props) {
  const [solved, setSolved] = useState(false);
  const [revised, setRevised] = useState(false);

  var solvedDate = null;
  var userEmail = null,
    userMains = [],
    userMainsObj = [];
  var qNumber = "";
  var revisionCount = 0;

  try {
    userEmail = localStorage.getItem("userEmail");
    userMainsObj = JSON.parse(localStorage.getItem("userMains"));
    userMains = userMainsObj.map((item) => item.questionID);
  } catch {}

  try {
    const tempRevisionCount =
      userMainsObj[userMains.findIndex((id) => id === props.hit["id"])]
        .hasRevised;
    if (tempRevisionCount === false) revisionCount = 0;
    //solving the problem that initially revisionCount is saved as false in database instead of 0.
    else revisionCount = tempRevisionCount;
    solvedDate =
      userMainsObj[
        userMains.findIndex((id) => id === props.hit["id"])
      ].date.split("-");
  } catch {
    //question not solved. set default value.
    solvedDate = null;
    revisionCount = 0;
  }

  useEffect(() => {
    setSolved(
      userMains !== undefined &&
        userMains !== null &&
        userMains.includes(props.hit["id"])
    );

    setRevised(hasRevisedChecker(solvedDate, revisionCount));
  }, [props]);

  var pyqCardClass = "";
  if (solved) pyqCardClass = "card-solved";
  if (!revised) pyqCardClass = "card-revise";

  var topicArr = [];
  try {
    const length = props.hit["topics"].length;
    for (var i = 0; i < length; i++) {
      if (props.hit["topics"][i].mainTopic) {
        topicArr.push(
          props.hit["topics"][i].mainTopic +
            "(" +
            props.hit["topics"][i].subTopics.join(",") +
            ")"
        );
      }
    }
    qNumber = props.hit["qnumber"] + ") ";
  } catch {}

  const completeCheckHandler = (solvedState, revisionCount) => {
    axios
      .post(USER_MAINS_URL, {
        userEmail: userEmail,
        questionID: props.hit["id"],
        isSolved: !solvedState,
        hasRevised: revisionCount,
      })
      .then((response) => {
        const userMains = response.data.mains;
        localStorage.setItem("userMains", JSON.stringify(userMains));
      })
      .catch((err) => console.log(err));
    setSolved(!solvedState);
  };

  const reviseCheckHandler = () => {
    var revisionCount = 0;
    const revisionInterval = findRevisionInterval(solvedDate);
    if (revisionInterval > 35) revisionCount = 4;
    else if (revisionInterval > 15) revisionCount = 3;
    else if (revisionInterval > 7) revisionCount = 2;
    else revisionCount = 1;

    completeCheckHandler(false, revisionCount);
    setRevised(true);
  };

  const revisionDiv = (
    <div className="pyqs-revised-div">
      <div className="pyqs-revised-text">{`You solved this ${findRevisionInterval(
        solvedDate
      )} days ago. Solve again to remember.`}</div>
      <div className="pyqs-solved-toggle">
        <label className="pyqs-solved-toggle-text">Solved Again ?</label>
        <input
          type="checkbox"
          className="pyqs-solved-toggle-check"
          onChange={() => reviseCheckHandler()}
          checked={revised}
        ></input>
      </div>
    </div>
  );

  return (
    <div className={pyqCardClass}>
      {props.hit.topics === undefined ? (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          visible={true}
          style={{
            textAlign: "center",
          }}
        />
      ) : (
        <div>
          <strong>{qNumber}</strong>
          <Highlight attribute="question" hit={props.hit} />
          <p>
            <strong>Topics:</strong> {topicArr.join(";")}
          </p>
          <span>
            {" "}
            <strong>Exam Type:</strong> {props.hit["exam"]} {" ("}
            {props.hit["year"]}
            {")"}
          </span>
          <div
            className="pyqs-solved-toggle"
            onClick={() =>
              !isPremiumUser() &&
              toast.warn("You need to buy premium to use this feature.")
            }
          >
            <label className="pyqs-solved-toggle-text">Solved ?</label>
            <input
              type="checkbox"
              className="pyqs-solved-toggle-check"
              onChange={() => completeCheckHandler(solved, 0)}
              checked={solved}
              disabled={!isPremiumUser()}
            ></input>
          </div>
          {isPremiumUser() && !revised && revisionDiv}
        </div>
      )}
    </div>
  );
}
