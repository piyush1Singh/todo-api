import { useEffect, useRef, useState } from "react";
import "./App.css";
import { RxCrossCircled } from "react-icons/rx";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [fetchdata, setFetchdata] = useState();
  const [create, setCreate] = useState("");
  const [id, setId] = useState();
  const [value, setValue] = useState();

  const [edit, setEdit] = useState("");

  const ref = useRef();
  const hiddenref = useRef();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchApi = async () => {
    let url = "http://localhost:80/todo-api/fetchall.php";
    let data = await fetch(url);
    let jsonData = await data.json();

    setFetchdata(jsonData);
  };
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
    // console.log(data)
  };

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

  const editItem = (e) => {
    setEdit({ id: hiddenref.current.value, value: ref.current.value });
  };

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

  const createValue = (e) => {
    setCreate(e.target.value);
    // console.log(e.target.value)
  };

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
    setCreate(" ");
    fetchApi();
    // handleClose()
  };

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
