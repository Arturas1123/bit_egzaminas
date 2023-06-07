import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import AppLayout from "@/Layouts/AppLayout";

export default function First() {
    return (
        <AppLayout>
                <div className={"col-md-12 mt-5"}>
                    <div className={"card"}>
                        <div className={"card-header"}>Puslapis</div>
                        <div className={"card-body"}>
                            Tekstas
                        </div>
                    </div>
                </div>
        </AppLayout>
    );
}
