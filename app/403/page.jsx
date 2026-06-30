export default function ForbiddenPage() {

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">

            <h1 className="text-7xl font-bold text-red-500">
                403
            </h1>

            <p className="text-2xl mt-4 font-semibold">
                Access Forbidden
            </p>

            <p className="text-gray-500 mt-2">
                You do not have permission to access this page.
            </p>

        </div>
    );
}