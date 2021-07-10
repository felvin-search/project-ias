import React, { useState } from "react";
import ReactHtmlParser from "react-html-parser";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Highlight } from "react-instantsearch-dom";

export default function HitPrelims(props) {
  const [mains, setMains] = useState({});
  const [selectedIds, setSelectedIds] = useState([]);

  const handleSolutionClick = (selectedId) => {
    if (selectedIds.indexOf(selectedId) === -1) {
      setSelectedIds((Ids) => [...Ids, selectedId]);
    } else {
      setSelectedIds((Ids) => Ids.filter((Id) => Id !== selectedId));
    }
  };

  let current_mains = mains;
  const Q = {};
  if (current_mains[props.hit.id] === undefined) {
    Q[props.hit.id] = {
      marked: "",
      answer: props.hit.answer,
    };

    current_mains = { ...current_mains, ...Q };
    setMains(current_mains);
    console.log(current_mains);
  }

  function markAns(ques_id, marked, answer) {
    const id = ques_id.toString();
    console.log("id is ", id);
    const changed = {};
    changed[id] = {
      marked: marked,
      answer: answer,
    };
    console.log("changed ", { ...mains, ...changed });
    setMains({ ...mains, ...changed });
  }

  return (
    <div>
      {props.hit.options === undefined ? (
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
        <>
          <Highlight attribute="question" hit={props.hit} />
          {/* {props.hit.question} */}
          <div className="options">
            Options:
            {props.hit?.options?.map((item) => {
              return (
                <div>
                  <input
                    type="radio"
                    value={item}
                    name={item}
                    onChange={(e) =>
                      markAns(props.hit.id, e.target.value, props.hit.answer)
                    }
                    checked={
                      mains[props.hit.id] !== undefined &&
                      item === mains[props.hit.id]["marked"]
                    }
                  />
                  <label for={item}>
                    {item}{" "}
                    {
                      // it should be defined and marked
                      mains[props.hit.id] !== undefined &&
                      mains[props.hit.id]["marked"] !== ""
                        ? item === mains[props.hit.id]["answer"]
                          ? "✔️"
                          : "❌"
                        : ""
                    }
                    {console.log(
                      "??",
                      mains[props.hit.id] &&
                        mains[props.hit.id]["marked"] ===
                          mains[props.hit.id]["answer"],
                      "for ",
                      props.hit.id
                    )}
                  </label>
                </div>
              );
            })}
          </div>

          <div
            className="solution"
            onClick={() => handleSolutionClick(props.hit.id)}
          >
            <span className="show">
              {selectedIds.includes(props.hit.id)
                ? "Hide Answer"
                : "Show Answer"}
            </span>
            {selectedIds.includes(props.hit.id) &&
              ReactHtmlParser(props.hit.explanation)}
          </div>
        </>
      )}
    </div>
  );
}
