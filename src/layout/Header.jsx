import React, { useContext, useState } from "react";
import { ContextDatas } from "../Services/Context";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const { user } = useContext(ContextDatas);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {" "}
      <div className="full-header">
        <div className="nav-header">
          <div className="nav-control">
            <div className="hamburger">
              <span className="line">
                <svg
                  width={21}
                  height={20}
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.7468 5.58925C11.0722 5.26381 11.0722 4.73617 10.7468 4.41073C10.4213 4.0853 9.89369 4.0853 9.56826 4.41073L4.56826 9.41073C4.25277 9.72622 4.24174 10.2342 4.54322 10.5631L9.12655 15.5631C9.43754 15.9024 9.96468 15.9253 10.3039 15.6143C10.6432 15.3033 10.6661 14.7762 10.3551 14.4369L6.31096 10.0251L10.7468 5.58925Z"
                    fill="#452B90"
                  />
                  <path
                    opacity="0.3"
                    d="M16.5801 5.58924C16.9056 5.26381 16.9056 4.73617 16.5801 4.41073C16.2547 4.0853 15.727 4.0853 15.4016 4.41073L10.4016 9.41073C10.0861 9.72622 10.0751 10.2342 10.3766 10.5631L14.9599 15.5631C15.2709 15.9024 15.798 15.9253 16.1373 15.6143C16.4766 15.3033 16.4995 14.7762 16.1885 14.4369L12.1443 10.0251L16.5801 5.58924Z"
                    fill="#452B90"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="header">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left"></div>
                <div className="header-right d-flex align-items-center">
                  <ul className="navbar-nav">
                    <li className="nav-item ps-3">
                      <div className="dropdown header-profile2">
                        <a
                          className="nav-link"
                          href="javascript:void(0);"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <div className="header-info2 d-flex align-items-center">
                            <div className="header-media">
                              <img src="images\avathar 2.png" alt />
                            </div>
                          </div>
                        </a>
                        <div
                          className="dropdown-menu dropdown-menu-end"
                          style={{}}
                        >
                          <div className="card border-0 mb-0">
                            <div className="card-header py-2">
                              <div className="products">
                                <img
                                  src="images\avathar 2.png"
                                  className="avatar avatar-md"
                                  alt
                                />
                                <div>
                                  <h6>Admin</h6>
                                  <span>Wml</span>
                                </div>
                              </div>
                            </div>

                            <div className="card-footer px-0 py-2">
                              <a
                                onClick={handleLogout}
                                href={undefined}
                                className="dropdown-item ai-icon"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={18}
                                  height={18}
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="var(--primary)"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                  <polyline points="16 17 21 12 16 7" />
                                  <line x1={21} y1={12} x2={9} y2={12} />
                                </svg>
                                <span className="ms-2">Logout </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
