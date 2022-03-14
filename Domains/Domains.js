import React from "react";
import Widget from "../../../components/Widget/Widget";
import DomainsTable from "./components/DomainsTable";

class Domains extends React.Component {
  render() {
    return (
      <div>
        <Widget>
          <h4 className="p-4">Manage Domains </h4>
          <br />
          <DomainsTable />
        </Widget>
      </div>
    );
  }
}
export default Domains;
