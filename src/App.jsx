import "./App.css";
import Virtualisation from "./Virtualisation";

function App() {
  const LIST = Array.from({length:10_000},(_,index)=> index + 1)

  return (
    <>
      <Virtualisation height={350} list={LIST} width={450} itemHeight={20} />
    </>
  );
}

export default App;
