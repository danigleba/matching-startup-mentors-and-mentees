export default function Pricing() {
    return (
        <div id="pricing" className="bg-[#0f0f0f] py-12 my-12">
            <p className="font-semibold text-center text-lg text-[#ee9d83] pb-6">Pricing</p>
            <div className="flex justify-center gap-1 items-end font-bold pb-6">
                <p className="text-3xl">$1</p>
                <p className="text-sm"> / 1k comments </p>
            </div>
            <p className="text-center text-xs">For anything over $1</p>
        </div>
    )
}