"use client";

import { Suspense } from "react";
import VerifyForm from "../../../components/UserVerify";

export default function VerifyPageWrapper() {
    return (
        <Suspense fallback={<div className="text-center p-4 text-gray-500">Բեռնվում է...</div>}>
            <VerifyForm />
        </Suspense>
    );
}
