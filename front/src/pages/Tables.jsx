import Header from "../components/Header";
import Table from "../components/tables/Table";
import Base from "../utils/base";

const Tables = () => {
  const { tables, setTables } = Base();

  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <div className="main_items tables_">
            {tables.map((item) => (
              <Table
                id={item?.id}
                num={item?.number}
                is_occupied={item?.is_occupied}
                seats={item?.seats}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Tables;
