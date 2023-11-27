import React, { useState, useEffect,useRef} from "react";
import { apiCall } from "../Services/ApiCall";
import { stockLevelUrl } from "../Services/BaseUrl";
import { stockmoveUrl } from "../Services/BaseUrl";
import { stockmovecreUrl } from "../Services/BaseUrl";
import { productsUrl } from "../Services/BaseUrl";
import { warehouseUrl } from "../Services/BaseUrl";
import { Form, Modal, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
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
    quantity: 0
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
    const selectedProduct = productlist.product;
    const quantity = productlist.quantity;

    const selectedProductData = product.find(
      (product) => product.value === selectedProduct
    );

    if (selectedProductData) {
      if (data.reason === "damage") {
        setStore([
          ...store,
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
    setProductList({
      product: "",
      quantity: "",
    });

    
  };

  const removeProduct = (index) => {
    // Remove the product at the specified index from the store array
    const updatedStore = [...store];
    updatedStore.splice(index, 1);
    setStore(updatedStore);
  };

  const resetForm = () => {
    setData({ ...data, reason: "" });
    setparams({ ...params, reason: "" });
  };

  const resetButtonRef = useRef(null);


  const staticOptions = [
    { value: "transfer", label: "transfer" },
    { value: "damage", label: "damage" },
  ];

  useEffect(() => {
    getStockMove();
    getPopupdata();
  }, [params]);

  useEffect(() => {
    if (data.toWarehouse) {
      if (data.reason === "damage") {
        getStockList(data.toWarehouse);
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
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              moveMent(e);
            }}
            className="parsley-examples"
          >
            <Form.Group className="mb-4">
              <Form.Label>
                Reason<span className="text-danger">*</span>
              </Form.Label>
              <Select
                required
                options={staticOptions}
                onChange={(reason) => {
                  setData({
                    ...data,
                    reason: reason.value,
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                {data.reason !== "transfer" ? "Fromwarehouse" : "Towarehouse"}
                <span className="text-danger">*</span>
              </Form.Label>
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
            </Form.Group>
            <div className="form-table-container border border-secondary p-3">
              <div className="sub-form">
                <Row>
                  <Col
                    sm={8}
                    style={{ maxHeight: "300px", overflowY: "scroll" }}
                  >
                    <ul>
                      {store.map((item, index) => (
                        <li
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          Product:{" "}
                          {
                            product.find(
                              (product) => product.value === item.product
                            )?.label
                          }
                          , Quantity: {item.quantity}
                          <button
                            className="btn btn-sm btn-danger mb-1"
                            style={{ marginLeft: "10px" }}
                            onClick={() => removeProduct(index)}
                          >
                            <i className="fa fa-times" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </Col>
                  <Col sm={4}>
                    <Form>
                      <Form.Group className="mb-2">
                        <Form.Label>
                          Product<span className="text-danger">*</span>
                        </Form.Label>
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
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>
                          Quantity<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          step="1"
                          type="number"
                          name="mob"
                          value={
                            productlist.quantity >= 0
                              ? productlist.quantity
                              : ""
                          }
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value) && value >= 0) {
                              setProductList({
                                ...productlist,
                                quantity: value,
                              });
                            }
                          }}
                          placeholder="Enter Quantity"
                          required
                        />
                      </Form.Group>

                      <Button
                        className="addbutton btn"
                        variant="success"
                        style={{ padding: "5px 8px", marginLeft: "65%" }}
                        onClick={addFunction}
                      >
                        Add
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </div>
            </div>
            ;
            <div className="text-end mb-3 mt-2">
              <Button
                variant="danger"
                style={{ marginRight: "10px" }}
                onClick={() => setShow(false)}
              >
                Cancel
              </Button>
              <Button variant="success" type="submit">
                {data ? (data._id ? "Update" : "Submit") : "Submit"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Stockmovements;
