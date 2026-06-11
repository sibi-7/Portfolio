import React, { useState } from "react";

export default function ContactForm() {
  // Contact form state
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactStatus, setContactStatus] = useState({ text: "", type: "" });

  // Submission handler (FormSubmit.co)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactSubject || !contactMessage) {
      setContactStatus({
        text: "Please fill in all details before transmitting.",
        type: "error",
      });
      return;
    }
    setContactStatus({ text: "Transmitting message to Sibi...", type: "info" });
    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/sibi772001@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: contactName,
            email: contactEmail,
            _subject: `New Message: ${contactSubject}`,
            message: contactMessage,
            _captcha: "false",
          }),
        },
      );
      const data = await response.json();
      if (response.ok && data.success === "true") {
        setContactStatus({
          text: `Thank you, ${contactName}! Your message was sent successfully. Sibi will receive it shortly.`,
          type: "success",
        });
        setContactName("");
        setContactEmail("");
        setContactSubject("");
        setContactMessage("");
      } else {
        throw new Error(data.message || "Transmission failed.");
      }
    } catch (error) {
      console.error(error);
      setContactStatus({
        text: `Error: ${error.message} Please check your connection or contact sibi772001@gmail.com directly.`,
        type: "error",
      });
    }
  };
  return (
    <div className="contact-form-card">
      <form onSubmit={handleContactSubmit} className="contact-form">
        <div className="form-group-contact">
          <input
            type="text"
            id="contactName"
            className="form-input-contact"
            required
            placeholder=" "
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <label htmlFor="contactName" className="form-label-contact">
            Your Name
          </label>
        </div>
        <div className="form-group-contact">
          <input
            type="email"
            id="contactEmail"
            className="form-input-contact"
            required
            placeholder=" "
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
          />
          <label htmlFor="contactEmail" className="form-label-contact">
            Your Email
          </label>
        </div>
        <div className="form-group-contact">
          <input
            type="text"
            id="contactSubject"
            className="form-input-contact"
            required
            placeholder=" "
            value={contactSubject}
            onChange={(e) => setContactSubject(e.target.value)}
          />
          <label htmlFor="contactSubject" className="form-label-contact">
            Subject
          </label>
        </div>
        <div className="form-group-contact">
          <textarea
            id="contactMessage"
            className="form-textarea-contact"
            required
            placeholder=" "
            rows="4"
            value={contactMessage}
            onChange={(e) => setContactMessage(e.target.value)}
          ></textarea>
          <label htmlFor="contactMessage" className="form-label-contact">
            Message Details
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary submit-btn-contact"
          disabled={contactStatus.type === "info"}
        >
          {contactStatus.type === "info" ? (
            <>
              <i className="fa-solid fa-spinner fa-spin btn-icon"></i>
              Transmitting...
            </>
          ) : (
            <>
              <i className="fa-solid fa-paper-plane btn-icon"></i>Send Message
            </>
          )}
        </button>
        {contactStatus.text && (
          <div className={`form-status-msg ${contactStatus.type}`}>
            {" "}
            {contactStatus.text}{" "}
          </div>
        )}
      </form>
    </div>
  );
}
