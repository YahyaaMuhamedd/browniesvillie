"use client";

import { useAppSelector } from "@/hooks/Redux";
import { useInputChange } from "@/hooks/useInputsChange";
import { addressFields } from "@/ReusableComp/forms/fields";
import { Form } from "@/ReusableComp/forms/Form";
import { addAddress } from "@/services/userServices";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import AddAddressForm from "../addAddressForm";

const AddressManager = () => {
    const { user } = useAppSelector((state: RootState) => state.user);

    const [addresses, setAddresses] = useState<any[]>(user?.addresses || []);
    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">My Addresses</h2>

            {addresses.length > 0 ? (
                <ul className="list-disc list-inside mb-4">
                    {addresses.map((addr, index) => (
                        <li key={index}>
                            {addr.address} - Floor: {addr.floor} - Apartment: {addr.apartment}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No addresses added yet.</p>
            )}

            <h3 className="text-lg font-semibold mb-2">Add New Address</h3>


            <AddAddressForm />
        </div>
    );
};

export default AddressManager;