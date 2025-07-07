import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        alert("Message sent (simulation) ✅");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      }, 1500);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto space-y-6 bg-gunmetal-gray p-6 rounded-xl shadow-lg"
    >
      <div>
        <label className="block mb-1 text-chrome-silver">Full Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-md bg-forge-black border border-cool-cyan text-chrome-silver"
        />
        {errors.name && <p className="text-ember-red text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1 text-chrome-silver">Email Address</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 rounded-md bg-forge-black border border-cool-cyan text-chrome-silver"
        />
        {errors.email && <p className="text-ember-red text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1 text-chrome-silver">Message</label>
        <textarea
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2 rounded-md bg-forge-black border border-cool-cyan text-chrome-silver"
        />
        {errors.message && <p className="text-ember-red text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-cool-cyan text-forge-black px-6 py-3 font-semibold rounded-md hover:bg-molten-orange transition w-full"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
} 