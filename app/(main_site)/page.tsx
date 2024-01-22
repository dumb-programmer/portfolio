import picture from "@/public/1655180327348.jpeg";
import github from "@/public/github-icon.svg";
import linkedin from "@/public/linkedin-icon.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 items-center justify-center mt-32 md:mt-20">
      <Image className="rounded-full" width={300} height={300} src={picture} alt="" />
      <h1 className="text-3xl text-center">Hello, I am <span className="text-purple-600 font-bold">Asad Khan</span>, Web Developer</h1>
      <div className="flex gap-4">
        <a href="https://github.com/dumb-programmer">
          <Image width={30} height={30} src={github} alt="github" />
        </a>
        <a href="https://linkedin.com/in/asad-khan-57b8741b7/">
          <Image width={30} height={30} src={linkedin} alt="linkedin" />
        </a>
      </div>
      <a href="/contact" className="bg-purple-600 p-4 text-fuchsia-50 rounded-full focus:outline-offset-2 focus:outline-2 focus:outline-purple-600 hover:bg-purple-500 transition-all disabled:bg-purple-500">Contact Me</a>
    </main>
  )
}
