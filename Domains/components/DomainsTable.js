import React, { useState, useEffect } from "react";
import Widget from "../../../../components/Widget/Widget";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";

const DomainTable = () => {
  // list all domains
  const [domainsData, setDomainsData] = useState([]);

  // add domain
  const [showAddModal, setShowAddModal] = useState(false);
  const showAddDomainForm = () => setShowAddModal(true);
  const closeAddDomainForm = () => setShowAddModal(false);

  const [addDomainData, setAddDomainData] = useState({
    name: "",
    description: "",
  });

  // update domain
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const showUpdateDomainForm = (e) => {
    e.preventDefault();
    setShowUpdateModal(true);
    fetchDomainData(e);
  };
  const closeUpdateDomainForm = () => setShowUpdateModal(false);

  const [updateDomainData, setUpdateDomainData] = useState({
    id: "",
    name: "",
    description: "",
  });

  // api methods
  const fetchAllDomains = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    const response = await fetch(
      "https://prepexpert.herokuapp.com/get_all_domains",
      requestOptions
    );
    const data = await response.json();

    if (!response.ok) {
      // setSubjectsData(null);
    } else {
      setDomainsData(data);
    }
  };

  useEffect(() => {
    fetchAllDomains();
  }, [domainsData.lastItem]);

  const fetchDomainData = async (e) => {
    const domainId = e.target.id.toString();
    console.log(domainId);

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    };

    const response = await fetch(
      "https://prepexpert.herokuapp.com/get_domain/" + domainId,
      requestOptions
    );
    const data = await response.json();

    // wrap later inside response ok
    setUpdateDomainData(data);
    // if (!response.ok) {
    //   // setSubjectsData(null);
    // } else {
    //   setUpdateDomainData(data);
    // }
  };

  useEffect(() => {
    fetchAllDomains();
  }, [domainsData.lastItem]);

  const handleAddDomain = async (e) => {
    e.preventDefault();

    await fetch("https://prepexpert.herokuapp.com/create_domain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },

      body: JSON.stringify(addDomainData),
    }).then(() => {
      console.log("New Domain Added" + addDomainData);
      closeAddDomainForm();
      fetchAllDomains();
    });
  };

  const handleUpdateDomain = async (e) => {
    e.preventDefault();

    const domainId = e.target.id.toString();
    console.log(domainId);

    await fetch("https://prepexpert.herokuapp.com/update_domain/" + domainId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },

      body: JSON.stringify(updateDomainData),
    }).then(() => {
      console.log(updateDomainData)
      console.log("Domain Updated: " + updateDomainData);
      closeUpdateDomainForm();
      fetchAllDomains();
    });
  };

  const handleDeleteDomain = async (e) => {
    e.preventDefault();

    const domainId = e.target.id.toString();
    console.log(domainId);

    await fetch("https://prepexpert.herokuapp.com/delete_domain/" + domainId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("userToken"),
      },
    }).then(() => {
      console.log("Domain deleted: " + domainId);
      fetchAllDomains();
    });
  };

  // render
  return (
    <div>
      <Widget>
        <Button
          className="nextButton"
          variant="primary"
          onClick={showAddDomainForm}
          style={{ float: "right", margin: "10px" }}
        >
          Add Domain +
        </Button>{" "}
        <table className="table table-bordered border-primary table responsible">
          <thead>
            <tr>
              <th>Domain ID</th>
              <th>Domain Name</th>
              <th>Domain Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {domainsData.map((domain) => (
              <tr key={domain.id}>
                <td>{domain.id}</td>
                <td>{domain.name}</td>
                <td>{domain.description}</td>
                <td>
                  <Button id={domain.id} onClick={showUpdateDomainForm}>
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    id={domain.id}
                    variant="danger"
                    onClick={handleDeleteDomain}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Form name="AddDomainForm">
          <Modal show={showAddModal} onHide={closeAddDomainForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add Domain</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Domain Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Computer Science"
                  onChange={(e) => setAddDomainData({ name: e.target.value })}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Domain Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="e.g. Description of Computer Science"
                  onChange={(e) =>
                    setAddDomainData({ description: e.target.value })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid domain description.
                </Form.Control.Feedback>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeAddDomainForm}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleAddDomain}>
                Add Domain
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
        <Form name="UpdateDomainForm">
          <Modal show={showUpdateModal} onHide={closeUpdateDomainForm}>
            <Modal.Header closeButton>
              <Modal.Title>Update Domain</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Domain ID:</Form.Label>
                <Form.Control
                  type="text"
                  value={updateDomainData.id}
                  disabled
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Domain Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={updateDomainData.name}
                  onChange={(e) =>
                    setUpdateDomainData({ name: e.target.value })
                  }
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Domain Description:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={updateDomainData.description}
                  onChange={(e) =>
                    setUpdateDomainData({ description: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeUpdateDomainForm}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateDomain}>
                Update Domain
              </Button>
            </Modal.Footer>
          </Modal>
        </Form>
      </Widget>
    </div>
  );
};

export default DomainTable;
