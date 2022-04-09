import React, { useEffect, useState } from "react";
import "./Todo.css";
import todo from "../../Assets/to-do-list-svgrepo-com.svg";


const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [itemList, setItemList] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const addItem = () => {
    if (!inputData) {
      alert("Please Add Items");
    } else if (inputData && !toggle) {
      setItemList(
        itemList.map((curr) => {
          if (curr.id === isEdit) {
            return { ...curr, name: inputData };
          }
          return curr;
        })
      );
      setToggle(true);
      setInputData("");
      setIsEdit(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItemList([...itemList, allInputData]);
      setInputData("");
    }
  };

  const deleteItem = (index) => {
    const updateItem = itemList.filter((elem) => {
      return elem.id !== index;
    });
    setItemList(updateItem);
  };

  const editItem = (id) => {
    const newEditItem = itemList.find((elem) => {
      return elem.id === id;
    });
    setToggle(false);
    setInputData(newEditItem.name);
    setIsEdit(id);
  };

  const removeAll = () => {
    setItemList([]);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(itemList));
  }, [itemList]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggle ? (
              <i
                className="fa fa-plus add-btn"
                title="Add Item"
                onClick={addItem}
              ></i>
            ) : (
              <i
                className="fa fa-edit add-btn"
                title="Update Item"
                onClick={addItem}
              ></i>
            )}
          </div>
          <div className="showItems">
            {itemList.map((elem, ind) => {
              const { id, name } = elem;
              return (
                <div className="eachItem" key={id}>
                  <h3>{name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      title="Edit Item"
                      onClick={() => editItem(id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      title="Delete Item"
                      onClick={() => deleteItem(id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button className="btn effect04" onClick={removeAll}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
