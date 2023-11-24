import React, { useState, useEffect, useRef } from "react";
import { apiCall } from "../Services/ApiCall";
import { stockLevelUrl } from "../Services/BaseUrl";
import { stockmoveUrl } from "../Services/BaseUrl";
import { stockmovecreUrl } from "../Services/BaseUrl";
import { productsUrl } from "../Services/BaseUrl";
import { warehouseUrl } from "../Services/BaseUrl";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import format from "date-fns/format";
import { useNavigate } from "react-router-dom";
import { ShowToast } from "../utils/Toast";

function Stockmovements() {
  const [getstockmove, setgetStockmove] = useState([]);

  let slNoCounter = 1;

  const navigate = useNavigate();

  const [data, setData] = useState({
    toWarehouse: "",
    reason: "",
  });

  const [productlist, setProductList] = useState({
    product: "",
    quantity: "",
  });

  const [store, setStore] = useState([]);

  const [damageproduct, setDamageProduct] = useState([]);

  const [pagination, setpagination] = useState({
    is_next: false,
    is_prev: false,
    totalDocs: 0,
  });

  const [params, setparams] = useState({
    page: 1,
    limit: 10,
    query: "",
    reason: "",
  });

  const [show, setShow] = useState(false);

  const [product, setProduct] = useState([]);

  const [warehouse, setWarehouse] = useState([]);

  //get move data
  const getStockMove = async () => {
    try {
      const response = await apiCall(
        "get",
        stockmoveUrl,
        {},
        {
          ...params,
          reason: data.reason,
        }
      );
      console.log("Response:", response);
      if (response.status === true) {
        setgetStockmove(response?.data?.movements);
        setpagination({
          is_next: response.data.is_next,
          is_prev: response.data.is_prev,
          totalDocs: response.data.totalDocs,
        });
      } else {
        console.log("failed to get data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //create move data
  const moveMent = async () => {
    console.log("posting ");
    let productdata = data;
    if (store.length) {
      productdata.products = store;
    }
    const selectedProduct = productlist.product;
    const quantity = productlist.quantity;
    const createResponse = await apiCall("post", stockmovecreUrl, productdata);
    if (createResponse) {
      setProductList({ product: "", quantity: "" });
      setData({ toWarehouse: "", reason: "" });
      setShow(false);
      setStore([]);
      await getStockMove();
    }
  };

  //get product warehuse data
  const getPopupdata = async () => {
    const productTypeResponse = await apiCall("get", productsUrl);
    const productList = productTypeResponse?.data?.docs ?? [];
    const modifiedproductList = productList.map(({ _id, name, stock }) => ({
      value: _id,
      label: name,
      totalstocks: stock,
    }));

    setProduct(modifiedproductList);

    const warehouseResponse = await apiCall("get", warehouseUrl);
    const warehousesList = warehouseResponse?.data?.docs ?? [];
    const modifiedwareHousesList = warehousesList.map(({ _id, name }) => ({
      value: _id,
      label: name,
    }));
    setWarehouse(modifiedwareHousesList);
  };

  //to api call in stock level
  const getStockList = async (id) => {
    var list = [];

    try {
      const response = await apiCall("get", `${stockLevelUrl}/${id}`, {});
      if (response.status) {
        let res = response.data.docs;
        list.push(...res);
        let array = list.map((product) => ({
          label: product?.product?.name,
          value: product?.product?._id,
          totalstocks: product?.product?.stock,
        }));

        setDamageProduct(array);
        setProduct(array);

        // setgetProduct(response.data.movements);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addFunction = () => {
    console.log("adding");
    const selectedProduct = productlist.product;
    const quantity = productlist.quantity;

    const selectedProductData = product.find(
      (product) => product.value === selectedProduct
    );

    if (selectedProductData) {
      if (data.reason === "damage") {
        setDamageProduct([
          ...damageproduct,
          { value: selectedProduct, quantity },
        ]);

        setWarehouse((prevWarehouses) => {
          const updatedWarehouses = prevWarehouses.map((warehouse) => {
            if (warehouse.value === data.toWarehouse) {
              return {
                ...warehouse,
                totalstocks: warehouse.totalstocks - quantity,
              };
            }

            return warehouse;
          });

          return updatedWarehouses;
        });
      } else {
        setStore([...store, { product: selectedProduct, quantity }]);
      }

      setProductList({ product: null, quantity: null });
    } else {
      ShowToast("Selected product not found.");
    }
  };

  const staticOptions = [
    { value: "transfer", label: "transfer" },
    { value: "damage", label: "damage" },
  ];

  const resetForm = () => {
    setData({ ...data, reason: "" });
    setparams({ ...params, reason: "" });
  };
  const resetButtonRef = useRef(null);
  useEffect(() => {
    getStockMove();
    getPopupdata();
  }, [params]);

  useEffect(() => {
    if (data.toWarehouse) {
      if (data.reason === "damage") {
        getStockList(data.toWarehouse);
        resetButtonRef.current.click();
      } else if (data.reason === "transfer") {
        getPopupdata();
      }
    }
  }, [data.toWarehouse, data.reason]);

  return (
    <div>
      <div className="col-xl-12">
        <div className="card dz-card" id="bootstrap-table11">
          <div className="card-header flex-wrap d-flex justify-content-between">
            <div>
              <h4 className="card-title">Stock Movement Table</h4>
            </div>
            <div
              className="nav nav-tabs dzm-tabs d-flex align-items-center"
              id="myTab-8"
              role="tablist"
              style={{ backgroundColor: "white" }}
            >
              <li className="nav-item me-1">
                <div className="input-group search-area">
                  <div className="row">
                    <Select
                      options={staticOptions}
                      onChange={(reason) => {
                        setData({
                          ...data,
                          reason: reason.value,
                        });
                        setparams({
                          ...params,
                          reason: reason.value,
                        });
                      }}
                    />
                  </div>
                  <div className="col ms-1">
                    <button
                      ref={resetButtonRef}
                      className="mx-1 btn btn-sm btn-primary form-control"
                      style={{
                        color: "white",
                        width: "58px",
                        height: "37px",
                        borderRadius: "3px",
                      }}
                      onClick={resetForm}
                    >
                      Reset
                    </button>
                  </div>
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
                        <th>From Warehouse</th>
                        <th>To Warehouse</th>
                        <th>Total stocks</th>
                        <th>MovedBy</th>
                        <th>Reason</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getstockmove?.map((movement, movementIndex) => (
                        <React.Fragment key={movementIndex}>
                          {movement.products.map((product, productIndex) => (
                            <tr key={productIndex}>
                              <td>{slNoCounter++}</td>
                              <td>
                                {movement.fromWarehouse
                                  ? movement.fromWarehouse.name
                                  : ""}
                              </td>
                              <td>
                                {movement.toWarehouse
                                  ? movement.toWarehouse.name
                                  : ""}
                              </td>
                              <td>{movement.totalStocks}</td>

                              <td>
                                {movement.movedBy ? movement.movedBy.name : ""}
                              </td>
                              <td>{movement?.reason}</td>
                              <td>
                                {new Date(
                                  movement.moveDate
                                ).toLocaleDateString()}
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
                                      onClick={() => {
                                        navigate(
                                          `/productlevel/${product._id}`,
                                          { state: { product } }
                                        );
                                      }}
                                    >
                                      View stocks
                                    </a>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end mx-4 mb-3">
            <button
              className="btn btn-sm btn-primary"
              disabled={!pagination.is_prev}
              onClick={() => setparams({ ...params, page: params.page - 1 })}
            >
              <i className="fa-solid fa-angle-left" />
            </button>
            <button
              className="btn btn-sm btn-primary mx-1"
              disabled={!pagination.is_next}
              onClick={() => setparams({ ...params, page: params.page + 1 })}
            >
              <i className="fa-solid fa-angle-right" />
            </button>
          </div>
        </div>
      </div>
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
                moveMent(e);
              }}
              className="parsley-examples"
            >
              {" "}
              <div className="mb-3">
                <label htmlFor="distributorname" className="form-label">
                  Reason<span className="text-danger">*</span>
                </label>
                <Select
                  required
                  options={staticOptions}
                  onChange={(reason) => {
                    setData({
                      ...data,
                      reason: reason.value,
                    });
                    console.log(reason.value, "resssss");
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="distributorname" className="form-label">
                  {data.reason !== "transfer" ? "Fromwarehouse" : "Towarehouse"}
                </label>
                <Select
                  options={warehouse}
                  onChange={(warehouse) => {
                    setData({
                      ...data,
                      toWarehouse: warehouse.value,
                    });

                    // getStockList(warehouse.value)
                  }}
                />
              </div>
              <div className="form-table border border-secondary p-3">
                <div className="sub-form">
                  <div className="" style={{ flex: 10, position: "fixed" }}>
                    <ul>
                      {store.map((item, index) => (
                        <li key={index}>
                          Product:{" "}
                          {
                            product.find(
                              (product) => product.value === item.product
                            ).label
                          }
                          , Quantity: {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="" style={{ marginLeft: "55%" }}>
                    <div className="mb-2">
                      <label htmlFor="distributorname" className="form-label">
                        Product<span className="text-danger">*</span>
                      </label>
                      <Select
                        required
                        options={product}
                        onChange={(selectedProduct) => {
                          setProductList({
                            ...productlist,
                            product: selectedProduct.value,
                          });
                        }}
                      />
                    </div>

                    <div className="mb-2">
                      <label htmlFor="mobileNumber" className="form-label">
                        Quantity<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        pattern="[0-9]{10}"
                        name="mob"
                        value={productlist.quantity ? productlist.quantity : ""}
                        onChange={(e) =>
                          setProductList({
                            ...productlist,
                            quantity: e.target.value,
                          })
                        }
                        placeholder="Enter Quantity"
                        className="form-control"
                        id="mobileNumber"
                      />
                    </div>
                  </div>
                  <button
                    className="addbutton btn btn-lg btn-success"
                    style={{ padding: "3px 5px", marginLeft: "90%" }}
                    onClick={addFunction}
                    type="button"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="text-end mb-3">
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
    </div>
  );
}

export default Stockmovements;
