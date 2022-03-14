// import React, { useState, useEffect } from "react";
// import Widget from "../../../../components/Widget/Widget";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, Form, Button } from "react-bootstrap";

// const AddDomain = () => {
//   const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const [domainsData, setDomainsData] = useState([]);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");

//   const handleAddDomain = async (e) => {
//     e.preventDefault();
//     const domain = { name, description };

//     await fetch("https://prepexpert.herokuapp.com/create_domain", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("userToken"),
//       },

//       body: JSON.stringify(domain),
//     }).then(() => {
//       console.log("New Domain Added" + domain);
//       handleClose();
//       fetchDomainsData();
//     });
//   };

//   const handleUpdateDomain = async (e) => {
//     e.preventDefault();
//     const domain = { name, description };

//     await fetch("https://prepexpert.herokuapp.com/create_domain", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("userToken"),
//       },

//       body: JSON.stringify(domain),
//     }).then(() => {
//       console.log("New Domain Added" + domain);
//       handleClose();
//       fetchDomainsData();
//     });
//   };

//   const handleDeleteDomain = async (e) => {
//     e.preventDefault();

//     const domainId = e.target.id.toString();
//     console.log(domainId);

//     await fetch("https://prepexpert.herokuapp.com/delete_domain/" + domainId, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("userToken"),
//       },
//     }).then(() => {
//       console.log("Domain deleted: " + domainId);
//       fetchDomainsData();
//     });
//   };

//   //Getting form values
//   // const handleChange = (input) => (e) => {
//   //   e.preventDefault()
//   //   console.log(addDomain)
//   //   setAddDomain({...addDomain, [input]: e.target.value})
//   // }

//   // //Adding Data to the Table
//   // const handleAddDomain = (e) => {
//   //   e.preventDefault()

//   //   const newDomain = {
//   //     // domainId: addDomain.domainId,
//   //     name: addDomain.name,
//   //     description: addDomain.description
//   //   }

//   //   const newDomains = {...domainsData, newDomain}
//   //   setDomainsData(newDomains)
//   // }

//   const fetchDomainsData = async () => {
//     const requestOptions = {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + localStorage.getItem("userToken"),
//       },
//     };

//     const response = await fetch(
//       "https://prepexpert.herokuapp.com/get_all_domains",
//       requestOptions
//     );
//     const data = await response.json();

//     if (!response.ok) {
//       // setSubjectsData(null);
//     } else {
//       setDomainsData(data);
//     }
//   };

//   useEffect(() => {
//     fetchDomainsData();
//   }, [domainsData.lastItem]);
//   // console.log(domainsData);

//   return (
//     <div>
//       <Widget>
//         <Button
//           className="nextButton"
//           variant="primary"
//           onClick={handleShow}
//           style={{ float: "right", margin: "10px" }}
//         >
//           Add Domain +
//         </Button>{" "}
//         <table className="table table-bordered border-primary table responsible">
//           <thead>
//             <tr>
//               <th>Domain ID</th>
//               <th>Domain Name</th>
//               <th>Domain Description</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {domainsData.map((domain) => (
//               <tr key={domain.id}>
//                 <td>{domain.id}</td>
//                 <td>{domain.name}</td>
//                 <td>{domain.description}</td>
//                 <td>
//                   <Button id={domain.id} onClick={handleDeleteDomain}>
//                     Edit
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {/* <div className="modal" id="addModalForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="exampleModalLabel">Add New Post</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>

//                   </div>
//                   <div className="modal-body">
//                     <form>
//                       <div className="mb-3">
//                         <label className="form-label">User ID</label>
//                         <input type="text" className="form-control" name="userId" placeholder="userId" required disabled></input>
//                       </div>
//                       <div className="mb-3">
//                         <label className="form-label">Title</label>
//                         <input type="text" className="form-control" name="title" placeholder="title" required disabled></input>
//                       </div>
//                       <div className="mb-3">
//                         <label className="form-label">Body</label>
//                         <textarea rows="4" cols="50" className="form-control" name="body" placeholder="body" required>
//                         </textarea>
//                       </div>
//                       <div className="modal-footer d-block">
//                         <button type="submit" data-bs-dismiss="modal" className="btn btn-warning float-end">Submit</button>
                         
//                       </div>
//                     </form>

//                   </div>
//                 </div>

//               </div>


          
//         </div>  */}
//         <Form name="AddDomainForm">
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Add Domain</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form.Group className="mb-3" controlId="formBasicText">
//                 <Form.Label>Domain Name:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="e.g. Computer Science"
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Domain Description:</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   placeholder="e.g. Description of Computer Science"
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleAddDomain}>
//                 Add Domain
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </Form>

//         <Form name="AddDomainForm">
//           <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//               <Modal.Title>Add Domain</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//               <Form.Group className="mb-3" controlId="formBasicText">
//                 <Form.Label>Domain Name:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="e.g. Computer Science"
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                 />
//               </Form.Group>

//               <Form.Group>
//                 <Form.Label>Domain Description:</Form.Label>
//                 <Form.Control
//                   as="textarea"
//                   rows={3}
//                   placeholder="e.g. Description of Computer Science"
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </Form.Group>
//             </Modal.Body>
//             <Modal.Footer>
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button variant="primary" onClick={handleAddDomain}>
//                 Add Domain
//               </Button>
//             </Modal.Footer>
//           </Modal>
//         </Form>
//       </Widget>
//     </div>
//   );
// };

// export default DomainTable;
