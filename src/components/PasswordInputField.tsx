import React, { useState } from "react";
import "../assets/css/login.css";

interface PasswordInputProps {
    label?: string;
    value: string;
    name: string;
    placeholder?: string;
    error?: any;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
    label,
    value,
    name,
    placeholder ,
    error,
    onChange,
}) => {
    const [show, setShow] = useState(false);

    return (
        <div className="mb-4 w-full">
            {label && (
                <label className="block mb-1 font-medium text-gray-700">{label}</label>
            )}

            <div className="password-field-wrapper">
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                />
                <i
                    className={`bi ${show ? "bi-eye-slash" : "bi-eye"} password-eye-icon`}
                    onClick={() => setShow(!show)}
                />
            </div>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default PasswordInput;
