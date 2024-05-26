import AdminCardPlus from "@/app/components/admin/adminCardPlus";
import AdminCard from "@/app/components/admin/adminCard";
import React from "react";

export default function AdminPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full m-5 p-4">
            <h1 className="text-4xl font-bold mb-20">Panel de Administrador</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminCardPlus title="Productos" src="/images/products.jpg" href1="/dashboard/admin/products" href2="/dashboard/admin/newProduct" />
                <AdminCardPlus title="Cortes" src="/images/cuts.jpg" href1="/dashboard/admin/cuts" href2="/dashboard/admin/newCut" />
                <AdminCard title="Pedidos" src="/images/orders.jpg" href1="/dashboard/admin/orders" />
                <AdminCard title="Usuarios" src="/images/users.jpg" href1="/dashboard/admin/users" />
            </div>
        </div>
    );
};
