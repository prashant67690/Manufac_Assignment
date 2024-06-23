import TableOne from "./Table/TableOne";
import TableTwo from "./Table/TableTwo";

function Home() {
  return (
    <>
      <div>
        <h1 style={{ margin: 20 }}>Table 1</h1>
        <TableOne />
      </div>
      <div>
        <h1 style={{ margin: 20 }}>Table 2</h1>
        <TableTwo />
      </div>
    </>
  );
}

export default Home;
