import { Outlet } from "react-router"

const RootLayout = () => {
    return (
        <div>
            <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;