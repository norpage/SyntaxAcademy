"use client";

import { Suspense } from "react";
import ResetPasswordForm from "../../../components/ResetPassword";

export default function ResetPasswordPageWrapper() {
    return (
        <Suspense fallback={<div className="text-center p-4 text-gray-500">Բեռնվում է...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
