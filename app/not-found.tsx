import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function NotFound() {
    return <main className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-9xl font-bold text-purple-600">404</h1>
        <p className="text-gray-600">Sorry, the page you are trying to reach does not exists</p>
        <a href="/" className="mt-4 flex justify-center items-center gap-2 bg-purple-600 p-4 text-fuchsia-50 rounded-full  target:scale-50 focus:outline-offset-2 focus:outline-2 focus:outline-purple-600 hover:bg-purple-500 transition-all disabled:bg-purple-500"> <ArrowLeftIcon height={20} width={20} /> Go back to homepage</a>
    </main>;
}