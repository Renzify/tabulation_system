function RankingCard({ contestant, position }) {
  return (
    <div
      className={`flex justify-between items-center p-4 mb-3 rounded-xl ${
        position === 1 ? "bg-yellow-200 font-bold" : "bg-gray-50"
      }`}
    >
      <div>
        <span className="mr-4">#{position}</span>
        <span>{contestant.name}</span>
      </div>

      <span className="text-blue-600 font-semibold">{contestant.total}</span>
    </div>
  );
}

export default RankingCard;
