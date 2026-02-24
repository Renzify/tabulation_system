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
    { id: 1, name: "Juan Dela Cruz" },
  ]);

  const [newContestant, setNewContestant] = useState("");
  const [scores, setScores] = useState({});

  // Handle score input
  const handleChange = (contestantId, criterionId, value, max) => {
    let numericValue = Number(value);
    numericValue = Math.max(0, Math.min(numericValue, max));

    setScores((prev) => ({
      ...prev,
      [contestantId]: {
        ...prev[contestantId],
        [criterionId]: numericValue,
      },
    }));
  };

  // Compute weighted total
  const computeTotal = (contestantId) => {
    const contestantScores = scores[contestantId] || {};

    return criteria
      .reduce((total, criterion) => {
        const score = contestantScores[criterion.id] || 0;
        return total + score * criterion.weight;
      }, 0)
      .toFixed(2);
  };

  // Add contestant
  const addContestant = () => {
    if (!newContestant.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newContestant.trim(),
    };

    setContestants((prev) => [newEntry, ...prev]);
    setNewContestant("");
  };

  // Remove contestant
  const removeContestant = (id) => {
    setContestants((prev) => prev.filter((c) => c.id !== id));

    // Remove scores too
    setScores((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedContestants = contestants.map((contestant) => {
      const contestantScores = scores[contestant.id] || {};

      const total = criteria.reduce((sum, criterion) => {
        const score = contestantScores[criterion.id] || 0;
        return sum + score * criterion.weight;
      }, 0);

      return {
        id: contestant.id,
        name: contestant.name,
        scores: contestantScores,
        total: Number(total.toFixed(2)),
      };
    });

    const payload = {
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
            onClick={addContestant}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Add
          </button>
        </div>

        {/* Score grid */}
        <div
          className="grid gap-4 items-center"
          style={{
            gridTemplateColumns: `200px repeat(${criteria.length}, 1fr) 120px`,
          }}
        >
          <div className="font-semibold">Contestant</div>

          {criteria.map((c) => (
            <div key={c.id} className="font-semibold text-center">
              {c.name}
              <div className="text-xs text-gray-500">
                Max: {c.max} | {c.weight * 100}%
              </div>
            </div>
          ))}

          <div className="font-semibold text-center">Total</div>

          {contestants.map((contestant) => (
            <div key={contestant.id} className="contents">
              {/* Contestant name field */}
              <div className="flex items-center justify-between">
                <span className="font-medium">{contestant.name}</span>
                <button
                  type="button"
                  onClick={() => removeContestant(contestant.id)}
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>

              {criteria.map((c) => (
                <input
                  key={`${contestant.id}-${c.id}`}
                  type="number"
                  min="0"
                  max={c.max}
                  className="border rounded-lg p-2 text-center"
                  onChange={(e) =>
                    handleChange(contestant.id, c.id, e.target.value, c.max)
                  }
                />
              ))}

              <div className="text-center font-semibold text-blue-600">
                {computeTotal(contestant.id)}
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
