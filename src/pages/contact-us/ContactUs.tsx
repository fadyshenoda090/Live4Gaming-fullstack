
import { useState } from "react";

const ContactUs = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <section className="min-h-screen bg-gray-900 text-gray-100 py-16 px-6 flex flex-col items-center">
            <div className="max-w-2xl w-full">
                <h1 className="text-4xl font-bold text-center text-amber-400 mb-6">
                    Contact Us
                </h1>
                <p className="text-center text-gray-300 mb-10">
                    Got questions, feedback, or collaboration ideas? We’d love to hear from you!
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 border border-amber-500 rounded-2xl p-8 shadow-[0_0_25px_rgba(245,158,11,0.2)] flex flex-col gap-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-amber-400 mb-2">
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-500 text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-400 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-500 text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-amber-400 mb-2">
                            Message
                        </label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-amber-500 text-gray-100 resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                    >
                        Send Message
                    </button>

                    {submitted && (
                        <p className="text-green-400 text-sm text-center mt-4">
                            ✅ Message sent successfully!
                        </p>
                    )}
                </form>

                <div className="mt-10 text-center text-gray-400 text-sm">
                    <p>
                        📧{" "}
                        <a
                            href="mailto:fadyshenoda0o0@gmail.com"
                            className="text-amber-400 hover:underline"
                        >
                            fadyshenoda0o0@gmail.com
                        </a>
                    </p>
                    <p>📍 Qena, Egypt</p>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
