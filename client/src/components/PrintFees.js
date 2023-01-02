import React, { useEffect, useState } from 'react'
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
import printfess from "./printfess.css"
import { useReactToPrint } from "react-to-print";

import { useRef } from 'react';

function PrintFees() {
    
    let newRef = useRef();
    const [totalFees, setTotalFees] = useState(0)
    
    const handlePrint = useReactToPrint(
        {
            content: () => newRef.current,
        },
        () => {
            console.log("hell");
        }
        );
        const [studentData, setStudentData] = useState({
            Name:""  ,Father_Name:"",Class:0,section:"",admissionFees:0,tutionFees:0,reAdmissionFees:0,lateFee:0,annualCharges:0,activityCharges:0,examFees:0,computerFees:0,ecareFees:0,otherCharges:0
        })
        useEffect(() => {
          
        
            setTotalFees(parseInt(studentData.admissionFees)+parseInt(studentData.tutionFees)+parseInt(studentData.reAdmissionFees)+parseInt(studentData.lateFee)+parseInt(studentData.annualCharges)+parseInt(studentData.activityCharges)+parseInt(studentData.examFees)+parseInt(studentData.computerFees)+parseInt(studentData.ecareFees)+parseInt(studentData.otherCharges))
        })
  return (
    <div>

<Row justify="center">
        <Col span={20}>
          <Form layout="vertical">
          
           
            <Form.Item label="Name">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.Name}
                type="text"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    Name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Father Name">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.Father_Name}
                type="text"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    Father_Name: e.target.value,
                  })
                }
              />
            </Form.Item>  <Form.Item label="Class">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.Class}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    Class: e.target.value,
                  })
                }
              />
            </Form.Item>  <Form.Item label="section">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.section}
                type="text"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    section: e.target.value,
                  })
                }
              />
            </Form.Item>  <Form.Item label="Admission Fees">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.admissionFees}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    admissionFees: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Tution Fees">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.tutionFees}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    tutionFees: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="Re-Admission Fees">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.reAdmissionFees}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    reAdmissionFees: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="Late Fee">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.lateFee}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    lateFee: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="Annual Charges">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.annualCharges}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    annualCharges: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="Activity Charges">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.activityCharges}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    activityCharges: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="Exam Fee">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.examFees}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    examFees: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="Computer Fee">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.computerFees}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    computerFees: e.target.value,
                  })
                }
              />
            </Form.Item><Form.Item label="E- Care Fees">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.ecareFees}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    ecareFees: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Other Charges">
              <Input
                // disabled={location.pathname === "/viewStudent"}
                value={studentData.otherCharges}
                type="number"
                onChange={(e) =>
                  setStudentData({
                    ...studentData,
                    otherCharges: e.target.value,
                  })
                }
              />
            </Form.Item>
            
            
            
</Form>
</Col>
</Row>

<Button type="primary" onClick={handlePrint}>Print</Button>

<div style={{display:"none"}} >

<div id="invoice-POS"  ref={newRef} >

    
    <center id="top" style={{marginLeft:"10vw"}}>
      {/* <div class="logo"></div> */}
      <div class="info"> 
        <h2>RAKSHA CAREER ACADEMY</h2>
        <h4>Ramayan Chowk, Begariya Road, Dubagga , Lucknow-226101</h4>
      <h4>Mob.:8127628217, 7652031632</h4>
      </div>
    </center>
    
    <div id="mid">
      <div class="info">
        <h2>Contact Info</h2>
        <p>Name: <span style={{}}>{studentData.Name}</span></p>
        <p>Father's Name: <span style={{}}>{studentData.Father_Name}</span></p>
        <p>Class: <span style={{}}>{studentData.Class}</span></p>
        <p>section: <span style={{}}>{studentData.section}</span></p>
      
      </div>
    </div>
    
    <div id="bot">

					<div id="table">
						<table>
							<tr class="tabletitle">
								<td class="item"><h2>Description</h2></td>
								<td class="Hours"><h2>Fees</h2></td>
								<td class="Rate"><h2> Total</h2></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Admission Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.admissionFees}</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Tution Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.tutionFees }</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Re -Admission Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.reAdmissionFees}</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Late Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.lateFee}</p></td>
							</tr>

							<tr class="service">
								<td class="tableitem"><p class="itemtext">Annual Charges</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.annualCharges}</p></td>
							</tr>
                            <tr class="service">
								<td class="tableitem"><p class="itemtext">Activity Charges</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.activityCharges}</p></td>
							</tr>
                            <tr class="service">
								<td class="tableitem"><p class="itemtext">Exam Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.examFees}</p></td>
							</tr>
                            <tr class="service">
								<td class="tableitem"><p class="itemtext">Computer Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.computerFees}</p></td>
							</tr>
                            <tr class="service">
								<td class="tableitem"><p class="itemtext">e-care Fee</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.ecareFees}</p></td>
							</tr>
                            <tr class="service">
								<td class="tableitem"><p class="itemtext">Other Charges</p></td>
								<td class="tableitem"><p class="itemtext"></p></td>
								<td class="tableitem"><p class="itemtext">{studentData.otherCharges}</p></td>
							</tr>


							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>tax</h2></td>
								<td class="payment"><h2></h2></td>
							</tr>

							<tr class="tabletitle">
								<td></td>
								<td class="Rate"><h2>Total</h2></td>
								<td class="payment"><h2>₹ {totalFees}</h2></td>
							</tr>

						</table>
					</div>

					<div id="legalcopy">
						<p class="legal"><strong>Signature</strong>  
						</p>
					</div>

				</div>
  </div>
  </div>

 


    </div>
  )
}

export default PrintFees