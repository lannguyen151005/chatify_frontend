"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api'; 
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true); // true: Đăng nhập, false: Đăng ký
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // GỌI API ĐĂNG NHẬP
        const res = await api.post('/auth/login', formData);
        
        const token = res.data.token;

        localStorage.setItem('jwt_token', token);

        //Giai ma jwt de lay user_id
        const decoded: any = jwtDecode(token);
        localStorage.setItem('user_id', decoded.sub); // Lưu ID để biết ai đang chat
        
        toast.success("Đăng nhập thành công!");

        // Chuyển hướng sang trang Chat
        router.push('/'); 
      } else {
        // GỌI API ĐĂNG KÝ
        await api.post('/api/auth/register', formData);
        alert('Đăng ký thành công! Vui lòng đăng nhập.');
        setIsLoginMode(true); // Chuyển về form đăng nhập
      }
    } catch (error: any) {
      console.error("Lỗi xác thực:", error);
      setErrorMsg(error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#d6f0f4" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-lg border-0" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5 text-center">

                <h3 className="mb-4 fw-bold text-primary">
                  {isLoginMode ? "Đăng Nhập" : "Đăng Ký Tài Khoản"}
                </h3>

                {errorMsg && (
                  <div className="alert alert-danger py-2" role="alert">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-outline mb-4 text-start">
                    <label className="form-label fw-bold">Tên đăng nhập</label>
                    <input 
                      type="text" 
                      name="username"
                      className="form-control form-control-lg bg-light" 
                      placeholder="Nhập username..."
                      value={formData.username}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <div className="form-outline mb-4 text-start">
                    <label className="form-label fw-bold">Mật khẩu</label>
                    <input 
                      type="password" 
                      name="password"
                      className="form-control form-control-lg bg-light" 
                      placeholder="Nhập mật khẩu..."
                      value={formData.password}
                      onChange={handleChange}
                      required 
                    />
                  </div>

                  <button 
                    className="btn btn-primary btn-lg w-100 mb-3" 
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : (isLoginMode ? "Vào Phòng Chat" : "Tạo Tài Khoản")}
                  </button>
                </form>

                <hr className="my-4" />

                <button 
                  className="btn btn-outline-secondary w-100" 
                  onClick={() => setIsLoginMode(!isLoginMode)}
                >
                  {isLoginMode ? "Chưa có tài khoản? Đăng ký ngay" : "Đã có tài khoản? Đăng nhập"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}