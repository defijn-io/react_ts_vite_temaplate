import { useExample } from "@/api/example";

export default function HomePage() {
	const exampleData = useExample();
	return (
		<div className="flex flex-col justify-center gap-6 items-center h-svh w-svw bg-black">
			<img src="/logo.svg" alt="Defijn" className="w-64 h-auto" />
			<section className="flex flex-col gap-2 justify-center items-center">
				<h2 className="text-white text-xl">React TS Template</h2>
				<p className="text-white text-sm">
					{exampleData.data?.message}
				</p>
			</section>
		</div>
	);
}
