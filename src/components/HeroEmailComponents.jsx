import React from 'react';

export default function HeroEmailComponent() {
  return (
      <div className="email">
        <div className="email-header">
          <span className="email-icon">
            <i className="fas fa-envelope"></i>
          </span>
          <h3 className="email-subject">Monthly reminder</h3>
        </div>
        
        <div className="email-body">
          <p className="email-text">Dear user,</p>
          <p className="email-text">
          Every month, you will receive a monthly report with the expenses you have recorded, so it can remind you of what you need to pay and also keep you updated on your spending.
          </p>
          <p className="email-text">Best regards, Spend.</p>
        </div>

        <div className="email-footer">
          <span className="email-sender">from: spend@mail.com</span>
          <span className="email-date">sent: feb 23 2025</span>
        </div>
      </div>
   
  );
};