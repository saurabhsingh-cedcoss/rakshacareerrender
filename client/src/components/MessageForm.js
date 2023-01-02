import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PageHeader,
  Space,
  Input,
  Form,
  Row,
  Col,
  Button,
  notification,
  Skeleton,
} from "antd";
function MessageForm() {
  const { TextArea } = Input;
  const [ShowSkelton, setShowSkelton] = useState(true);
  const [smstext, setSmstext] = useState({
    smsText: "",
    holidayMsg: "",
    feesMsg: "",
  });
  const [loader, setLoader] = useState(false);
  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/smstext", smstext)
      .then(function (response) {
        if (response.data.success) {
          notification.info({
            message: response.data.message,
            duration: 3,
            placement: "bottom",
          });
          setLoader(false);
          getSms();
        } else {
          notification.error({
            message: response.data.message,
            duration: 3,
            placement: "bottom",
          });
          setLoader(false);
          getSms();
        }
      });
  };

  useEffect(() => {
    getSms();
  }, []);

  const getSms = () => {
    axios.get("http://localhost:4000/smstext").then((res) => {
      console.log(res);
      setSmstext({
        smsText: res.data[0].smsText,
        feesMsg: res.data[0].feesMsg,
        holidayMsg: res.data[0].holidayMsg,
      });
      if (res.status === 200) {
        setShowSkelton(false);
      }
    });
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title="Message Box"
        subTitle="Here You Can Edit All Type of Message Notifications."
      />

      <br />
      <Row justify={"center"}>
        {ShowSkelton ? (
          <Col span={15}>
            <Skeleton active />
          </Col>
        ) : (
          <Col span={15}>
            <Form layout="vertical">
              <Form.Item label="Registration Message">
                <TextArea
                  placeholder="Type message to send on the time of registration."
                  autoSize={{
                    minRows: 3,
                  }}
                  value={smstext.smsText}
                  onChange={(e) =>
                    setSmstext({ ...smstext, smsText: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Fees Message">
                <TextArea
                  placeholder="Type message for send notification of fees alert."
                  autoSize={{
                    minRows: 3,
                  }}
                  value={smstext.feesMsg}
                  onChange={(e) =>
                    setSmstext({ ...smstext, feesMsg: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Holidays Message">
                <TextArea
                  placeholder="Type message for send notification in holidays."
                  autoSize={{
                    minRows: 3,
                  }}
                  value={smstext.holidayMsg}
                  onChange={(e) =>
                    setSmstext({ ...smstext, holidayMsg: e.target.value })
                  }
                />
              </Form.Item>
            </Form>
            <Button
              type="primary"
              loading={loader}
              onClick={() => {
                setLoader(true);
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
}

export default MessageForm;
