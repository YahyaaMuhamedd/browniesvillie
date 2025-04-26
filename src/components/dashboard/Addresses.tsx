import AxiosInstance from "@/services/axiosInstance";
import { useState } from "react";

export const AddressManager = () => {
    const [addresses, setAddresses] = useState<string[]>([]);
    const [addressData, setAddressData] = useState({
        phone: "",
        address: "",
        floor: 0,
        apartment: 0,
        desc: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAddressData({ ...addressData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await AxiosInstance.post("users/addAddress", addressData);
            if (res.data.status === "success") {
                setAddresses((prev) => [...prev, addressData.address]);
                setMessage("Address added successfully!");
            }
        } catch (error) {
            setMessage("Failed to add address. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">My Addresses</h2>
            {addresses.length ? (
                <ul className="list-disc list-inside mb-4">
                    {addresses.map((addr, index) => (
                        <li key={index}>{addr}</li>
                    ))}
                </ul>
            ) : (
                <p>No addresses added yet.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    name="phone"
                    placeholder="Phone"
                    value={addressData.phone}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    name="address"
                    placeholder="Address"
                    value={addressData.address}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="floor"
                    placeholder="Floor"
                    value={addressData.floor}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    name="apartment"
                    placeholder="Apartment"
                    value={addressData.apartment}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
                <textarea
                    name="desc"
                    placeholder="Description"
                    value={addressData.desc}
                    onChange={handleChange}
                    className="p-2 border rounded col-span-full"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-mainColor text-white rounded hover:opacity-90"
                disabled={loading}
            >
                {loading ? "Adding..." : "Add Address"}
            </button>
            {message && <p className="mt-2 text-sm text-green-500">{message}</p>}
        </div>
    );
};