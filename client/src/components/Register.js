import React from "react";
import { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";
// import { ComponentToPrint } from "./ComponentToPrint";
import {
  Button,
  Select,
  Form,
  Input,
  Modal,
  DatePicker,
  Checkbox,
  PageHeader,
  Row,
  Col,
  Upload,
  Radio,
  notification,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { useNavigate, useLocation } from "react-router-dom";
import { ExclamationCircleFilled } from "@ant-design/icons";
let feePay = 0;
let monthPay = "";
const Register = () => {
  let navigate = useNavigate();
  let formRef = useRef();
  const location = useLocation();
  console.log(location);
  const { RangePicker } = DatePicker;
  const [image, setImage] = useState(null);
  const [agree, setAgree] = useState(false);

  const [loader, setLoader] = useState(false);
  const [monthOptions, setMonthsOption] = useState([]);
  const [feeLoader, setFeeLoader] = useState(false);
  const [studentData, setStudentData] = useState({
    AadharNo: (location.state && location.state.AadharNo) || "",
    SrNo: (location.state && location.state.SrNo) || "",
    addmissionFor: (location.state && location.state.addmissionFor) || "",
    admissionNo: (location.state && location.state.admissionNo) || "",
    alterContactNo: (location.state && location.state.alterContactNo) || "",
    caste: (location.state && location.state.caste) || "",
    contactNo: (location.state && location.state.contactNo) || "",
    dob: (location.state && location.state.dob) || "",
    fatherName: (location.state && location.state.fatherName) || "",
    gender: (location.state && location.state.gender) || "",
    lastExam: (location.state && location.state.lastExam) || "",
    localAddress: (location.state && location.state.localAddress) || "",
    medium: (location.state && location.state.medium) || "",
    motherName: (location.state && location.state.motherName) || "",
    parentAnnualInc: (location.state && location.state.parentAnnualInc) || "",
    parentsOccupation:
      (location.state && location.state.parentsOccupation) || "",
    permanentAddress: (location.state && location.state.permanentAddress) || "",
    previousSchool: (location.state && location.state.previousSchool) || "",
    religion: (location.state && location.state.religion) || "",
    studentName: (location.state && location.state.studentName) || "",
    RTE: (location.state && location.state.RTE) || "no",
  });

  const handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImage({
        image: file,
        imagePreviewUrl: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const createItem = (newItem) => {
    console.log("PHOTO:", newItem.image);
    const h = {}; //headers
    let data = new FormData();
    data.append("image", newItem.image);
    data.append("name", newItem.name);
    h.Accept = "application/json"; //if you expect JSON response
    fetch("/api/item", {
      method: "POST",
      headers: h,
      body: data,
    })
      .then((response) => {
        // TODO : Do something
      })
      .catch((err) => {
        // TODO : Do something
      });
  };

  const handlePrint = useReactToPrint(
    {
      content: () => formRef.current,
    },
    () => {
      console.log("hell");
    }
  );

  const editStudent = () => {
    axios
      .post("/students/editStudent", {
        ...{
          admissionNo: location.state.admissionNo,
        },
        ...studentData,
      })
      .then(function (response) {
        if (response.data.success) {
          notification.info({
            message: response.data.message,
            duration: 3,
            placement: "bottom",
            style: { backgroundColor: "lightgreen" },
          });
          setTimeout(() => {
            navigate("/");
          });
        } else {
        }
      });
  };

  const submitForm = () => {
    axios
      .post("/register", studentData)
      .then(function (response) {
        if (response.data.success) {
          setLoader(false);
          notification.info({
            message: response.data.message,
            duration: 3,
            placement: "bottom",
            style: { backgroundColor: "lightgreen" },
          });
          Modal.confirm({
            title: "Would you like to print registration form?",
            icon: <ExclamationCircleFilled />,
            okText: "Print",
            cancelText: "No",
            onOk() {
              handlePrint();
              setTimeout(() => {
                navigate("/");
              });
            },
            onCancel() {
              navigate("/");
            },
          });
        } else {
          setLoader(false);
        }
      });
  };

  useEffect(() => {
    getFeeMonth();
  }, []);

  const getFeeMonth = () => {
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let monthOpt = [];
    let d = new Date();
    d.setDate(1); //REM: To prevent month skipping.

    for (var i = 0; i < 12; i++) {
      d.setMonth(d.getMonth() + 1);
      console.log(monthNames[d.getMonth()], d.getFullYear());
      monthOpt.push({
        label: monthNames[d.getMonth()] + " " + d.getFullYear(),
        value: d.getMonth() + "-" + d.getFullYear(),
      });
    }
    setMonthsOption(monthOpt);
  };

  const submitFees = () => {
    axios
      .post("/submitFee", {
        admissionNo: location.state.admissionNo,
        submitFillMonth: monthPay,
        paidFees: feePay,
      })
      .then(function (response) {
        if (response.data.success) {
          setFeeLoader(false);
          console.log(response.data);
          notification.info({
            message: response.data.message,
            duration: 3,
            placement: "bottom",
          });
        } else {
          setFeeLoader(false);
          notification.info({
            message: response.data.message,
            duration: 3,
            placement: "bottom",
          });
        }
      });
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title={
          location.pathname === "/viewStudent" ? "View Student" : "Register"
        }
        // avatar={{
        //   src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        // }}
        extra={
          location.state && location.state.RTE === "no"
            ? [
                <Button
                  type="primary"
                  onClick={() => {
                    Modal.confirm({
                      title: "Would you like to pay fees?",
                      content: (
                        <Row>
                          <br />
                          <Form layout="vertical">
                            <Form.Item label="Total Fees (In Year)">
                              <Input
                                disabled
                                value={location.state.totalFee}
                              ></Input>
                            </Form.Item>

                            <Form.Item label="Already Paid Fees (In Year)">
                              <Input
                                value={location.state.paidFees}
                                disabled
                              ></Input>
                            </Form.Item>

                            <Form.Item label="Remaining Fees (In Year)">
                              <Input
                                type="number"
                                onChange={(e) => {
                                  feePay = e.target.value;
                                }}
                              ></Input>
                            </Form.Item>
                            <Form.Item label="Fees Paid Already(Month)">
                              <Select
                                allowClear
                                disabled
                                options={monthOptions}
                                value={location.state.submitFillMonth}
                              />
                            </Form.Item>
                            <Form.Item label="Fees Submitted till Month">
                              <Select
                                allowClear
                                onChange={(e) => {
                                  monthPay = e;
                                }}
                                options={monthOptions}
                              />
                            </Form.Item>
                          </Form>
                        </Row>
                      ),
                      icon: <ExclamationCircleFilled />,
                      okText: "Pay",
                      cancelText: "Cancel",
                      okButtonProps: {
                        loading: feeLoader,
                      },
                      onOk() {
                        setFeeLoader(true);
                        submitFees();
                      },
                      onCancel() {},
                    });
                  }}
                >
                  Submit Fee
                </Button>,
              ]
            : []
        }
        subTitle={`Here You Can${
          location.pathname === "/viewStudent" ? " View and Edit" : " Register"
        } Student`}
      />
      <br />

      <Row justify="center" ref={formRef}>
        <Col span={20}>
          <Form layout="vertical">
            <Form.Item label="Sr. No">
              <Input
                value={studentData.SrNo}
                disabled={location.pathname === "/viewStudent"}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    SrNo: e.target.value,
                  })
                }
              />
            </Form.Item>
            {/* <Row justify={"space-between"}>
              <Col span={12}>
                <Form.Item label="Photograph">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Id Photo">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row> */}
            <Form.Item label="Admission No">
              <Input
                disabled={location.pathname === "/viewStudent"}
                value={studentData.admissionNo}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    admissionNo: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Row>
              <Col span={12}>
                <Form.Item label="Sessions">
                  <RangePicker
                    picker="year"
                    // value={
                    //   location.state.session &&
                    //   location.state.session.split("-")
                    // }
                    onChange={(v, m) => {
                      setStudentData({
                        ...studentData,
                        session: m[0] + "-" + m[1],
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Date Of Birth">
                  {/* {console.log(dayjs(location.state.dob))} */}
                  <DatePicker
                    format={"DD-MM-YYYY"}
                    // value={dayjs(location.state.dob, "DD-MM-YYYY")}
                    onChange={(e, d) => {
                      console.log(e, d, "hee");
                      setStudentData({
                        ...studentData,
                        dob: d,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Aadhar Number">
              <Input
                type="number"
                value={studentData.AadharNo}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    AadharNo: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Student Name">
              <Input
                value={studentData.studentName}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    studentName: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Father Name">
              <Input
                value={studentData.fatherName}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    fatherName: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Mother Name">
              <Input
                value={studentData.motherName}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    motherName: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Permanent Address">
              <Input
                value={studentData.permanentAddress}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    permanentAddress: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Local Address">
              <Input
                value={studentData.localAddress}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    localAddress: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Religion">
              <Input
                value={studentData.religion}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    religion: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Caste">
              <Input
                value={studentData.caste}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    caste: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Parent's Occupation">
              <Input
                value={studentData.parentsOccupation}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    parentsOccupation: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Parent's Annual Income">
              <Input
                value={studentData.parentAnnualInc}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    parentAnnualInc: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Row justify={"space-between"}>
              <Col span={12}>
                <Form.Item label="Gender">
                  <Radio.Group
                    value={studentData.gender}
                    onChange={(e) => {
                      setStudentData({
                        ...studentData,
                        gender: e.target.value,
                      });
                    }}
                  >
                    <Radio value={"Male"}>Male</Radio>
                    <Radio value={"Female"}>Female</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Medium">
                  <Radio.Group
                    value={studentData.medium}
                    onChange={(e) => {
                      setStudentData({
                        ...studentData,
                        medium: e.target.value,
                      });
                    }}
                  >
                    <Radio value={"English"}>English</Radio>
                    <Radio value={"Hindi"}>Hindi</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Class Applied For Admission">
              <Input
                value={studentData.addmissionFor}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    addmissionFor: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Name of Class/Exam Passed">
              <Input
                value={studentData.lastExam}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    lastExam: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Name of Last School">
              <Input
                value={studentData.previousSchool}
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    previousSchool: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Contact Number">
              <Input
                value={studentData.contactNo}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    contactNo: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Alternate Contact Number">
              <Input
                value={studentData.alterContactNo}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    alterContactNo: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Right to Education Eligible Student">
              <Select
                defaultValue="no"
                allowClear
                value={studentData.RTE}
                onChange={(e) => {
                  console.log(e);
                  setStudentData({
                    ...studentData,
                    RTE: e,
                  });
                }}
                options={[
                  {
                    label: "Yes",
                    value: "yes",
                  },
                  {
                    label: "No",
                    value: "no",
                  },
                ]}
              />
            </Form.Item>
            {studentData.RTE === "no" && location.pathname === "/register" && (
              <>
                <Form.Item label="Total Fess for a Year">
                  <Input
                    type="number"
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        totalFee: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Paid Fess">
                  <Input
                    type="number"
                    onChange={(e) =>
                      setStudentData({
                        ...studentData,
                        paidFees: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Fees Submitted till Which Month">
                  <Select
                    placeholder={"Please choose..."}
                    allowClear
                    onChange={(e) => {
                      console.log(e, "sub");
                      setStudentData({
                        ...studentData,
                        submitFillMonth: e,
                      });
                    }}
                    options={monthOptions}
                  />
                </Form.Item>
              </>
            )}
            {location.pathname === "/register" && (
              <Form.Item>
                <Checkbox
                  onChange={(e) => {
                    setAgree(e.target.checked);
                  }}
                >
                  I hereby decalare that all information qbove filled is true to
                  best of my knowledge and i agree to abide by the school rules
                  of regulation.
                </Checkbox>
              </Form.Item>
            )}
            <Form.Item>
              <Button
                type="primary"
                loading={loader}
                onClick={() => {
                  setLoader(true);
                  if (location.pathname === "/register") {
                    if (agree) {
                      submitForm();
                    } else {
                      setLoader(false);
                      notification.error({
                        message: "Agree the decalarion.",
                        duration: 3,
                        placement: "bottom",
                        description:
                          "Please tick the checkbox of aggrement to register the student.",
                        style: { backgroundColor: "#FFCCCB" },
                      });
                    }
                  } else {
                    editStudent();
                  }
                }}
              >
                {location.pathname === "/viewStudent" ? "Edit" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Register;
