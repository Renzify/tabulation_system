import ScoreTable from "../components/ScoreTable.jsx";

function HomePage() {
  return (
    <div className="flex flex-col h-screen justify-start items-center bg-gray-100 ">
      <h1 className="text-6xl font-bold my-15">Home Page</h1>
      <ScoreTable />
    </div>
  );
}

export default HomePage;
