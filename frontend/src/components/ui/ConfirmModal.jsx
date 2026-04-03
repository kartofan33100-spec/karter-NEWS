import React from 'react';
import '../../styles/ConfirmModal.css';

function ConfirmModal({
                          isOpen,
                          title,
                          text,
                          confirmText = 'Да',
                          cancelText = 'Нет',
                          onConfirm,
                          onCancel,
                      }) {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <h2 className="confirm-modal__title">{title}</h2>
                <p className="confirm-modal__text">{text}</p>

                <div className="confirm-modal__actions">
                    <button
                        className="confirm-modal__btn confirm-modal__btn--danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                    <button
                        className="confirm-modal__btn confirm-modal__btn--secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;