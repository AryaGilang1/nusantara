import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import { Alert } from '../components/forms/Alert';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { SignIn } from '../components/forms/SignIn';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginFormSchema = z.object({
    username: z.string().min(3, "Username minimal 3 karakter").max(16, "Username maksimal 16 karakter"),
    password: z.string().min(8, "Password minimal 8 karakter"),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [rememberMe, setRememberMe] = useState(false);
    const [savedUsername, setSavedUsername] = useState('');
    const [savedPassword, setSavedPassword] = useState('');

    const toggleVisibility = () => setIsVisible(!isVisible);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginFormSchema),
        reValidateMode: "onChange"
    });

    // 👉 Auto login jika token masih ada
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            navigate("/chart");
        }

        // Load remembered username/password
        const storedUsername = localStorage.getItem('remember_username');
        const storedPassword = localStorage.getItem('remember_password');
        if (storedUsername) {
            setSavedUsername(storedUsername);
            setSavedPassword(storedPassword);
            setRememberMe(true);

            setValue("username", storedUsername);
            setValue("password", storedPassword);
        }
    }, [navigate, setValue]);

    const onSubmit = async (values) => {
        try {
            const response = await axiosInstance.post("/ndi/login", {
                ...values,
                tahun: 2025,
                id_daerah: 212,
            });

            const data = response.data;

            if (data.status) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);

                // Save remembered login
                if (rememberMe) {
                    localStorage.setItem("remember_username", values.username);
                    localStorage.setItem("remember_password", values.password); // bisa dihapus kalau ga mau simpan password
                } else {
                    localStorage.removeItem("remember_username");
                    localStorage.removeItem("remember_password");
                }

                setLoginSuccess(true);
                setCountdown(3);
                const interval = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev === 1) {
                            clearInterval(interval);
                            navigate("/chart");
                        }
                        return prev - 1;
                    });
                }, 1000);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginError(true);
        }
    };

    return (
        <div className='flex h-screen w-screen bg-gray-100'>
            <main className="flex flex-row w-full h-full px-40">
                <div className="w-1/2 flex justify-center items-center">
                    <img src='/src/assets/logo.jpg' className="w-full max-w-[400px] object-contain" />
                </div>

                <div className="w-1/2 flex justify-center items-center">
                    <form
                        className="flex flex-col gap-4 w-[750px] max-w-md p-6 bg-white border border-gray-300 rounded-2xl shadow-xl"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 text-center">Login</h2>

                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-gray-700 mb-1">Username</label>
                            <input
                                id="username"
                                {...register("username")}
                                defaultValue={savedUsername}
                                placeholder="Enter your username"
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                            />
                            {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password" className="text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <input
                                    type={isVisible ? "text" : "password"}
                                    {...register("password")}
                                    defaultValue={savedPassword}
                                    placeholder="Enter your password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                />
                                <span
                                    onClick={toggleVisibility}
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                >
                                    {isVisible ? <MdVisibility /> : <MdVisibilityOff />}
                                </span>
                            </div>
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

                            <div className="flex items-center space-x-2 mt-2">
                                <Checkbox
                                    id="remember"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked)}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="remember" className="text-sm font-medium">
                                    Simpan saya
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
                        >
                            Login
                        </button>

                        <Separator orientation="horizontal" />
                        <div className='flex gap-2'>
                            <SignIn image="/src/assets/google.png" />
                            <SignIn image="/src/assets/x.png" />
                            <SignIn image="/src/assets/f.jpg" />
                        </div>
                    </form>
                </div>

                {/* Alert Gagal */}
                <Alert
                    onClick={() => setLoginError(false)}
                    open={loginError}
                    onOpenChange={setLoginError}
                    dialog="Mohon ulangi. Jaringan bermasalah atau username/password salah."
                    dialogTitle="Gagal Masuk"
                    dialogCancel="Kembali"
                />

                {/* Alert Sukses */}
                <Alert
                    onClick={() => {
                        setLoginSuccess(false);
                        setCountdown(3);
                    }}
                    open={loginSuccess}
                    onOpenChange={(open) => {
                        setLoginSuccess(open);
                        if (!open) setCountdown(3);
                    }}
                    dialog={`Login berhasil! Mengarahkan ke halaman chart dalam ${countdown} detik...`}
                    dialogTitle="Berhasil Masuk"
                    dialogCancel="Oke"
                />
            </main>
        </div>
    );
};

export default LoginPage;
