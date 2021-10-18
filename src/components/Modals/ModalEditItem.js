import React, { useEffect, useState } from "react";
import { Form, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import Select from "react-select";
import { Creators as TodoActions } from "../../redux/TodoRedux";

function ModalEditItem({ show, handleClose, title, text, editedItem }) {
  const params = useParams().todoId;
  const dispatch = useDispatch();
  const resetState = () => dispatch(TodoActions.resetStateTodo());
  const updateItem = (data) => dispatch(TodoActions.updateItemRequest(data));
  const getActivityDetail = (data) =>
    dispatch(TodoActions.getActivityDetailRequest(data));

  const { isLoadingUpdateItem, errUpdateItem, dataUpdateItem } = useSelector(
    (state) => state.todo
  );

  const [itemName, setItemName] = useState("");
  const [priority, setPriority] = useState("very-high");
  const [selectState, setSelectState] = useState({});

  useEffect(() => {
    if (errUpdateItem !== null) {
      handleClose();
      resetState();
    } else if (dataUpdateItem && show) {
      getActivityDetail(params);
      handleClose();
      resetState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errUpdateItem, dataUpdateItem]);

  const options = [
    {
      value: "very-high",
      label: "Very High",
    },
    {
      value: "high",
      label: "High",
    },
    {
      value: "normal",
      label: "Normal",
    },
    {
      value: "low",
      label: "Low",
    },
    {
      value: "very-low",
      label: "Very Low",
    },
  ];

  useEffect(() => {
    if (editedItem) {
      setItemName(editedItem.title);
      setPriority(editedItem.priority);
      setSelectState(
        options.find((option) => option.value === editedItem.priority)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const formatOptionLabel = ({ value, label }) => (
    <div
      data-cy="modal-add-priority-item"
      className="d-flex align-items-center"
    >
      <div className={`label-indicator ${value}`}></div>
      <div>{label}</div>
    </div>
  );

  const submitAdd = () => {
    const data = {
      title: itemName,
      priority,
      is_active: editedItem.is_active,
    };
    updateItem({ data, id: editedItem.id });
  };

  const handleChangeSelect = (e) => {
    setSelectState(e);
    setPriority(e.value);
  };

  const DropdownIndicator = () => {
    return (
      <div
        data-cy="modal-add-priority-dropdown"
        className="icon-dropdown mr-2"
      ></div>
    );
  };

  return (
    <div data-cy="modal-add">
      <Modal
        show={show}
        onHide={handleClose}
        className="modal-add-activity"
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter" className="pt-4">
            <h4 className="font-weight-bold" data-cy="modal-add-title">
              Tambah List Item
            </h4>
            <div
              className="icon-close"
              onClick={handleClose}
              data-cy="modal-add-close-button"
            ></div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <label data-cy="modal-add-name-title">NAMA LIST ITEM</label>
            <div data-cy="modal-add-name-input">
              <Form.Control
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Tambahkan nama Activity"
                id="AddFormTitle"
              />
            </div>
            <label data-cy="modal-add-priority-title">PRIORITY</label>
            <br />
            <Select
              defaultValue={options[0]}
              formatOptionLabel={formatOptionLabel}
              options={options}
              className="select-priority"
              onChange={(e) => setPriority(e.value)}
              id="AddFormPriority"
              onMouseOver={() => console.log("lagi di atas awan")}
              components={{ DropdownIndicator }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="pb-4">
          <button
            className="btn btn-primary"
            onClick={submitAdd}
            disabled={itemName === ""}
            id="AddFormSubmit"
            data-cy="modal-add-save-button"
          >
            {isLoadingUpdateItem ? (
              <Spinner
                as="span"
                animation="border"
                size="md"
                role="status"
                aria-hidden="true"
              />
            ) : (
              "Simpan"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalEditItem;
