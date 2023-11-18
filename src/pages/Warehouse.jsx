import React, { useState, useEffect } from "react";
import { apiCall } from "../Services/ApiCall";
import { warehouseUrl } from "../Services/BaseUrl";
import { warehousecreUrl } from "../Services/BaseUrl";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function Warehouse() {
  const navigate = useNavigate();
  const [gethouse, setgetHouse] = useState([]);

  const [data, setData] = useState({
    name: "",
    address: "",
    stockCount: "",
    role: "",
    active: "",
    user_id: "",
  });

  const [pagination, setpagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    totalDocs: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 5,
    query: "",
  });

  const [show, setShow] = useState(false);

  const [edit, setEdit] = useState(null);

  const [remove, setRemove] = useState({
    show: false,
    id: null,
  });
  const handleCloses = () => {
    setRemove({ show: false, id: null });
    setShow(false);
  };

  //get product data
  const getWareHouse = async () => {
    try {
      const response = await apiCall("get", warehouseUrl, {}, params);
      console.log(response,"response")

      if (response.status === true) {
        setgetHouse(response.data.docs);
        setpagination({
          hasNextPage: response.data.hasNextPage,
          hasPreviousPage: response.data.hasPreviousPage,
          totalDocs: response.data.totalDocs,
        });
      } else {
        console.log("failed to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //------create & edit location-------
  const warehouseList = async (e, id) => {
    try {
      if (id) {
        const updateResponse = await apiCall(
          "put",
          `${warehouseUrl}/${id}`,
          data
        );
        if (updateResponse) {
          setShow(false);
          await getWareHouse();
        }
      } else {
        const createResponse = await apiCall("post", warehousecreUrl, data);
        if (createResponse) {
          setShow(false);
          await getWareHouse();
        }
      }
      setData({
        name: "",
        address: "",
        stockCount: "",
        role: "",
        active: "",
        user_id: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  /// delete location list
  const deleteWarehouse = async (id) => {
    try {
      const response = await apiCall("delete", `${warehouseUrl}/${remove.id}`);
      if (response) {
        await getWareHouse();
        setRemove({ show: false, id: null });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editedItem = (item) => {
    setEdit(item._id);

    setData({
      name: item.name,
      address: item.address,
      stockCount: item.stockCount,
      active: item.active,
      user_id: item.user_id,
    });
    setShow(true);
  };

  useEffect(() => {
    getWareHouse();
    if (!show) {
      setEdit(null); 
      setData({
        name: "",
        address: "",
        stockCount: "",
        role: "",
        active: "",
        user_id: "",
      });
    }
  }, [params, show]);

  return (
    <div>
      <div className="col-xl-12">
        <div className="card dz-card" id="bootstrap-table11">
          <div className="card-header flex-wrap d-flex justify-content-between">
            <div>
              <h4 className="card-title">Warehouse Table</h4>
            </div>
            <div
              className="nav nav-tabs dzm-tabs d-flex align-items-center"
              id="myTab-8"
              role="tablist"
              style={{ backgroundColor: "white" }}
            >
              <li className="nav-item me-1">
                <div className="input-group search-area">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here..."
                    value={params.query}
                    onChange={(e) =>
                      setparams({ ...params, query: e.target.value })
                    }
                  />

                  <span className="input-group-text">
                    <a href={undefined}>
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_450)">
                          <path
                            opacity="0.3"
                            d="M14.2929 16.7071C13.9024 16.3166 13.9024 15.6834 14.2929 15.2929C14.6834 14.9024 15.3166 14.9024 15.7071 15.2929L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L14.2929 16.7071Z"
                            fill="#452B90"
                          />
                          <path
                            d="M11 16C13.7614 16 16 13.7614 16 11C16 8.23859 13.7614 6.00002 11 6.00002C8.23858 6.00002 6 8.23859 6 11C6 13.7614 8.23858 16 11 16ZM11 18C7.13401 18 4 14.866 4 11C4 7.13402 7.13401 4.00002 11 4.00002C14.866 4.00002 18 7.13402 18 11C18 14.866 14.866 18 11 18Z"
                            fill="#452B90"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_450">
                            <rect width={24} height={24} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </span>
                </div>
              </li>

              <li className="nav-item ms-1">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShow(true);
                  }}
                  className="btn btn-sm btn-primary form-control"
                >
                  <i
                    className="fa fa-plus"
                    style={{ color: "white" }}
                    aria-hidden="true"
                  />
                </button>
              </li>
            </div>
          </div>
          <div className="tab-content" id="myTabContent-8">
            <div
              className="tab-pane fade show active"
              id="activebackground"
              role="tabpanel"
              aria-labelledby="home-tab-8"
            >
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table header-border table-responsive-sm">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gethouse?.length ? (
                        <>
                          {gethouse?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {params.page === 1
                                  ? index + 1
                                  : params.limit * (params.page - 1) +
                                    (index + 1)}
                              </td>
                              <td>{item?.name}</td>
                              <td>{item?.address}</td>

                              <td>
                                {item?.active === true && (
                                  <span
                                    class="badge rounded-pill bg-primary px-2"
                                    style={{ fontSize: "9px" }}
                                  >
                                    True
                                  </span>
                                )}

                                {item?.active === false && (
                                  <span
                                    class="badge rounded-pill bg-success px-2 mx-1"
                                    style={{ fontSize: "9px" }}
                                  >
                                    False
                                  </span>
                                )}
                              </td>

                              <td>
                                <div className="dropdown">
                                  <button
                                    type="button"
                                    className="btn btn-light sharp"
                                    data-bs-toggle="dropdown"
                                  >
                                    <svg
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 24 24"
                                      version="1.1"
                                    >
                                      <g
                                        stroke="none"
                                        strokeWidth={1}
                                        fill="none"
                                        fillRule="evenodd"
                                      >
                                        <rect
                                          x={0}
                                          y={0}
                                          width={24}
                                          height={24}
                                        />
                                        <circle
                                          fill="#000000"
                                          cx={5}
                                          cy={12}
                                          r={2}
                                        />
                                        <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={12}
                                          r={2}
                                        />
                                        <circle
                                          fill="#000000"
                                          cx={19}
                                          cy={12}
                                          r={2}
                                        />
                                      </g>
                                    </svg>
                                  </button>
                                  <div className="dropdown-menu">
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        editedItem(item);
                                      }}
                                    >
                                      Edit
                                    </a>
                                    <a
                                      className="dropdown-item  text-danger"
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setRemove({
                                          ...remove,
                                          show: true,
                                          id: item._id,
                                        });
                                      }}
                                    >
                                      Delete
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      href="#"
                                      onClick={() =>
                                        navigate(`/stocklevel/${item._id}`)
                                      }
                                    >
                                      View stocks
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={7} style={{ textAlign: "center" }}>
                            <b> No Data Found </b>{" "}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mx-4 mb-3">
            <button
              className="btn btn-sm btn-primary"
              disabled={!pagination.hasPreviousPage}
              onClick={() => setparams({ ...params, page: params.page - 1 })}
            >
              <i className="fa-solid fa-angle-left" />
            </button>

            <button
              className="btn btn-sm btn-primary mx-1"
              disabled={!pagination.hasNextPage}
              onClick={() => setparams({ ...params, page: params.page + 1 })}
            >
              <i className="fa-solid fa-angle-right" />
            </button>
          </div>
        </div>
      </div>

      {/*modal start */}
      <Modal show={show} onHide={() => setShow(false)}>
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setShow(false)}
            />
          </div>
          <div className="modal-body">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                warehouseList(e, edit);
              }}
              className="parsley-examples"
            >
              <div className="mb-3">
                <label htmlFor="distributorname" className="form-label">
                  Name<span className="text-danger">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="nick"
                  value={data.name ? data.name : ""}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  placeholder="Enter Name"
                  className="form-control"
                  id="distributorname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Address<span className="text-danger">*</span>
                </label>
                <input
                  required
                  type="text"
                  name="address"
                  value={data.address ? data.address : ""}
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                  placeholder="Enter Address"
                  className="form-control"
                
                />
              </div>

              <div className="mb-3">
                <label htmlFor="distributorname" className="form-label">
                  Action <span className="text-danger">*</span>
                </label>
                <label>
                  <input
                  required
                    className="mx-2"
                    type="radio"
                    name="action"
                    checked={data.active === "true"}
                    onChange={() => setData({ ...data, active: "true" })}
                  />
                  True
                </label>

                <label>
                  <input
                    className="mx-2"
                    type="radio"
                    name="action"
                    checked={data.active === "false"}
                    onChange={() => setData({ ...data, active: "false" })}
                  />
                  False
                </label>
              </div>

              <div className="text-end">
                <button
                  type="reset"
                  className="btn btn-danger waves-effect"
                  style={{ marginRight: "10px" }}
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success waves-effect waves-light"
                  type="submit"
                >
                  {data ? data._id ? <>update</> : <>submit</> : <>submit</>}
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
      {/*Delete data in home */}
      <Modal show={remove.show}>
        <Modal.Body>
          <p>Are you sure to delete </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloses}>
            No
          </Button>
          <Button variant="danger" onClick={deleteWarehouse}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Warehouse;
