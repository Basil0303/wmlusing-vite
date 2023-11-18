import React, { useState, useEffect } from "react";
import { apiCall } from "../Services/ApiCall";
import { stockmoveUrl } from "../Services/BaseUrl";
import { stockmovecreUrl } from "../Services/BaseUrl";
import { productsUrl } from "../Services/BaseUrl";
import { warehouseUrl } from "../Services/BaseUrl";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";

function Stockmovements() {
  const [getstockmove, setgetStockmove] = useState([]);

  const [data, setData] = useState({
    toWarehouse: "",
    reason: "",
  });

  const [productlist, setProductList] = useState({
    product: "",
    quantity: "",
  });

  const [store, setStore] = useState([]);
  console.log(store,"store")

  const [pagination, setpagination] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
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
      const response = await apiCall("get", stockmoveUrl, {}, params);

      if (response.status === true) {
        setgetStockmove(response.data.movements);

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
  const addToArray = async () => {
    let array =await [...store];
    setData((prev) => ({
      ...prev,
      products: array,
    }));
  };

  //create move data
  const moveMent = async () => {
    let productdata = data
    // addToArray();
    if (store.length){
      productdata.products=store
    }
    const selectedProduct = productlist.product;
    const quantity = productlist.quantity;
    // console.log("productdata",productdata)
    const createResponse = await apiCall("post", stockmovecreUrl, productdata);
  
    if (createResponse) {
      // Clear form input values after successful submission
      setProductList({ product: "", quantity: "" });
      setData({ toWarehouse: "", reason: "" });
  
      setShow(false);
      await getStockMove();
    }
  };
  

  //get product warehuse data
  const getPopupdata = async () => {
    const productTypeResponse = await apiCall("get", productsUrl);
    const productList = productTypeResponse?.data?.docs ?? [];
    const modifiedproductList = productList.map(({ _id, name }) => ({
      value: _id,
      label: name,
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

  const addFunction = () => {
   setStore([...store, productlist]);
    // setStore[{...productlist.quantity}]
    setProductList({ product: null, quantity: null });
  };

  const staticOptions = [
    { value: "transfer", label: "transfer " },
    
  ];

  useEffect(() => {
    getStockMove();
    getPopupdata();
  }, [params]);
  console.log("movement.products",getstockmove)
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
                        {/* <th>SLNO</th> */}
                        <th>Movement Id</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>To Warehouse</th>
                        <th>Reason</th>
                        <th>Date</th>
                      </tr>
                    </thead>

                    <tbody>
                      {getstockmove?.map((movement, movementIndex) => (
                        <React.Fragment key={movementIndex}>
                          {movement.products.map((product, productIndex) => (
                           <tr key={productIndex}>
                           {/* <td>
                             {params.page === 1
                               ? movementIndex * params.limit + productIndex + 1
                               : params.limit * (params.page - 1) +
                                 movementIndex * params.limit +
                                 productIndex +
                                 1}
                              </td> */}
                              <td>{movement.toWarehouse._id}</td>
                              <td>{product.product.name}</td>
                              <td>{product.quantity}</td>
                              <td>{movement.toWarehouse.name}</td>
                              <td>{movement.reason}</td>
                              <td>{movement.moveDate}</td>
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
              <div className="form-table border border-secondary p-3">
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
                <div className="mb-4">
                  <label htmlFor="mobileNumber" className="form-label">
                    Quantity<span className="text-danger">*</span>
                  </label>
                  <input
                
                    type="tel"
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
                <button className="addbutton btn-primary" onClick={addFunction}>
                  Add
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="distributorname" className="form-label">
                  ToWarehouse<span className="text-danger">*</span>
                </label>
                <Select
                  required
                  options={warehouse}
                  onChange={(warehouse) => {
                    setData({
                      ...data,
                      toWarehouse: warehouse.value,
                    });
                  }}
                />
              </div>
              <div className="mb-4">
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
                  }}
                />
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
    </div>
  );
}

export default Stockmovements;
