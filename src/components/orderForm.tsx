import React, { useState, useEffect } from "react";
import { CreateOrder } from "@/services/orderServices"; // استيراد دالة إنشاء الطلب
import withModal from "@/Reusable comp/Modal"; // استيراد HOC
import { ArrayConverter } from "@/helpers/arrayConverter";
import { useAppDispatch, useAppSelector } from "@/hooks/Redux";
import { RootState } from "@/store/store";

interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

interface OrderFormData {
    name: string;
    email: string;
    phone: string;
    orderItems: OrderItem[];
    paymentMethod: string;
    address: string;
    floor: number;
    apartment: number;
    desc: string;
}

interface OrderFormProps {
    onClose: () => void; // دالة لإغلاق الـ Modal
}

const OrderForm: React.FC<OrderFormProps> = ({ onClose }) => {
    // حالة النموذج
    const [formData, setFormData] = useState<OrderFormData>({
        name: "",
        email: "",
        phone: "",
        orderItems: [], // إزالة البيانات الافتراضية
        paymentMethod: "cash",
        address: "",
        floor: 0,
        apartment: 0,
        desc: "",
    });

    const quantities = useAppSelector((state: RootState) => state.quantity.quantities);

    // جلب بيانات سلة التسوق من localStorage
    useEffect(() => {
        const cartLocalStorage = localStorage.getItem('cart');
        const cart: any = ArrayConverter(cartLocalStorage);

        const orderItems = cart.map((item: any) => ({
            productId: item._id,
            name: item.title,
            quantity: quantities[item._id] || 1, // استخدام الكمية من سلة التسوق أو القيمة الافتراضية 1
            price: item.price,
        }));
        setFormData((prevData) => ({
            ...prevData,
            orderItems,
        }));
    }, [quantities]);
    const quantity = quantities[formData.orderItems.map((item) => item.productId)[0]] || 1;

    // تحديث حالة النموذج عند تغيير الحقول
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // إرسال النموذج
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // إرسال البيانات إلى API
            const response = await CreateOrder(formData);
            console.log("Order created successfully:", response);
            alert("Order created successfully!");
            onClose(); // إغلاق الـ Modal بعد إرسال النموذج بنجاح
        } catch (error) {
            console.error("Failed to create order:", error);
            alert("Failed to create order. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 ">
            {/* الاسم */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* البريد الإلكتروني */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* الهاتف */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* العنوان */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* الطابق */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Floor</label>
                <input
                    type="number"
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* الشقة */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Apartment</label>
                <input
                    type="number"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                />
            </div>

            {/* الوصف */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    rows={3}
                />
            </div>

            {/* طريقة الدفع */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    className="mt-1 p-2 w-full border rounded-md"
                    required
                >
                    <option value="cash">Cash</option>
                    <option value="instapay">Instapay</option>
                    <option value="vodafone cash">Vodafone Cash</option>
                </select>
            </div>

            {/* عرض المنتجات المختارة */}
            <div>
                <h3 className="text-lg font-semibold mb-2">Selected Products</h3>
                {formData.orderItems.map((item, index) => {
                    return (

                        <div key={index} className="mb-2">
                            <p>
                                {item.name} - Quantity: {quantity} - Price: ${item.price.toFixed(2)}
                            </p>
                        </div>
                    )
                })}
            </div>
            <p>SubTotal ${(formData.orderItems.reduce((total, item) => total + item.price, 0) * quantity).toFixed(2)}</p>

            {/* زر الإرسال */}
            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                    Submit Order
                </button>
            </div>
        </form>
    );
};

// لف OrderForm داخل الـ Modal باستخدام HOC
export default withModal(OrderForm, "Order Form");