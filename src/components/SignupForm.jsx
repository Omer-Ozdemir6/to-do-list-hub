import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; 

const initialFormData = {
    name: '',
    surname: '',
    username: '',
    email: '',
    password: '',
    age: '', 
    usagePurpose: 'personal',
};

const SignupForm = ({ onClose }) => { 
    const [formData, setFormData] = useState(initialFormData);
    const [formErrors, setFormErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-])[A-Za-z\d!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]{6,}$/;

    const validateForm = (data) => {
        const errors = {};
        
        if (!data.username) {
            errors.username = 'Kullanıcı adı zorunludur.';
        }

        if (!data.email) {
            errors.email = 'E-posta zorunludur.';
        } else if (!emailRegex.test(data.email)) {
            errors.email = 'Geçerli bir e-posta adresi giriniz.';
        }

        if (!data.password) {
            errors.password = 'Parola zorunludur.';
        } else if (data.password.length < 6) {
            errors.password = 'Parola en az 6 karakter olmalıdır.';
        } else if (!passwordRegex.test(data.password)) {
            errors.password = 'Parola en az 1 büyük harf, 1 sayı ve 1 özel karakter içermelidir.';
        }
        
        return errors;
    };

    useEffect(() => {
        const errors = validateForm(formData);
        setFormErrors(errors);
        
        const requiredFieldsFilled = formData.username && formData.email && formData.password;
        setIsFormValid(Object.keys(errors).length === 0 && requiredFieldsFilled);
    }, [formData]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {

            
            toast.success(`Kaydınız tamamlandı. Hoş geldiniz, ${formData.name || formData.username}! Ana sayfaya yönlendiriliyorsunuz.`, {
                position: "top-right",
            });
            
            setFormData(initialFormData);

            setTimeout(() => {
                if (onClose) {
                    onClose(); 
                }
            }, 2000); 

        } else {
            toast.error('Lütfen zorunlu alanları kontrol edin ve hataları düzeltin.', {
                 position: "top-right",
            });
        }
    };

    const getErrorClass = (fieldName) => {
        return formErrors[fieldName] ? 'input-error' : '';
    };

    return (
        <div className="SignupForm-Container">
            <h2>Yeni Hesap Oluştur</h2>
            
            <form onSubmit={handleSubmit} className="signup-form">

                <div className="form-group-row">
                    <div className="form-group">
                        <label htmlFor="name">Adınız (Opsiyonel)</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Adınız"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Soyadınız (Opsiyonel)</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Soyadınız"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Kullanıcı Adı *</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Kullanıcı adı"
                        className={getErrorClass('username')}
                    />
                    {formErrors.username && <p className="field-error">{formErrors.username}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">E-posta Adresi *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ornek@mail.com"
                        className={getErrorClass('email')}
                    />
                    {formErrors.email && <p className="field-error">{formErrors.email}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="password">Parola *</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Parola (min 6, Büyük, Sayı, Özel Karakter)"
                        className={getErrorClass('password')}
                    />
                    {formErrors.password && <p className="field-error">{formErrors.password}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="age">Yaşınız (Opsiyonel)</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Yaş"
                        min="10"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="usagePurpose">Uygulamayı Ne İçin Kullanacaksınız? (Opsiyonel)</label>
                    <select
                        id="usagePurpose"
                        name="usagePurpose"
                        value={formData.usagePurpose}
                        onChange={handleChange}
                    >
                        <option value="personal">Kişisel Görev Yönetimi</option>
                        <option value="work">İş/Projeler</option>
                        <option value="study">Eğitim/Ders Çalışma</option>
                        <option value="other">Diğer</option>
                    </select>
                </div>
                <button 
                    type="submit" 
                    className="btn-success signup-submit-button"
                    disabled={!isFormValid}
                >
                    KAYIT OL
                </button>
            </form>
        </div>
    );
};

export default SignupForm;