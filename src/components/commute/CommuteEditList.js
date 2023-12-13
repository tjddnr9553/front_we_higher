import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../../css/dataroom.css';

export default function CommuteEditList() {
    const token = sessionStorage.getItem("token");
    const loginid = sessionStorage.getItem("loginid");
    const navigate = useNavigate();
    const [list, setList] = useState([]);
    // const [mdto, setDto] = useState({});
    // const { ismaster } = mdto;

    useEffect(() => {
        axios.get('http://localhost:8081/auth/commute/editlist', { headers: { Authorization: token } })
            .then(
                function (res) {
                    if (res.status === 200) {
                        setList(res.data.list);
                        let m = res.data.mdto;
                        // setDto({
                        //     ismaster: m.isMaster
                        // })
                    } else {
                        alert('error:' + res.status);
                    }
                }
            );
    }, [])

    const edit = (num) => {
        axios.post('http://localhost:8081/auth/commute/approve',
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {   
                    alert('수정 요청이 승인');
                } else {
                    alert(res.status);
                }
            });
    }

    const del = (num) => {
        axios.post('http://localhost:8081/auth/commute/cancel',
            {},
            {
                headers: { Authorization: token },
                params: { num: num }
            }
        )
            .then(function (res) {
                if (res.status === 200) {
                    alert('수정 요청이 반려');
                } else {
                    alert(res.status);
                }
            });
    }

    return (
        <div className="dataroom">
            <div className="main-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header card-header-danger">
                                    <h2 className="card-title">근태수정 요청목록</h2>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table id="kt_datatable_example_2" className="table table-striped table-row-bordered gy-5 gs-7">
                                            <thead>
                                                <tr className="fw-bold fs-6 text-gray-800">
                                                    <th>이름</th>
                                                    <th>부서</th>
                                                    <th>직급</th>
                                                    <th>기준일</th>
                                                    <th>수정내용</th>
                                                    <th>요청사유</th>
                                                    <th>승인 및 취소</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {list.map((e) => (
                                                    <tr>
                                                        <td>{e.member.name}</td>
                                                        <td>{e.member.deptName}</td>
                                                        <td>{e.member.companyRankName}</td>
                                                        <td>{e.basicDate} → {e.editBasicDate}</td>
                                                        <td>[출근] {e.startTime}→ {e.editStartTime}<br />
                                                            [퇴근] {e.endTime} → {e.editEndTime}</td>
                                                        <td>{e.reason}</td>
                                                        <td>
                                                        <a onClick={() => edit(e.num)}>
                                                            <i className="bi bi-check-lg" style={{ color: "blue" }} />
                                                        </a>
                                                        <a onClick={() => del(e.num)}>
                                                            <i className="bi bi-x-octagon-fill" style={{ color: "red" }} />
                                                        </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}