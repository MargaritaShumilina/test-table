import React from 'react';
import './Modal.css';

const Modal = ({ user, onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Информация о пользователе</h2>
                <p><strong>ФИО:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Возраст:</strong> {user.age}</p>
                <p><strong>Адрес:</strong> {user.address.city}, {user.address.address}</p>
                <p><strong>Рост:</strong> {user.height}</p>
                <p><strong>Вес:</strong> {user.weight}</p>
                <p><strong>Телефон:</strong> {user.phone}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </div>
    );
};

export default Modal;