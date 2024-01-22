import LoadingIcon from "./LoadingIcon";

export default function SubmitButton({ isLoading }: { isLoading: boolean }) {
    return <button className="flex justify-center items-center p-2 bg-purple-600 rounded-full text-fuchsia-50 focus:outline-offset-2 focus:outline-2 focus:outline-purple-600 hover:bg-purple-500 transition-all disabled:bg-purple-500" disabled={isLoading}>{isLoading ? <LoadingIcon size={25} /> : "Send"}</button>;
}