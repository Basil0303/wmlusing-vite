// import React, { useState, useEffect } from "react";
// import { apiCall } from "../Services/ApiCall"; 
// import { godownUrl } from "../Services/BaseUrl";


// function Godwon() {
//   const [getground, setgetGround] = useState([]);

  
//   const [data, setData] = useState({
//     name: "",
//     adress: "",
//     mobile: "",
//     username: "",
//     role: "",
//     action: "",
//   });

//   const [pagination, setpagination] = useState({
//     hasNextPage: false,
//     hasPreviousPage: false,
//     totalDocs: 0,
//   });

//   const [params, setparams] = useState({
//     page: 1,
//     limit: 10,
//     query: "",
//   });

//   //get user data
//   const getGround = async () => {
//     try {
//       const response = await apiCall("get",godownUrl , {} ,params );
//       setgetGround(response.data.docs ?? []);
//       setpagination({
//         hasNextPage: response.data.hasNextPage,
//         hasPreviousPage: response.data.hasPreviousPage,
//         totalDocs: response.data.totalDocs,
//       });
//       if (response.status === true) {
//       } 
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   useEffect(() => {
//     getGround();
//   }, [params]);
  
//   return (
//     <div>
//       <div className="col-xl-12">
//         <div className="card dz-card" id="bootstrap-table11">
//           <div className="card-header flex-wrap d-flex justify-content-between">
//             <div>
//               <h4 className="card-title">Godown Table</h4>
//             </div>
//             <div
//               className="nav nav-tabs dzm-tabs d-flex align-items-center"
//               id="myTab-8"
//               role="tablist"
//               style={{ backgroundColor: "white" }}
//             >
//               <li className="nav-item me-1">
//                 <div className="input-group search-area">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search here..."
//                     value={params.query}
//                     onChange={(e) =>
//                       setparams({ ...params, query: e.target.value })
//                     }
//                   />

//                   <span className="input-group-text">
//                     <a href={undefined}>
//                       <svg
//                         width={24}
//                         height={24}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <g clipPath="url(#clip0_1_450)">
//                           <path
//                             opacity="0.3"
//                             d="M14.2929 16.7071C13.9024 16.3166 13.9024 15.6834 14.2929 15.2929C14.6834 14.9024 15.3166 14.9024 15.7071 15.2929L19.7071 19.2929C20.0976 19.6834 20.0976 20.3166 19.7071 20.7071C19.3166 21.0976 18.6834 21.0976 18.2929 20.7071L14.2929 16.7071Z"
//                             fill="#452B90"
//                           />
//                           <path
//                             d="M11 16C13.7614 16 16 13.7614 16 11C16 8.23859 13.7614 6.00002 11 6.00002C8.23858 6.00002 6 8.23859 6 11C6 13.7614 8.23858 16 11 16ZM11 18C7.13401 18 4 14.866 4 11C4 7.13402 7.13401 4.00002 11 4.00002C14.866 4.00002 18 7.13402 18 11C18 14.866 14.866 18 11 18Z"
//                             fill="#452B90"
//                           />
//                         </g>
//                         <defs>
//                           <clipPath id="clip0_1_450">
//                             <rect width={24} height={24} fill="white" />
//                           </clipPath>
//                         </defs>
//                       </svg>
//                     </a>
//                   </span>
//                 </div>
//               </li>
//             </div>
//           </div>
//           <div className="tab-content" id="myTabContent-8">
//             <div
//               className="tab-pane fade show active"
//               id="activebackground"
//               role="tabpanel"
//               aria-labelledby="home-tab-8"
//             >
//               <div className="card-body">
//                 <div className="table-responsive">
//                   <table className="table header-border table-responsive-sm">
//                     <thead>
//                       <tr>
//                         <th>SL</th>
//                         <th>Name</th>
//                         <th>Address</th>
//                         <th>Phone</th>
//                         <th>Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {getground?.length ? (
//                         <>
//                           {getground?.map((item, index) => (
//                             <tr key={index}>
//                               <td>
//                                 {params.page === 1
//                                   ? index + 1
//                                   : params.limit * (params.page - 1) +
//                                     (index + 1)}
//                               </td>
//                               <td>{item?.name}</td>
//                               <td>{item?.address}</td>
//                               <td>{item?.stockCount}</td>
//                               <td>
//                                 {item?.active === true && (
//                                   <span
//                                     class="badge rounded-pill bg-primary px-2"
//                                     style={{ fontSize: "9px" }}
//                                   >
//                                     True
//                                   </span>
//                                 )}

//                                 {item?.active === false && (
//                                   <span
//                                     class="badge rounded-pill bg-success px-2 mx-1"
//                                     style={{ fontSize: "9px" }}
//                                   >
//                                     False
//                                   </span>
//                                 )}
//                               </td>
                              
//                             </tr>
//                           ))}
//                         </>
//                       ) : (
//                         <tr>
//                           <td colSpan={7} style={{ textAlign: "center" }}>
//                             <b> No Data Found </b>{" "}
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="d-flex justify-content-end mx-4 mb-3">
//             <button
//               className="btn btn-sm btn-primary"
//               disabled={!pagination.hasPreviousPage}
//               onClick={() => setparams({ ...params, page: params.page - 1 })}
//             >
//               <i className="fa-solid fa-angle-left" />
//             </button>

//             <button
//               className="btn btn-sm btn-primary mx-1"
//               disabled={!pagination.hasNextPage}
//               onClick={() => setparams({ ...params, page: params.page + 1 })}
//             >
//               <i className="fa-solid fa-angle-right" />
//             </button>
//           </div>
//         </div>
//       </div>

   
      
       
//     </div>
//   );
// }

// export default Godwon;
