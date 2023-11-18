import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../Services/ApiCall";
import { loginUrl } from "../Services/BaseUrl";
import { useContext } from "react";
import { ContextDatas } from "../Services/Context";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { handleSubmit } from "../utils/Fns";
import jwtDecode from "jwt-decode";

function Loginpage() {
  const [validated, setValidated] = useState(false);

  const { user, setUser } = useContext(ContextDatas);

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  // const login = async () => {
  //   const response = await apiCall("post", loginUrl, data);
  //   if (response.status) {
  //     localStorage.setItem("token", response.data);
  //     console.log(response.data, "localstorage")
  //     setUser(jwtDecode(response.data));
  //   return  navigate("/users")
     
  //   }
  // };

  const login = async () => {
    try {
      const response = await apiCall("post", loginUrl, data);
      if (response.status) {
        localStorage.setItem("token", response.data);
        console.log(response.data, "localstorage");
        setUser(jwtDecode(response.data));
        // return navigate("/users");
        window.location.href = '/users'
      } else {
        // Handle server errors here
        console.error("Server error:", response.error); // You may need to adjust this based on your API response structure
        // Display an error message to the user, for example:
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle network errors or any unexpected errors here
      console.error("Error during login:", error);
      // Display an error message to the user, for example:
      alert("Unauthorized  login");
    }
  };
  
  

  return (
    <>
      <div className="login-page">
        <div className="container h-100">
          <div className="row justify-content-center h-100 align-items-center ">
            <div className="col-md-6">
              <div className="authincation-content">
                <div className="row no-gutters">
                  <div className="col-xl-12">
                    <div className="auth-form">
                      <div className="text-center mb-3">
                     
                      </div>

                      <h4 className="text-center mb-4">Sign in your account</h4>
                      <Form
                        noValidate
                        validated={validated}
                        onSubmit={(e) => handleSubmit(e, setValidated, login)}
                      >
                        <Form.Group as={Col} controlId="validationCustom01">
                          <Form.Label className="mb-1">Username</Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Enter username"
                              value={data.username}
                              onChange={(e) =>
                                setData({ ...data, username: e.target.value })
                              }
                              aria-describedby="inputGroupPrepend"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please enter Username.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          as={Col}
                          controlId="validationCustom02"
                        >
                          <Form.Label className="mb-1 mt-4">
                            Password
                          </Form.Label>
                          <InputGroup hasValidation>
                            <Form.Control
                              required
                              type="password"
                              placeholder="Enter password"
                              value={data.password}
                              onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                              }
                              aria-describedby="inputGroupPrepend"
                            />
                            <Form.Control.Feedback type="invalid">
                              Please check your password.
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>
                        <div className="text-center mt-4">
                          <Button
                            type="submit"
                            className="btn btn-primary btn-block"
                         
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loginpage;
