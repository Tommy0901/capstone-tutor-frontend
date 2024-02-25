import { useState, } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import icon_google from './../assets/images/svg/icon_google.svg';
const LoginModal = ({closeLoginModal,onNavbar}) =>{
    const [mode ,setMode] = useState('signup');
    const [ email,setEmail ] = useState('');
    const [ password,setPassword ] = useState('');
    const [ repassword,setRepassword] = useState('');
    const { register, handleSubmit,formState:{errors} } = useForm({
        defaultValues:{
            email: '',
            password: '',
            repassword: '',
        },
        mode: 'onTouched'
    });
    const api = 'http://34.125.232.84:3000';
    const onSubmit = ()=>{
        
    }
    const apiLoginSubmit = async ()=>{
        const loginData= {
            "email": email,
            "password":password,
        }  

        const loginRes = await axios.post(`${api}/signin`,
        loginData).then(res=>{
            console.log(res.data);
            return res.data;
        }).catch(err=>{
            console.log(err);
        })
        //console.log(loginRes);
        const token = loginRes.data.token;
        const id = loginRes.data.id;
        // fake data
        const isTeacher = false;
        console.log(token);
        localStorage.setItem("token",loginRes.data.token);
     //handle Login 
        if(token){
            onNavbar(id,isTeacher);
        }   
        //close modal
        closeLoginModal();
    }
    const handleClose = () =>{
        setEmail('');
        setPassword('');
        closeLoginModal();
    }
    // const getStudentData = async()=>{
    //     localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTcwODg1ODAyNCwiZXhwIjoxNzExNDUwMDI0fQ.Z5jjg00FCXt8d3nELHYsUerK48IhD6HKp0GwzdckZwk");
    //     const token = localStorage.getItem('token');
    //     const studentData = await axios.get(`${api}/student/11`,{
    //         headers: { Authorization: `Bearer ${token}` }
    //     }).then((res)=>{
    //         console.log(res.data)
    //     }).catch(
    //         err=>{
    //             console.log(err);
    //         }
    //     )

    //     const teacherData = await axios.get(`${api}/teacher/11`,{
    //         headers: { Authorization: `Bearer ${token}` }
    //     }).then((res)=>{
    //         console.log(res.data)
    //     }).catch(
    //         err=>{
    //             console.log(err);
    //         }
    //     )
    // }
    return(

        <div className="modal fade" id="login_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
            <div className="login_modal_content modal-content">
            <div className="modal-header border-primary">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={handleClose}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="login-container">
                    <div className="button-list">
                        <button className={`btn mode-btn-1 ${mode==="signup" ? ('mode-active'):('')}`} onClick={()=>{setMode("signup")}}>註冊</button>
                        <button className={`btn mode-btn ${mode==="login" ? ('mode-active'):('')}`} onClick={()=>{setMode("login")}}>登入</button>
                    </div>
                    {
                    mode==="signup" && (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-10px">使用帳號密碼註冊</div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-label ${errors.email && 'is-wrong'}`}>帳號</label>
                                <input  className={`form-control input-right  ${errors.email && 'is-invalid'} `} {...register("email",{
                                required:{value: true, message:'Email必填'},
                                maxLegnth: 40,
                                pattern: /^\S+@\S+$/i
                                })}  placeholder="請輸入信箱"/>
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-label ${errors.password && 'is-wrong'}`}>密碼</label>
                                <input  className={`form-control input-right ${errors.password && 'is-invalid'}`} {...register("password",{required: true , maxLegnth: 20})}  placeholder="請輸入密碼"/>
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-label ${errors.repassword && 'is-wrong'}`}>確認</label>
                                <input   className={`form-control input-right ${errors.repassword && 'is-invalid'}`} {...register("repassword",{required: true , maxLegnth: 20})}  placeholder="請再次輸入密碼"/>
                            </div>
                            <div className="btn btn-primary w-100 mb-20px">
                                註冊
                            </div>
                            <div className="mb-10px">使用其他方式註冊</div>
                            <button className="btn">
                                <img src={icon_google}></img>
                                google帳戶
                            </button>
                        </form>
                    )
                }
                {
                    mode==="login" && (
                        <>
                        <form>
                            <div className="mb-10px">使用帳號密碼註冊</div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-label`}>帳號</label>
                                <input  value={email} onChange={(e)=>{setEmail(e.target.value)}}className={`form-control input-right   `}  placeholder="請輸入信箱"/>
                            </div>
                            <div className="input-bar mb-10px">
                                <label className={`form-control input-label`}>密碼</label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}}  className={`form-control input-right `}   placeholder="請輸入密碼"/>
                            </div>
                            <div className="btn btn-primary w-100 mb-20px" onClick={apiLoginSubmit}>
                                登入
                            </div>
                            <div className="mb-10px">使用其他方式登入</div>
                            <button className="btn">
                                <img src={icon_google}></img>
                                google帳戶
                            </button>
                        </form>
                        </>
                    )
                }

                </div>
            </div>
            <div className="modal-footer">
            </div>
            </div>
        </div>
        </div>
    )
}

export default LoginModal;