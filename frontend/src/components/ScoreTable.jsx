import { useState } from "react";

function ScoreTable() {
  // Criteria array
  const criteria = [
    { id: 1, name: "Performance", weight: 0.4, max: 100 },
    { id: 2, name: "Creativity", weight: 0.3, max: 100 },
    { id: 3, name: "Stage Presence", weight: 0.3, max: 100 },
  ];

  // Contestant array
  const [contestants, setContestants] = useState([
    {
      id: "",
      name: "",
    },
  ]);

  const [newContestant, setNewContestant] = useState("");       // track contestant state

  // Score object
  const [scores, setScores] = useState({});                     

  // Handle score input
  const handleChange = (contestantId, criterionId, value, max) => {      // handle input score field change
    let numericValue = Number(value);                                    // change value from string to integer
    numericValue = Math.max(0, Math.min(numericValue, max));            // force the value to only be between 0 - 100

    setScores((prev) => ({          // return score object (contestant id, criterion id, value) 
      ...prev,
      [contestantId]: {
        ...prev[contestantId],
        [criterionId]: numericValue,
      },
    }));
  };

  // Compute weighted total
  const computeTotal = (contestantId) => {                // add all total scores function (parameter: contestant id)
    const contestantScores = scores[contestantId] || {};      //  store contestant total inside array

    return criteria                                       // loop through criteria array and add new values
      .reduce((total, criterion) => {                              
        const score = contestantScores[criterion.id] || 0;      // current value 
        return total + score * criterion.weight;
      }, 0)
      .toFixed(2);
  };

  // Add contestant
  const addContestant = () => {             // handle add contestant button
    if (!newContestant.trim()) return;      // check if returned contestant is empty

    const newEntry = {                      // create new contestant object
      id: Date.now(),
      name: newContestant.trim(),
    };

    setContestants((prev) => [newEntry, ...prev]);      // insert the new contestant object to the contestant array
    setNewContestant("");                               // clear input field
  };

  // Remove contestant
  const removeContestant = (id) => {      // handle x contestant button (parameter: contestant id)
    setContestants((prev) => prev.filter((c) => c.id !== id));    // filters the entire contestants array and remove contestant that matches the parameter

    // Remove scores 
    setScores((prev) => {                 
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Submit form
  const handleSubmit = async (e) => {     // handle form submit
    e.preventDefault();

    const formattedContestants = contestants.map((contestant) => {    // map through contestant array
      const contestantScores = scores[contestant.id] || {};       // access score inside score array using contestant id 

      const total = criteria.reduce((sum, criterion) => {         // loop through criteria array to add total value
        const score = contestantScores[criterion.id] || 0;        // store the current criteria score
        return sum + score * criterion.weight;                    // add previous criteria score to the current score
      }, 0);

      return {        // return contestant object (id, name, score, total)     
        id: contestant.id,
        name: contestant.name,
        scores: contestantScores,
        total: Number(total.toFixed(2)),
      };
    });

    const payload = {   // store contestant object and criteria array          
      criteria,
      contestants: formattedContestants,
    };

    try {
      // Post data to backend
      const response = await fetch("http://localhost:3000/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server response:", data);

      // Redirect to ranking page
      window.location.href = "/ranking";
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    // call handle submit function
    <form onSubmit={handleSubmit} className="flex justify-center items-center"> 
      <div className="w-[90vw] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Contestant Score Table</h2>

        {/* Add contestant section */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newContestant}
            onChange={(e) => setNewContestant(e.target.value)}
            placeholder="Enter contestant name"
            className="border rounded-lg p-2 flex-1"
          />
          <button
            type="button"
            onClick={addContestant}     // call add contestant function on click
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Score grid */}
        <div
          className="grid gap-4 items-center"
          style={{
            gridTemplateColumns: `200px repeat(${criteria.length}, 1fr) 120px`,    // set up grid columns depending on criteria array length
          }}
        >
          <div className="font-semibold">Contestant</div>

          {criteria.map((i) => (            // loop through criteria array to display column title for each criteria (score table)
            <div key={i.id} className="font-semibold text-center">    
              {i.name}
              <div className="text-xs text-gray-500">
                Max: {i.max} | {i.weight * 100}%
              </div>
            </div>
          ))}

          <div className="font-semibold text-center">Total</div>

          {contestants.map((contestant) => (      // loop through contestants array to display contestant column (score table)
            <div key={contestant.id} className="contents">
              {/* Contestant name field */}
              <div className="flex items-center justify-between">
                <span className="font-medium">{contestant.name}</span>
                <button
                  type="button"
                  onClick={() => removeContestant(contestant.id)}     // call remove contestant function on click
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>

              {criteria.map((i) => (              // loop through criteria array to display column input field for each criteria (score table)
                <input
                  key={`${contestant.id}-${i.id}`}
                  type="number"
                  min="0"
                  max={i.max}
                  className="border rounded-lg p-2 text-center"
                  onChange={(e) =>
                    handleChange(contestant.id, i.id, e.target.value, i.max)        // when typed call handle change function (pass: constentant id, criteria id, score input value, criteria max value)
                  }
                />
              ))}
              
              <div className="text-center font-semibold text-blue-600">  {/* total column */}  
                {computeTotal(contestant.id)}   {/* call compute total function and pass contestant id*/}                           
              </div>
            </div>
          ))} 
        </div>
        <div className="mt-6 text-right">                   
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl"
          >
            Submit Scores
          </button>
        </div>
      </div>
    </form>
  );
}

export default ScoreTable;
