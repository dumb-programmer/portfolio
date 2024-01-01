import Image from "next/image";
import { Project } from "../lib/types";
import github from "@/public/github-icon.svg";
import link from "@/public/link-icon.svg";

export default function ProjectItem({ project }: { project: Project }) {
    return <div className="shadow-lg rounded-lg">
        <Image src={project.preview} style={{ minWidth: 300 }} height={400} width={300} alt="" />
        <div className="p-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">{project.title}</h2>
                <div className="flex items-center gap-2">
                    <a href={project.github} target="_blank"><Image src={github} height={25} width={25} alt="github" /></a>
                    <a href={project.live} target="_blank"><Image src={link} height={25} width={25} alt="github" /></a>
                </div>
            </div>
            <p className="mt-4">{project.description}</p>
        </div>
    </div>
}