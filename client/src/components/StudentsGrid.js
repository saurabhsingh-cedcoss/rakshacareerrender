import React, { useEffect, useState } from "react";
import { Divider, PageHeader, Row } from "antd";
import "antd/dist/antd.min.css";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Table, Tag, Button, Modal, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const { confirm } = Modal;
function StudentsGrid() {
  let navigate = useNavigate();
  const [StudentsData, setStudentsData] = useState([]);
  const [singleStudentData, setSingleStudentData] = useState(" ");
  const [DelLoader, setDelLoader] = useState(false);
  const [sendLoader, setSendLoader] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys, selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns = [
    {
      title: "Course",
      dataIndex: "addmissionFor",
      key: "addmissionFor",
      render: (t) => <>{t || "NA"}</>,
    },

    {
      title: "Name",
      dataIndex: "studentName",
      key: "studentName",
      render: (text) => <Button type="link">{text}</Button>,
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
      render: (text) => <>{text || "NA"}</>,
    },
    // {
    //   title: "Mother Name",
    //   dataIndex: "motherName",
    //   key: "motherName",
    //   render: (text) => <>{text || "NA"}</>,
    // },
    {
      title: "Phone",
      dataIndex: "contactNo",
      key: "contactNo",
      render: (text) => <>{text || "NA"}</>,
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      key: "dob",
      render: (text) => <>{text || "NA"}</>,
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
      render: (text) => <>{text || "NA"}</>,
      filters: [
        {
          text: "2017-2018",
          value: "2017-2018",
        }, {
          text: "2018-2019",
          value: "2018-2019",
        }, {
          text: "2019-2020",
          value: "2019-2020",
        }, {
          text: "2020-2021",
          value: "2020-2021",
        }, {
          text: "2021-2022",
          value: "2021-2022",
        }, {
          text: "2022-2023",
          value: "2022-2023",
        },
        {
          text: "2023-2024",
          value: "2023-2024",
        },
        {
          text: "2024-2025",
          value: "2024-2025",
        },
      ],
    },
    {
      title: "Permanent Address",
      dataIndex: "permanentAddress",
      key: "permanentAddress",
      render: (text) => <>{text || "NA"}</>,
    },
    {
      title: "Total Fees",
      dataIndex: "totalFee",
      key: "totalFee",
    },
    {
      title: "Paid Fees",
      dataIndex: "paidFees",
      key: "paidFees",
    },
    {
      title: "Fee Status",
      dataIndex: "submitFillMonth",
      key: "feeStatus",
      render: (data) => {
        let d = new Date();
        let month = data && parseInt(data.split("-")[0]);
        let year = data && parseInt(data.split("-")[1]);
        let status = "NA";

        let fromApi = new Date(month + "-" + 10 + "-" + year).getTime();
        let currentDate = new Date(
          d.getMonth() + "-" + 10 + "-" + d.getFullYear()
        ).getTime();

        if (currentDate > fromApi) {
          status = "Due";
        } else {
          status = "Paid";
        }
        return (
          <Tag color={status === "Due" ? "volcano" : "green"}>{status}</Tag>
        );
      },
    },

    {
      title: "AadharNo",
      dataIndex: "AadharNo",
      key: "AadharNo",
      onCell: (record, rowIndex) => {
        return {
          onClick: () => {
            setSingleStudentData(record);
          },
        };
      },

      render: (text) => <>{text || "NA"}</>,
    },
    {
      title: "Action",
      render: (record) => (
        <Row align={"stretch"}>
          <Button
            type="link"
            onClick={() => {
              console.log(record, "record");
              navigate("/viewStudent", { state: record });
            }}
          >
            View
          </Button>

          <Button
            type="link"
            onClick={() => {
              confirm({
                title: "Are you sure delete this Student Data?",
                icon: <ExclamationCircleFilled />,
                content:
                  "If you delete this student it will be moved to the list of deleted students.",
                okText: "Yes",
                okType: "danger",
                cancelText: "No",
                okButtonProps: {
                  loading: DelLoader,
                },
                onOk() {
                  deleteStudent(record.admissionNo);
                },
                onCancel() {
                  // console.log("Cancel");
                },
              });
              // navigate("/studentdata", { state: record });
            }}
          >
            Delete
          </Button>
        </Row>
      ),
    },
    {
      title: "Send sms",
      render: (record) => (
        <a
          onClick={() => {
            axios
              .get("http://localhost:4000/sendSms")
              .then(function (response) {
                openToast(response.data.message);
              });
          }}
        >
          Send
        </a>
      ),
    },
  ];

  const openToast = (msg) => {
    notification.info({
      message: msg,
      duration: 3,
      // description: "Fsdf",
      placement: "bottom",
    });
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  const deleteStudent = (admissionNo) => {
    setDelLoader(true);
    axios
      .post("http://localhost:4000/students/delete", {
        admissionNo,
      })
      .then((res) => {
        console.log(res, "res");
        if (res.data.success) {
          getAllStudent();
          openToast(res.data.message);
        } else {
          openToast(res.data.message);
        }
        setDelLoader(false);
      });
  };

  const getAllStudent = (filter) => {
    console.log(filter, "filter");
    axios
      .post("http://localhost:4000/students", filter ? { session: filter } : {})
      .then((res) => {
        console.log(res.data);
        let keyAddedRow = res.data.map((ele) => {
          ele["key"] = ele.admissionNo;
          return ele;
        });
        setStudentsData(keyAddedRow);
      });
  };

  const tableChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    if (filters.session) {
      getAllStudent(filters.session);
    } else {
      getAllStudent();
    }
  };
  return (
    <>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title="Students"
        avatar={{
          src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
        }}
        subTitle="All students record"
      />
      <br />
      {selectedRowKeys.length !== 0 && (
        <div
          style={{
            marginBottom: 16,
          }}
        >
          <Button
            type="primary"
            size="middle"
            onClick={() => {
              confirm({
                title: "Fee Reminder",
                icon: <ExclamationCircleFilled />,
                content:
                  "It will send sms to all the selected contacts for fees reminder.",
                okText: "Send",
                okType: "primary",
                cancelText: "No",
                okButtonProps: {
                  loading: sendLoader,
                },
                onOk() {
                  // deleteStudent(record.admissionNo);
                },
                onCancel() {
                  // console.log("Cancel");
                },
              });
            }}
          >
            Fee Reminder
          </Button>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={StudentsData}
        rowSelection={rowSelection}
        onChange={tableChange}
      />
      {/* <StudentData data={singleStudentD+ata} />; */}
    </>
  );
}

export default StudentsGrid;
