import { useEffect, useRef, useState } from "react";
import "./App.css";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //State For Fetch All Data
  const [fetchdata, setFetchdata] = useState();

  //State To Create New Data
  const [create, setCreate] = useState("");

  //State To Set Perticular id
  const [id, setId] = useState();

  //State To Set perticular Value
  const [value, setValue] = useState();

  //State for Edit 
  const [edit, setEdit] = useState("");

  // Ref to Get Previous Value
  const ref = useRef();
   // Ref to Get Previous Id
  const hiddenref = useRef();

  //Bootstrap Modal Show
  const [show, setShow] = useState(false);
//Bootstrap Modal Show
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // To Fetch All Api
  const fetchApi = async () => {
    let url = "http://localhost:80/todo-api/fetchall.php";
    let data = await fetch(url);
    let jsonData = await data.json();

    setFetchdata(jsonData);
  };


    //To Insert Value In Input
    const createValue = (e) => {
      setCreate(e.target.value);
      // console.log(e.target.value)
    };
  
  // Will save New Value In The data
    const saveInput = async () => {
      let url = await fetch("http://localhost:80/todo-api/Create.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tododesc: create,
        }),
      });
      setCreate("");
      fetchApi();
    };

  // To Call Delete Api And Delete id
  const deleteItem = async (id) => {
    // console.log(id)
    let url = await fetch("http://localhost:80/todo-api/delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await url.json();
    fetchApi();
  };


  // To Fetch Edit Api and set New Values in Them 
  const editPopModal = async (id) => {
    let url = await fetch("http://localhost:80/todo-api/fetchbyid.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const data = await url.json();
    setValue(data[0][1]);
    setId(data[0][0]);
    setEdit({ id: data[0][0], value: data[0][1] });
    // fetchApi()
    handleShow();
  };

  // In Edit Input insert New Value
  const editItem = (e) => {
    setEdit({ id: hiddenref.current.value, value: ref.current.value });
  };

  //Will Change The Previous Value And Replace With New Value
  const saveChanges = async () => {
    let url = await fetch("http://localhost:80/todo-api/update.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: edit["id"],
        tododesc: edit["value"],
      }),
    });
    fetchApi();
    handleClose();
  };


  //Will Run When Page Renders
  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <div className="main_div">
      <div className="center_div">
        <br />
        <h1>ToDo List</h1>
        <br />
        <input
          type="text"
          placeholder="Add a item"
          name="name"
          onChange={createValue}
          value={create}
        />
        <button className="button" onClick={() => saveInput()}>
          +
        </button>
        <ol>
          {fetchdata?.map((item, id) => (
            <div className="todo_style" key={id}>
              <RxCrossCircled
                className="cross"
                onClick={() => deleteItem(item[0])}
              />
              <li id={item[0]}>{item[1]} <br />
              {new Date(item[3]).toDateString()}
              </li>
              <MdOutlineModeEditOutline
                className="edit"
                onClick={() => editPopModal(item[0])}
              />
            </div>
          ))}
        </ol>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Notes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              ref={ref}
              value={edit["value"] || value}
              onChange={editItem}
              // name="name"
            />
            <input
              type="hidden"
              ref={hiddenref}
              value={edit["id"] || id}
              onChange={editItem}
              name="name"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={saveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
