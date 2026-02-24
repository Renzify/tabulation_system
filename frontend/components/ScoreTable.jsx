import { useState } from "react";

function ScoreTable() {
  const criteria = [
    { id: 1, name: "Performance", weight: 0.4, max: 100 },
    { id: 2, name: "Creativity", weight: 0.3, max: 100 },
    { id: 3, name: "Stage Presence", weight: 0.3, max: 100 },
  ];

  const contestants = [
    { id: 1, name: "Anna" },
    { id: 2, name: "Maria" },
    { id: 3, name: "Chloe" },
  ];

  const [scores, setScores] = useState({});

  const handleChange = (contestantId, criterionId, value) => {
    const numericValue = Number(value);

    setScores((prev) => ({
      ...prev,
      [contestantId]: {
        ...prev[contestantId],
        [criterionId]: numericValue,
      },
    }));
  };

  const computeTotal = (contestantId) => {
    const contestantScores = scores[contestantId] || {};
    return criteria
      .reduce((total, criterion) => {
        const score = contestantScores[criterion.id] || 0;
        return total + score * criterion.weight;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-[90vw] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Contestant Score Table</h2>

        {/* GRID CONTAINER */}
        <div
          className="grid gap-4 items-center"
          style={{
            gridTemplateColumns: `150px repeat(${criteria.length}, 1fr) 120px`,
          }}
        >
          {/* HEADER ROW */}
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

          {/* DATA ROWS */}
          {contestants.map((contestant) => (
            <>
              <div key={contestant.id} className="font-medium">
                {contestant.name}
              </div>

              {criteria.map((c) => (
                <input
                  key={`${contestant.id}-${c.id}`}
                  type="number"
                  min="0"
                  max={c.max}
                  className="border rounded-lg p-2 text-center focus:ring-2 focus:ring-blue-500"
                  onChange={(e) =>
                    handleChange(contestant.id, c.id, e.target.value)
                  }
                />
              ))}

              <div className="text-center font-semibold text-blue-600">
                {computeTotal(contestant.id)}
              </div>
            </>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl">
            Submit Scores
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreTable;
