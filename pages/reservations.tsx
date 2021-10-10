import { FunctionComponent, useEffect, useState } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import NavBar from "../components/navbar";
import TabList from "../components/tabList";
import TabSwitcher from "../components/tabList/TabSwitcher";

interface IReservation {
  idx: number;
  id: string;
  name: string;
  image: string;
  text: string;
}

const Reservations: FunctionComponent = () => {
  const [reservations, setReservations] = useState<IReservation[]>([]);
  const [sortBy, setSortBy] = useState<string>("index");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
  const [selectedTabSwitcher, setSelectedTabSwitcher] =
    useState<string>("current");

  setSortBy;
  setSortDirection;

  useEffect(() => {
    const creation = Array(10000)
      .fill({})
      .map((val, idx) => {
        val;
        return {
          idx: idx,
          id: "qweqweqew",
          name: "John Doe",
          image: "http://via.placeholder.com/40",
          text: "okay",
        };
      });
    setReservations(creation);
  }, []);

  return (
    <div className="page">
      <NavBar />
      <div className="container">
        <TabList>
          <TabSwitcher
            title="Current Reservations"
            uniqueId="current"
            selected={selectedTabSwitcher}
            setSelected={(title) => setSelectedTabSwitcher(title)}
          />
          <TabSwitcher
            title="Other Tab"
            uniqueId="other1"
            selected={selectedTabSwitcher}
            setSelected={(title) => setSelectedTabSwitcher(title)}
          />
          <TabSwitcher
            title="Another Tab"
            uniqueId="another1"
            selected={selectedTabSwitcher}
            setSelected={(title) => setSelectedTabSwitcher(title)}
          />
          <TabSwitcher
            title="One More Tab"
            uniqueId="onemore1"
            selected={selectedTabSwitcher}
            setSelected={(title) => setSelectedTabSwitcher(title)}
          />
        </TabList>
        {selectedTabSwitcher === "current" ? (
          <div className="Test">
            <input className="filterInput" placeholder="Filters" />
            <AutoSizer>
              {({ height, width }) => (
                <Table
                  height={height}
                  width={width}
                  headerHeight={50}
                  headerClassName="headerClass"
                  rowHeight={50}
                  rowCount={reservations.length}
                  rowGetter={({ index }) => reservations[index]}
                  rowClassName="rowClass"
                  gridClassName="rowClass"
                  onRowClick={(info) => {
                    console.log(info.index);
                  }}
                  sortBy={sortBy}
                  sortDirection={sortDirection}
                  overscanRowCount={100}
                >
                  <Column label="Index" dataKey="idx" width={60} />
                  <Column label="Name" dataKey="name" width={100} />
                  <Column label="Name" dataKey="name" width={100} />
                </Table>
              )}
            </AutoSizer>
          </div>
        ) : (
          <></>
        )}
        {selectedTabSwitcher === "other1" ? (
          <div>
            <p>Other 1</p>
          </div>
        ) : (
          <></>
        )}
        {selectedTabSwitcher === "another1" ? (
          <div>
            <p>Another 1</p>
          </div>
        ) : (
          <></>
        )}
        {selectedTabSwitcher === "onemore1" ? (
          <div>
            <p>One more another tab another one</p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Reservations;
