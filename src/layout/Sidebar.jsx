import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="deznav">
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          <li>
            <a
              onClick={() => navigate("/")}
              href={undefined}
              aria-expanded="false"
            >
              <div className="menu-icon"></div>
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/users")}
              href={undefined}
              className
              aria-expanded="false"
            >
              <div className="menu-icon">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_113_177)">
                    <path
                      d="M17 4H6C4.79111 4 4 4.7 4 6V18C4 19.3 4.79111 20 6 20H18C19.2 20 20 19.3 20 18V7.20711C20 7.0745 19.9473 6.94732 19.8536 6.85355L17 4ZM17 11H7V4H17V11Z"
                      fill="#90959F"
                    />
                    <path
                      opacity="0.3"
                      d="M14.5 4H12.5C12.2239 4 12 4.22386 12 4.5V8.5C12 8.77614 12.2239 9 12.5 9H14.5C14.7761 9 15 8.77614 15 8.5V4.5C15 4.22386 14.7761 4 14.5 4Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_113_177">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="nav-text">User</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => navigate("/products")}
              href={undefined}
              className
              aria-expanded="false"
            >
              <div className="menu-icon">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_115_172)">
                    <path
                      opacity="0.3"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4.25933C12.1489 4.25921 12.3 4.29247 12.4426 4.36281C12.6398 4.46014 12.7994 4.61977 12.8967 4.81698L14.9389 8.95491L19.5054 9.61846C20.0519 9.69788 20.4306 10.2053 20.3512 10.7519C20.3196 10.9695 20.2171 11.1706 20.0596 11.3242L16.7553 14.5451L17.5353 19.0931C17.6287 19.6374 17.2631 20.1544 16.7188 20.2478C16.502 20.2849 16.279 20.2496 16.0844 20.1473L12 18V4.25933Z"
                      fill="#4E5566"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 4.25933V18L7.91559 20.1473C7.42675 20.4043 6.82212 20.2163 6.56512 19.7275C6.46278 19.5328 6.42746 19.3099 6.46464 19.0931L7.24469 14.5451L3.94036 11.3242C3.54487 10.9387 3.53678 10.3055 3.92228 9.91006C4.07579 9.75258 4.27693 9.65009 4.49457 9.61846L9.06104 8.95492L11.1032 4.81699C11.2773 4.46426 11.6316 4.25961 12 4.25933Z"
                      fill="#90959F"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_115_172">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="nav-text">Products</span>
            </a>
          </li>

          <li>
          <a
              onClick={() => navigate("/warehouse")}
              href={undefined}
              aria-expanded="false"
            >
              <div className="menu-icon">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      d="M9.34933 14.8577C5.38553 14.8577 2 15.47 2 17.9174C2 20.3666 5.364 21 9.34933 21C13.3131 21 16.6987 20.3877 16.6987 17.9404C16.6987 15.4911 13.3347 14.8577 9.34933 14.8577Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M9.34935 12.5248C12.049 12.5248 14.2124 10.4062 14.2124 7.76241C14.2124 5.11865 12.049 3 9.34935 3C6.65072 3 4.48633 5.11865 4.48633 7.76241C4.48633 10.4062 6.65072 12.5248 9.34935 12.5248Z"
                      fill="white"
                    />
                    <path
                      opacity="0.4"
                      d="M16.1734 7.84876C16.1734 9.19508 15.7605 10.4513 15.0364 11.4948C14.9611 11.6022 15.0276 11.7468 15.1587 11.7698C15.3407 11.7996 15.5276 11.8178 15.7184 11.8216C17.6167 11.8705 19.3202 10.6736 19.7908 8.87119C20.4885 6.19677 18.4415 3.79544 15.8339 3.79544C15.5511 3.79544 15.2801 3.82419 15.0159 3.87689C14.9797 3.88456 14.9405 3.9018 14.921 3.93247C14.8955 3.97176 14.9141 4.02254 14.9395 4.05608C15.7233 5.13217 16.1734 6.44208 16.1734 7.84876Z"
                      fill="white"
                    />
                    <path
                      d="M21.7791 15.1693C21.4318 14.444 20.5932 13.9466 19.3173 13.7023C18.7155 13.5586 17.0854 13.3545 15.5697 13.3832C15.5472 13.3861 15.5345 13.4014 15.5325 13.411C15.5296 13.4263 15.5365 13.4493 15.5658 13.4656C16.2664 13.8048 18.9738 15.2805 18.6333 18.3928C18.6187 18.5289 18.7292 18.6439 18.8672 18.6247C19.5335 18.5318 21.2478 18.1705 21.7791 17.0475C22.0737 16.4534 22.0737 15.7634 21.7791 15.1693Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <span className="nav-text">Warehouses</span>
            </a>
           
          </li>
          {/* <li>
            <a
              onClick={() => navigate("/godown")}
              href={undefined}
              className
              aria-expanded="false"
            >
              <div className="menu-icon">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_113_177)">
                    <path
                      d="M17 4H6C4.79111 4 4 4.7 4 6V18C4 19.3 4.79111 20 6 20H18C19.2 20 20 19.3 20 18V7.20711C20 7.0745 19.9473 6.94732 19.8536 6.85355L17 4ZM17 11H7V4H17V11Z"
                      fill="#90959F"
                    />
                    <path
                      opacity="0.3"
                      d="M14.5 4H12.5C12.2239 4 12 4.22386 12 4.5V8.5C12 8.77614 12.2239 9 12.5 9H14.5C14.7761 9 15 8.77614 15 8.5V4.5C15 4.22386 14.7761 4 14.5 4Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_113_177">
                      <rect width={24} height={24} fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <span className="nav-text">Godwon</span>
            </a>
          </li> */}
         
          <li>
            <a
              onClick={() => navigate("/stockmovement")}
              href={undefined}
              aria-expanded="false"
            >
              <div className="menu-icon">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.5">
                    <path
                      opacity="0.4"
                      d="M11.776 21.8374C9.49292 20.4273 7.37062 18.7645 5.44789 16.8796C4.0905 15.5338 3.05386 13.8905 2.41716 12.0753C1.27953 8.53523 2.60381 4.48948 6.30111 3.2884C8.25262 2.67553 10.375 3.05175 12.007 4.29983C13.6396 3.05315 15.7614 2.67705 17.713 3.2884C21.4103 4.48948 22.7435 8.53523 21.6058 12.0753C20.9743 13.8888 19.9438 15.5319 18.5929 16.8796C16.6684 18.7625 14.5463 20.4251 12.2648 21.8374L12.0159 22L11.776 21.8374Z"
                      fill="white"
                    />
                    <path
                      d="M12.0109 22L11.776 21.8374C9.49013 20.4274 7.36487 18.7647 5.43902 16.8796C4.0752 15.5356 3.03238 13.8922 2.39052 12.0753C1.26177 8.53523 2.58605 4.48948 6.28335 3.2884C8.23486 2.67553 10.3853 3.05204 12.0109 4.31057V22Z"
                      fill="white"
                    />
                    <path
                      d="M18.2304 9.99922C18.0296 9.98629 17.8425 9.8859 17.7131 9.72157C17.5836 9.55723 17.5232 9.3434 17.5459 9.13016C17.5677 8.4278 17.168 7.78851 16.5517 7.53977C16.1609 7.43309 15.9243 7.00987 16.022 6.59249C16.1148 6.18182 16.4993 5.92647 16.8858 6.0189C16.9346 6.027 16.9816 6.04468 17.0244 6.07105C18.2601 6.54658 19.0601 7.82641 18.9965 9.22576C18.9944 9.43785 18.9117 9.63998 18.7673 9.78581C18.6229 9.93164 18.4291 10.0087 18.2304 9.99922Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </div>
              <span className="nav-text">Stock movements</span>
            </a>
          </li>
                 </ul>
      </div>
    </div>
  );
}

export default Sidebar;
